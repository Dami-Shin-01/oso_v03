/**
 * Room Type Definitions
 * Based on rooms-data.json structure
 */

export interface RoomCapacity {
  standard: number;
  maximum: number;
}

export interface RoomPricing {
  peak: {
    weekday: number;
    friday: number;
    weekend: number;
  };
  off_season: {
    weekday: number;
    friday: number;
    weekend: number;
  };
  standard: {
    weekday: number;
    friday: number;
    weekend: number;
  };
}

export interface Room {
  id: string;
  name: string;
  name_english: string;
  size_pyeong: number;
  size_sqm: number;
  capacity: RoomCapacity;
  type: string;
  type_english: string;
  pricing: RoomPricing;
  amenities: string[];
  image_url?: string;
  images?: string[];
}

export interface RoomsData {
  total_rooms: number;
  url_pattern: string;
  naming_theme: string;
  rooms: Room[];
}
