/**
 * API Route: Get Reservation by ID
 * GET /api/reservations/[id]
 *
 * Retrieves a reservation by its ID.
 */

import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import type { GetReservationResponse } from '@/types';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Reservation ID is required',
        } as GetReservationResponse,
        { status: 400 }
      );
    }

    // Query reservation
    const { data: reservation, error } = await supabaseAdmin
      .from('reservations')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Reservation query error:', error);

      if (error.code === 'PGRST116') {
        return NextResponse.json(
          {
            success: false,
            error: 'Reservation not found',
          } as GetReservationResponse,
          { status: 404 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          error: 'Failed to retrieve reservation',
        } as GetReservationResponse,
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        reservation,
      } as GetReservationResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      } as GetReservationResponse,
      { status: 500 }
    );
  }
}
