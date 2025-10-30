/**
 * Centralized Type Exports
 * OSO Camping BBQ Next.js Project
 */

// Room Types
export type {
  Room,
  RoomCapacity,
  RoomPricing,
  RoomsData,
} from './room';

// Facility Types
export type {
  Facility,
  FacilitiesData,
} from './facility';

// Supabase/Reservation Types
export type {
  Database,
  Reservation,
  NewReservation,
  ReservationUpdate,
  RoomAvailability,
  NewRoomAvailability,
  ReservationFormData,
  DateRange,
  AvailabilityData,
  ReservationStatus,
  ApiResponse,
  CreateReservationResponse,
  GetAvailabilityResponse,
  GetReservationResponse,
} from './supabase';

// Common Types
export interface NavigationItem {
  id: string;
  label: string;
  url?: string;
  submenu?: Array<{
    label: string;
    url: string;
  }>;
}

export interface SiteInfo {
  site_name: string;
  base_url: string;
  contact: string;
  address: {
    road: string;
    parcel: string;
  };
  business_info: {
    registration: string;
    representative: string;
  };
  description?: string;
}
