/**
 * Facility Type Definitions
 * Based on facilities-data.json structure
 */

export interface Facility {
  id: number;
  name: string;
  name_english: string;
  url: string;
  description: string;
  description_english?: string;
  type: string;
  note?: string;
  image_url?: string;
  images?: string[];
}

export interface FacilitiesData {
  total_facilities: number;
  url_pattern: string;
  facilities: Facility[];
  presentation_format?: {
    layout: string;
    navigation: string;
    card_format: {
      heading: string;
      title: string;
      link: string;
    };
  };
  target_audience?: Record<string, string>;
}
