/**
 * API Route: Cancel Reservation
 * POST /api/reservations/[id]/cancel
 *
 * Cancels a reservation by updating its status to 'cancelled'.
 * This will automatically trigger the database function to unblock the dates.
 */

import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import type { ApiResponse, Reservation } from '@/types';

export async function POST(
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
        } as ApiResponse<Reservation>,
        { status: 400 }
      );
    }

    // Check if reservation exists and is not already cancelled
    const { data: existingReservation, error: fetchError } = await supabaseAdmin
      .from('reservations')
      .select('*')
      .eq('id', id)
      .single<Reservation>();

    if (fetchError) {
      console.error('Fetch reservation error:', fetchError);

      if (fetchError.code === 'PGRST116') {
        return NextResponse.json(
          {
            success: false,
            error: 'Reservation not found',
          } as ApiResponse<Reservation>,
          { status: 404 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          error: 'Failed to retrieve reservation',
        } as ApiResponse<Reservation>,
        { status: 500 }
      );
    }

    if (!existingReservation) {
      return NextResponse.json(
        {
          success: false,
          error: 'Reservation not found',
        } as ApiResponse<Reservation>,
        { status: 404 }
      );
    }

    if (existingReservation.status === 'cancelled') {
      return NextResponse.json(
        {
          success: false,
          error: 'Reservation is already cancelled',
        } as ApiResponse<Reservation>,
        { status: 400 }
      );
    }

    if (existingReservation.status === 'completed') {
      return NextResponse.json(
        {
          success: false,
          error: 'Cannot cancel a completed reservation',
        } as ApiResponse<Reservation>,
        { status: 400 }
      );
    }

    // Update reservation status to 'cancelled'
    const { data: updatedReservation, error: updateError } =
      await supabaseAdmin
        .from('reservations')
        // @ts-ignore - Supabase type inference issue with update
        .update({ status: 'cancelled' })
        .eq('id', id)
        .select()
        .single<Reservation>();

    if (updateError) {
      console.error('Update reservation error:', updateError);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to cancel reservation',
        } as ApiResponse<Reservation>,
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: updatedReservation,
        message: 'Reservation cancelled successfully',
      } as ApiResponse<Reservation>,
      { status: 200 }
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      } as ApiResponse<Reservation>,
      { status: 500 }
    );
  }
}
