'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import FacilityCard from '@/components/ui/FacilityCard';
import facilitiesData from '@/lib/data/facilities-data.json';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

export default function SpecialSection() {
  const facilities = facilitiesData.facilities;

  return (
    <section className="main_special">
      <div className="container" style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h2
          style={{
            fontSize: '44px',
            fontFamily: 'var(--font-serif)',
            color: 'var(--color-text)',
            marginBottom: '15px',
          }}
        >
          SPECIAL
        </h2>
        <p style={{ fontSize: '16px', color: 'var(--color-text-light)' }}>
          휴먼타운 펜션만의 특별한 부대시설
        </p>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        navigation={{
          nextEl: '.main_special .arw_box .swiper-button-next',
          prevEl: '.main_special .arw_box .swiper-button-prev',
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          860: {
            slidesPerView: 2,
            spaceBetween: 25,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        className="swiper-container"
      >
        {facilities.map((facility, index) => (
          <SwiperSlide key={facility.id}>
            <FacilityCard facility={facility} index={index} />
          </SwiperSlide>
        ))}

        {/* Navigation Arrows */}
        <div className="arw_box">
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </div>
      </Swiper>
    </section>
  );
}
