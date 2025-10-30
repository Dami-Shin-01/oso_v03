/**
 * API Route: Create Reservation
 * POST /api/reservations/create
 *
 * Creates a new reservation in the database.
 */

import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import type { NewReservation, CreateReservationResponse } from '@/types';

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      'room_id',
      'room_name',
      'guest_name',
      'guest_email',
      'guest_phone',
      'guest_count',
      'check_in',
      'check_out',
      'price_per_night',
      'total_price',
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          {
            success: false,
            error: `Missing required field: ${field}`,
          } as CreateReservationResponse,
          { status: 400 }
        );
      }
    }

    // Validate dates
    const checkIn = new Date(body.check_in);
    const checkOut = new Date(body.check_out);

    if (checkIn >= checkOut) {
      return NextResponse.json(
        {
          success: false,
          error: 'Check-out date must be after check-in date',
        } as CreateReservationResponse,
        { status: 400 }
      );
    }

    if (checkIn < new Date()) {
      return NextResponse.json(
        {
          success: false,
          error: 'Check-in date cannot be in the past',
        } as CreateReservationResponse,
        { status: 400 }
      );
    }

    // Check room availability for the requested dates
    const { data: unavailableDates, error: availabilityError } = await supabaseAdmin
      .from('room_availability')
      .select('date')
      .eq('room_id', body.room_id)
      .eq('available', false)
      .gte('date', body.check_in)
      .lt('date', body.check_out) as { data: Array<{ date: string }> | null; error: any };

    if (availabilityError) {
      console.error('Availability check error:', availabilityError);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to check room availability',
        } as CreateReservationResponse,
        { status: 500 }
      );
    }

    if (unavailableDates && unavailableDates.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Room is not available for the selected dates',
          message: `Unavailable dates: ${unavailableDates.map((d) => d.date).join(', ')}`,
        } as CreateReservationResponse,
        { status: 409 }
      );
    }

    // Prepare reservation data
    const reservationData: NewReservation = {
      room_id: body.room_id,
      room_name: body.room_name,
      guest_name: body.guest_name,
      guest_email: body.guest_email,
      guest_phone: body.guest_phone,
      guest_count: parseInt(body.guest_count),
      check_in: body.check_in,
      check_out: body.check_out,
      price_per_night: parseInt(body.price_per_night),
      total_price: parseInt(body.total_price),
      status: 'pending',
      special_requests: body.special_requests || null,
    };

    // Insert reservation
    const { data: reservation, error: insertError } = await supabaseAdmin
      .from('reservations')
      // @ts-ignore - Supabase type inference issue with insert
      .insert(reservationData)
      .select()
      .single();

    if (insertError) {
      console.error('Reservation insert error:', insertError);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to create reservation',
        } as CreateReservationResponse,
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        reservation,
        message: 'Reservation created successfully',
      } as CreateReservationResponse,
      { status: 201 }
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      } as CreateReservationResponse,
      { status: 500 }
    );
  }
}
