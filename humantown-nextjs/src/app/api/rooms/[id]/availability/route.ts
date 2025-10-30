/**
 * API Route: Get Room Availability
 * GET /api/rooms/[id]/availability?from=YYYY-MM-DD&to=YYYY-MM-DD
 *
 * Retrieves availability data for a specific room within a date range.
 */

import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import type { GetAvailabilityResponse, AvailabilityData } from '@/types';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: room_id } = await params;
    const { searchParams } = new URL(request.url);
    const from = searchParams.get('from');
    const to = searchParams.get('to');

    // Validate room_id
    if (!room_id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Room ID is required',
        } as GetAvailabilityResponse,
        { status: 400 }
      );
    }

    // Validate date parameters
    if (!from || !to) {
      return NextResponse.json(
        {
          success: false,
          error: 'Both "from" and "to" date parameters are required',
        } as GetAvailabilityResponse,
        { status: 400 }
      );
    }

    const fromDate = new Date(from);
    const toDate = new Date(to);

    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid date format. Use YYYY-MM-DD',
        } as GetAvailabilityResponse,
        { status: 400 }
      );
    }

    if (fromDate >= toDate) {
      return NextResponse.json(
        {
          success: false,
          error: '"to" date must be after "from" date',
        } as GetAvailabilityResponse,
        { status: 400 }
      );
    }

    // Query room availability
    const { data: availabilityRecords, error } = await supabaseAdmin
      .from('room_availability')
      .select('date, available')
      .eq('room_id', room_id)
      .gte('date', from)
      .lte('date', to)
      .order('date', { ascending: true }) as { data: Array<{ date: string; available: boolean }> | null; error: any };

    if (error) {
      console.error('Availability query error:', error);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to retrieve availability data',
        } as GetAvailabilityResponse,
        { status: 500 }
      );
    }

    // Generate all dates in range
    const allDates: string[] = [];
    const currentDate = new Date(fromDate);
    while (currentDate <= toDate) {
      allDates.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Build availability map
    const availabilityMap = new Map<string, boolean>();
    if (availabilityRecords) {
      availabilityRecords.forEach((record) => {
        availabilityMap.set(record.date, record.available);
      });
    }

    // Separate available and unavailable dates
    const available_dates: string[] = [];
    const unavailable_dates: string[] = [];

    allDates.forEach((date) => {
      // If no record exists, assume available
      const isAvailable = availabilityMap.get(date) ?? true;
      if (isAvailable) {
        available_dates.push(date);
      } else {
        unavailable_dates.push(date);
      }
    });

    const availabilityData: AvailabilityData = {
      room_id,
      available_dates,
      unavailable_dates,
    };

    return NextResponse.json(
      {
        success: true,
        availability: availabilityData,
      } as GetAvailabilityResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      } as GetAvailabilityResponse,
      { status: 500 }
    );
  }
}
