/**
 * Centralized Type Exports
 * Humantown Pension Next.js Project
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
}
