/**
 * API Integration Test - Supabase
 *
 * Tests the complete reservation flow through API endpoints
 */

import { test, expect } from '@playwright/test';

test.describe('API Integration - Supabase Reservation System', () => {
  const BASE_URL = 'http://localhost:3000';
  let createdReservationIds: string[] = [];

  test.afterAll(async ({ request }) => {
    // Clean up all created reservations
    console.log('\n🧹 Cleaning up test data...');
    for (const id of createdReservationIds) {
      try {
        await request.post(`${BASE_URL}/api/reservations/${id}/cancel`, {
          data: { reason: 'Test cleanup' }
        });
        console.log(`   ✅ Cancelled reservation: ${id}`);
      } catch (error) {
        console.log(`   ⚠️  Failed to cancel: ${id}`);
      }
    }
  });

  test('Complete reservation flow with Supabase', async ({ request }) => {
    console.log('\n🔍 Testing complete reservation flow with Supabase...\n');

    // Test data
    const roomId = 'private-01';
    const today = new Date();
    const checkIn = new Date(today);
    checkIn.setDate(checkIn.getDate() + 7); // 7 days from now
    const checkOut = new Date(checkIn);
    checkOut.setDate(checkOut.getDate() + 2); // 2 nights

    const formatDate = (date: Date) => date.toISOString().split('T')[0];
    const checkInStr = formatDate(checkIn);
    const checkOutStr = formatDate(checkOut);

    console.log(`📅 Test dates: ${checkInStr} to ${checkOutStr}`);

    // Step 1: Check initial availability
    console.log('\n📍 Step 1: Check initial availability');
    const availabilityBefore = await request.get(
      `${BASE_URL}/api/rooms/${roomId}/availability?from=${checkInStr}&to=${checkOutStr}`
    );

    expect(availabilityBefore.ok()).toBeTruthy();
    const availDataBefore = await availabilityBefore.json();
    console.log('   Initial availability:', JSON.stringify(availDataBefore, null, 2));

    expect(availDataBefore.success).toBe(true);
    expect(availDataBefore.availability.room_id).toBe(roomId);

    // Calculate expected blocked dates (check-in to check-out - 1)
    const expectedBlockedDates: string[] = [];
    const current = new Date(checkIn);
    while (current < checkOut) {
      expectedBlockedDates.push(formatDate(current));
      current.setDate(current.getDate() + 1);
    }

    console.log('   Expected blocked dates after reservation:', expectedBlockedDates);

    // Verify dates are currently available
    for (const date of expectedBlockedDates) {
      expect(availDataBefore.availability.unavailable_dates).not.toContain(date);
    }
    console.log('   ✅ Dates are currently available');

    // Step 2: Create reservation
    console.log('\n📍 Step 2: Create reservation');
    const createResponse = await request.post(`${BASE_URL}/api/reservations/create`, {
      data: {
        room_id: roomId,
        room_name: 'Private Room 1',
        guest_name: 'API Test User',
        guest_email: 'api-test@example.com',
        guest_phone: '010-5555-6666',
        guest_count: 2,
        check_in: checkInStr,
        check_out: checkOutStr,
        price_per_night: 150000,
        total_price: 300000,
        special_requests: 'API integration test - Supabase verification'
      },
      headers: { 'Content-Type': 'application/json' }
    });

    expect(createResponse.ok()).toBeTruthy();
    const createData = await createResponse.json();

    console.log('   Create response status:', createResponse.status());
    console.log('   Reservation created:', {
      id: createData.reservation?.id,
      guest_name: createData.reservation?.guest_name,
      check_in: createData.reservation?.check_in,
      check_out: createData.reservation?.check_out,
      nights: createData.reservation?.nights,
      status: createData.reservation?.status
    });

    expect(createData.success).toBe(true);
    expect(createData.reservation).toBeDefined();
    expect(createData.reservation.id).toBeDefined();
    expect(createData.reservation.nights).toBe(2);
    expect(createData.reservation.status).toBe('pending');

    const reservationId = createData.reservation.id;
    createdReservationIds.push(reservationId);

    console.log(`   ✅ Reservation created with ID: ${reservationId}`);

    // Step 3: Verify dates are now blocked
    console.log('\n📍 Step 3: Verify dates are blocked in database (trigger test)');
    const availabilityAfter = await request.get(
      `${BASE_URL}/api/rooms/${roomId}/availability?from=${checkInStr}&to=${checkOutStr}`
    );

    expect(availabilityAfter.ok()).toBeTruthy();
    const availDataAfter = await availabilityAfter.json();

    console.log('   Availability after reservation:', {
      room_id: availDataAfter.availability.room_id,
      unavailable_dates: availDataAfter.availability.unavailable_dates
    });

    // Verify trigger worked: dates should be blocked
    for (const date of expectedBlockedDates) {
      expect(availDataAfter.availability.unavailable_dates).toContain(date);
    }

    console.log('   ✅ Database trigger worked! Dates are blocked');

    // Step 4: Retrieve reservation
    console.log('\n📍 Step 4: Retrieve reservation (RLS test)');
    const getResponse = await request.get(`${BASE_URL}/api/reservations/${reservationId}`);

    expect(getResponse.ok()).toBeTruthy();
    const getData = await getResponse.json();

    console.log('   Retrieved reservation:', {
      id: getData.reservation?.id,
      status: getData.reservation?.status,
      guest_email: getData.reservation?.guest_email
    });

    expect(getData.success).toBe(true);
    expect(getData.reservation.id).toBe(reservationId);
    expect(getData.reservation.guest_email).toBe('api-test@example.com');

    console.log('   ✅ RLS SELECT policy works! Reservation retrieved');

    // Step 5: Cancel reservation
    console.log('\n📍 Step 5: Cancel reservation');
    const cancelResponse = await request.post(
      `${BASE_URL}/api/reservations/${reservationId}/cancel`,
      {
        data: { reason: 'API integration test' },
        headers: { 'Content-Type': 'application/json' }
      }
    );

    expect(cancelResponse.ok()).toBeTruthy();
    const cancelData = await cancelResponse.json();

    console.log('   Cancel response:', {
      success: cancelData.success,
      status: cancelData.data?.status
    });

    expect(cancelData.success).toBe(true);
    expect(cancelData.data.status).toBe('cancelled');

    console.log('   ✅ Reservation cancelled');

    // Step 6: Verify dates are unblocked (cancel trigger test)
    console.log('\n📍 Step 6: Verify dates are unblocked (cancel trigger test)');
    const availabilityFinal = await request.get(
      `${BASE_URL}/api/rooms/${roomId}/availability?from=${checkInStr}&to=${checkOutStr}`
    );

    expect(availabilityFinal.ok()).toBeTruthy();
    const availDataFinal = await availabilityFinal.json();

    console.log('   Availability after cancellation:', {
      room_id: availDataFinal.availability.room_id,
      unavailable_dates: availDataFinal.availability.unavailable_dates
    });

    // Verify cancel trigger worked: dates should be available again
    for (const date of expectedBlockedDates) {
      expect(availDataFinal.availability.unavailable_dates).not.toContain(date);
    }

    console.log('   ✅ Cancel trigger worked! Dates are available again');

    console.log('\n🎉 Complete Supabase integration test passed!\n');
  });

  test('Concurrent reservation conflict prevention', async ({ request }) => {
    console.log('\n🔍 Testing concurrent reservation conflict prevention...\n');

    const roomId = 'private-02';
    const today = new Date();
    const checkIn = new Date(today);
    checkIn.setDate(checkIn.getDate() + 14);
    const checkOut = new Date(checkIn);
    checkOut.setDate(checkOut.getDate() + 1);

    const formatDate = (date: Date) => date.toISOString().split('T')[0];
    const checkInStr = formatDate(checkIn);
    const checkOutStr = formatDate(checkOut);

    const reservationData = {
      room_id: roomId,
      room_name: 'Private Room 2',
      guest_name: 'Conflict Test User',
      guest_email: 'conflict-test@example.com',
      guest_phone: '010-7777-8888',
      guest_count: 2,
      check_in: checkInStr,
      check_out: checkOutStr,
      price_per_night: 160000,
      total_price: 160000
    };

    // First reservation
    console.log('📍 Creating first reservation...');
    const response1 = await request.post(`${BASE_URL}/api/reservations/create`, {
      data: { ...reservationData, guest_email: 'conflict-test-1@example.com' },
      headers: { 'Content-Type': 'application/json' }
    });

    expect(response1.ok()).toBeTruthy();
    const data1 = await response1.json();
    createdReservationIds.push(data1.reservation.id);

    console.log('   ✅ First reservation created:', data1.reservation.id);

    // Try second reservation for same dates
    console.log('📍 Attempting second reservation for same dates...');
    const response2 = await request.post(`${BASE_URL}/api/reservations/create`, {
      data: { ...reservationData, guest_email: 'conflict-test-2@example.com' },
      headers: { 'Content-Type': 'application/json' }
    });

    console.log('   Second reservation response status:', response2.status());

    // Should fail with 409 Conflict
    expect(response2.status()).toBe(409);
    const data2 = await response2.json();

    console.log('   Response:', data2);

    expect(data2.success).toBe(false);
    expect(data2.error).toContain('not available');

    console.log('   ✅ Conflict prevention works! Second reservation rejected');

    console.log('\n🎉 Concurrent reservation test passed!\n');
  });
});
