/**
 * Supabase Database Types
 *
 * Auto-generated types for the database schema.
 * These types ensure type safety when working with Supabase queries.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      reservations: {
        Row: {
          id: string;
          room_id: string;
          room_name: string;
          guest_name: string;
          guest_email: string;
          guest_phone: string;
          guest_count: number;
          check_in: string; // Date stored as string in ISO format
          check_out: string;
          nights: number;
          price_per_night: number;
          total_price: number;
          status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
          special_requests: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          room_id: string;
          room_name: string;
          guest_name: string;
          guest_email: string;
          guest_phone: string;
          guest_count: number;
          check_in: string;
          check_out: string;
          price_per_night: number;
          total_price: number;
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';
          special_requests?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          room_id?: string;
          room_name?: string;
          guest_name?: string;
          guest_email?: string;
          guest_phone?: string;
          guest_count?: number;
          check_in?: string;
          check_out?: string;
          price_per_night?: number;
          total_price?: number;
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';
          special_requests?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      room_availability: {
        Row: {
          id: string;
          room_id: string;
          date: string; // Date stored as string in ISO format
          available: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          room_id: string;
          date: string;
          available?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          room_id?: string;
          date?: string;
          available?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// ============================================
// Helper Types
// ============================================

/**
 * Reservation type (from database)
 */
export type Reservation = Database['public']['Tables']['reservations']['Row'];

/**
 * New reservation data (for INSERT)
 */
export type NewReservation =
  Database['public']['Tables']['reservations']['Insert'];

/**
 * Reservation update data (for UPDATE)
 */
export type ReservationUpdate =
  Database['public']['Tables']['reservations']['Update'];

/**
 * Room availability type (from database)
 */
export type RoomAvailability =
  Database['public']['Tables']['room_availability']['Row'];

/**
 * New room availability data (for INSERT)
 */
export type NewRoomAvailability =
  Database['public']['Tables']['room_availability']['Insert'];

// ============================================
// Form Types (Client-side)
// ============================================

/**
 * Reservation form data (before submission)
 */
export interface ReservationFormData {
  // Room selection
  room_id: string;
  room_name: string;

  // Guest information
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  guest_count: number;

  // Dates
  check_in: Date;
  check_out: Date;

  // Pricing
  price_per_night: number;
  total_price: number;

  // Optional
  special_requests?: string;
}

/**
 * Date range for availability check
 */
export interface DateRange {
  from: Date;
  to: Date;
}

/**
 * Availability response
 */
export interface AvailabilityData {
  room_id: string;
  available_dates: string[]; // ISO date strings
  unavailable_dates: string[]; // ISO date strings
}

/**
 * Reservation status type
 */
export type ReservationStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

// ============================================
// API Response Types
// ============================================

/**
 * Generic API response
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Create reservation response
 */
export interface CreateReservationResponse {
  success: boolean;
  reservation?: Reservation;
  error?: string;
  message?: string;
}

/**
 * Get availability response
 */
export interface GetAvailabilityResponse {
  success: boolean;
  availability?: AvailabilityData;
  error?: string;
}

/**
 * Get reservation response
 */
export interface GetReservationResponse {
  success: boolean;
  reservation?: Reservation;
  error?: string;
}
