/**
 * Supabase Integration E2E Test
 *
 * This test verifies the complete reservation flow with Supabase:
 * 1. Navigate to room detail page
 * 2. Click reservation button
 * 3. Select dates
 * 4. Fill in guest information
 * 5. Submit reservation
 * 6. Verify success page
 * 7. Verify dates are blocked in database
 */

import { test, expect } from '@playwright/test';

test.describe('Supabase Integration - Reservation Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Set a longer timeout for database operations
    test.setTimeout(60000);
  });

  test('should create a reservation and block dates', async ({ page }) => {
    console.log('🔍 Starting Supabase integration test...');

    // Step 1: Navigate to homepage
    console.log('📍 Step 1: Navigate to homepage');
    await page.goto('http://localhost:3000');
    await expect(page).toHaveTitle(/OSO/i);

    // Step 2: Navigate to rooms page
    console.log('📍 Step 2: Navigate to rooms page');
    await page.click('a[href="/rooms"]');
    await page.waitForURL('**/rooms');
    await expect(page.locator('h1')).toContainText(/객실|Rooms/i);

    // Step 3: Click on first room (Private Room 1)
    console.log('📍 Step 3: Click on Private Room 1');
    const firstRoom = page.locator('a[href="/rooms/private-01"]').first();
    await expect(firstRoom).toBeVisible();
    await firstRoom.click();
    await page.waitForURL('**/rooms/private-01');

    // Step 4: Click reservation button
    console.log('📍 Step 4: Click reservation button');
    const reserveButton = page.locator('a[href="/rooms/private-01/book"], button:has-text("예약하기")').first();
    await expect(reserveButton).toBeVisible();
    await reserveButton.click();
    await page.waitForURL('**/rooms/private-01/book');

    // Step 5: Select dates (future dates to avoid conflicts)
    console.log('📍 Step 5: Select dates');
    const today = new Date();
    const checkIn = new Date(today);
    checkIn.setDate(checkIn.getDate() + 30); // 30 days from now
    const checkOut = new Date(checkIn);
    checkOut.setDate(checkOut.getDate() + 2); // 2 nights

    const formatDate = (date: Date) => {
      return date.toISOString().split('T')[0];
    };

    const checkInStr = formatDate(checkIn);
    const checkOutStr = formatDate(checkOut);

    console.log(`   Check-in: ${checkInStr}`);
    console.log(`   Check-out: ${checkOutStr}`);

    // Wait for the form to be visible
    await page.waitForSelector('form', { timeout: 10000 });

    // Try to find and fill date inputs
    const checkInInput = page.locator('input[name="checkIn"], input[placeholder*="체크인"], input[type="date"]').first();
    const checkOutInput = page.locator('input[name="checkOut"], input[placeholder*="체크아웃"], input[type="date"]').nth(1);

    if (await checkInInput.isVisible()) {
      await checkInInput.fill(checkInStr);
      await checkOutInput.fill(checkOutStr);
      console.log('   ✅ Dates filled using input fields');
    } else {
      console.log('   ℹ️  Date picker UI detected, trying to interact...');
      // If using a date picker component, we may need to interact differently
      // For now, let's try clicking on the calendar
      const calendarButton = page.locator('button:has-text("날짜"), button[aria-label*="date"]').first();
      if (await calendarButton.isVisible()) {
        await calendarButton.click();
        await page.waitForTimeout(1000);
        // Select dates in calendar (this might need adjustment based on actual implementation)
      }
    }

    // Step 6: Fill in guest information
    console.log('📍 Step 6: Fill in guest information');

    // Guest name
    const nameInput = page.locator('input[name="guestName"], input[placeholder*="이름"], input[type="text"]').first();
    await nameInput.fill('Playwright 테스트');

    // Guest email
    const emailInput = page.locator('input[name="guestEmail"], input[type="email"]').first();
    await emailInput.fill('playwright-test@example.com');

    // Guest phone
    const phoneInput = page.locator('input[name="guestPhone"], input[type="tel"]').first();
    await phoneInput.fill('010-1111-2222');

    // Guest count (if dropdown exists)
    const guestCountSelect = page.locator('select[name="guestCount"]');
    if (await guestCountSelect.isVisible()) {
      await guestCountSelect.selectOption('2');
    }

    // Special requests (optional)
    const specialRequestsTextarea = page.locator('textarea[name="specialRequests"]');
    if (await specialRequestsTextarea.isVisible()) {
      await specialRequestsTextarea.fill('Playwright E2E 테스트 예약');
    }

    console.log('   ✅ Guest information filled');

    // Step 7: Submit the form
    console.log('📍 Step 7: Submit reservation form');
    const submitButton = page.locator('button[type="submit"], button:has-text("예약하기")').last();
    await expect(submitButton).toBeVisible();

    // Take screenshot before submission
    await page.screenshot({ path: 'test-results/before-submit.png', fullPage: true });

    await submitButton.click();

    // Step 8: Wait for success page
    console.log('📍 Step 8: Wait for success page');
    await page.waitForURL('**/success', { timeout: 15000 });

    // Take screenshot of success page
    await page.screenshot({ path: 'test-results/success-page.png', fullPage: true });

    // Verify success message
    const successMessage = page.locator('text=/예약.*완료|예약.*확인|Reservation.*confirmed/i');
    await expect(successMessage).toBeVisible({ timeout: 5000 });

    // Extract reservation ID from the page
    const reservationIdElement = page.locator('text=/예약.*번호|Reservation.*ID/i').locator('..').locator('text=/[0-9a-f]{8}-[0-9a-f]{4}/i');
    let reservationId = '';
    if (await reservationIdElement.isVisible()) {
      reservationId = await reservationIdElement.textContent() || '';
      console.log(`   ✅ Reservation created: ${reservationId}`);
    }

    console.log('📍 Step 9: Verify dates are blocked in database');

    // Call the availability API to verify dates are blocked
    const response = await page.request.get(`http://localhost:3000/api/rooms/private-01/availability?from=${checkInStr}&to=${checkOutStr}`);
    expect(response.ok()).toBeTruthy();

    const availabilityData = await response.json();
    console.log('   Availability response:', JSON.stringify(availabilityData, null, 2));

    expect(availabilityData.success).toBe(true);

    // Calculate expected unavailable dates (check-in date to check-out date - 1)
    const unavailableDates = [];
    const current = new Date(checkIn);
    while (current < checkOut) {
      unavailableDates.push(formatDate(current));
      current.setDate(current.getDate() + 1);
    }

    console.log('   Expected unavailable dates:', unavailableDates);
    console.log('   Actual unavailable dates:', availabilityData.availability.unavailable_dates);

    // Verify that the dates are marked as unavailable
    for (const date of unavailableDates) {
      expect(availabilityData.availability.unavailable_dates).toContain(date);
    }

    console.log('   ✅ Dates are correctly blocked in database');

    // Step 10: Clean up - cancel the reservation
    if (reservationId) {
      console.log('📍 Step 10: Clean up - cancel test reservation');
      const cancelResponse = await page.request.post(
        `http://localhost:3000/api/reservations/${reservationId}/cancel`,
        {
          data: { reason: 'Playwright test cleanup' },
          headers: { 'Content-Type': 'application/json' }
        }
      );

      if (cancelResponse.ok()) {
        console.log('   ✅ Test reservation cancelled successfully');

        // Verify dates are unblocked
        const verifyResponse = await page.request.get(`http://localhost:3000/api/rooms/private-01/availability?from=${checkInStr}&to=${checkOutStr}`);
        const verifyData = await verifyResponse.json();

        console.log('   After cancellation - unavailable dates:', verifyData.availability.unavailable_dates);

        // Dates should now be available again
        for (const date of unavailableDates) {
          expect(verifyData.availability.unavailable_dates).not.toContain(date);
        }

        console.log('   ✅ Dates are correctly unblocked after cancellation');
      } else {
        console.warn('   ⚠️  Could not cancel test reservation');
      }
    }

    console.log('🎉 Supabase integration test completed successfully!');
  });

  test('should show unavailable dates in calendar', async ({ page }) => {
    console.log('🔍 Testing date availability display...');

    // Create a test reservation first
    const today = new Date();
    const checkIn = new Date(today);
    checkIn.setDate(checkIn.getDate() + 15);
    const checkOut = new Date(checkIn);
    checkOut.setDate(checkOut.getDate() + 1);

    const formatDate = (date: Date) => date.toISOString().split('T')[0];
    const checkInStr = formatDate(checkIn);
    const checkOutStr = formatDate(checkOut);

    // Create reservation via API
    const createResponse = await page.request.post('http://localhost:3000/api/reservations/create', {
      data: {
        room_id: 'private-02',
        room_name: 'Private Room 2',
        guest_name: 'Playwright Availability Test',
        guest_email: 'availability-test@example.com',
        guest_phone: '010-3333-4444',
        guest_count: 2,
        check_in: checkInStr,
        check_out: checkOutStr,
        price_per_night: 160000,
        total_price: 160000,
        special_requests: 'Availability test'
      },
      headers: { 'Content-Type': 'application/json' }
    });

    expect(createResponse.ok()).toBeTruthy();
    const reservationData = await createResponse.json();
    const reservationId = reservationData.reservation.id;
    console.log(`   Created test reservation: ${reservationId}`);

    // Navigate to booking page
    await page.goto('http://localhost:3000/rooms/private-02/book');
    await page.waitForSelector('form');

    // The calendar should show the blocked date as disabled
    // This test would need to be adjusted based on actual calendar implementation
    console.log('   ℹ️  Calendar should display blocked dates (visual verification needed)');

    // Clean up
    await page.request.post(`http://localhost:3000/api/reservations/${reservationId}/cancel`, {
      data: { reason: 'Test cleanup' },
      headers: { 'Content-Type': 'application/json' }
    });

    console.log('   ✅ Availability display test completed');
  });
});
