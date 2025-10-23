'use client';

import Link from 'next/link';
import { Facility } from '@/types';
import { facilityImages } from '@/lib/unsplash-images';

interface FacilityCardProps {
  facility: Facility;
  index: number;
}

export default function FacilityCard({ facility, index }: FacilityCardProps) {
  const specialNumber = `SPECIAL${String(index + 1).padStart(2, '0')}`;
  const imageKey = facility.name_english.toLowerCase().replace(/\s+/g, '-');
  const imagePath = facilityImages[imageKey] || facilityImages['swimming-pool'];

  return (
    <div className="facility-card">
      {/* Clickable overlay */}
      <Link href={facility.url} className="link" aria-label={facility.name_english}></Link>

      {/* Main Image */}
      <div
        className="img"
        style={{ backgroundImage: `url('${imagePath}')` }}
        role="img"
        aria-label={`${facility.name_english} - ${facility.name}`}
      ></div>

      {/* Text Content */}
      <div className="txt_box">
        {/* Facility Number Badge */}
        <span className="special_txt">{specialNumber}</span>

        {/* Title (English) */}
        <strong>{facility.name_english}</strong>

        {/* Description (Korean name + details) */}
        <p>
          {facility.name}
          <span className="special_txt">{facility.description}</span>
        </p>

        {/* More Link */}
        <Link href={facility.url} className="btn_more small">
          자세히보기
        </Link>
      </div>
    </div>
  );
}
