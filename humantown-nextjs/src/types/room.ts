/**
 * Room Type Definitions
 * Based on rooms-data.json structure
 */

export interface RoomCapacity {
  standard: number;
  maximum: number;
}

export interface RoomPricing {
  peak?: {
    weekday?: number;
    friday?: number;
    weekend?: number;
  };
  off_season?: {
    weekday?: number;
    friday?: number;
    weekend?: number;
  };
  standard?: {
    weekday?: number;
    friday?: number;
    weekend?: number;
  };
  // OSO Camping BBQ pricing structure
  '3hour'?: {
    per_person?: number;
  };
  '7hour'?: {
    per_person?: number;
  };
  '12hour'?: {
    per_person?: number;
  };
  daytime?: {
    package?: number;
  };
  allnight?: {
    package?: number;
  };
  weekday?: number;
  weekend_holiday?: number;
}

export interface Room {
  id: string;
  name: string;
  name_english?: string;
  size_pyeong?: number;
  size_sqm?: number;
  capacity?: RoomCapacity;
  type?: string;
  type_english?: string;
  pricing?: RoomPricing;
  amenities?: string[];
  amenities_count?: number;
  image_url?: string;
  images?: string[];
}

export interface RoomsData {
  total_rooms: number;
  url_pattern: string;
  naming_theme: string;
  rooms: Room[];
}
