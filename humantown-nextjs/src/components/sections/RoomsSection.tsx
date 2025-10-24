'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import RoomCard from '@/components/ui/RoomCard';
import roomsData from '@/lib/data/rooms-data.json';
import Link from 'next/link';
import { RevealOnScroll, FadeIn } from '@/components/animations';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

export default function RoomsSection() {
  // Get first 8 rooms for homepage display
  const featuredRooms = roomsData.rooms.slice(0, 8).filter(
    room => room.capacity && room.size_pyeong
  );

  return (
    <section className="main_rooms" style={{ padding: '100px 0', background: '#fff' }}>
      <FadeIn delay={0.2}>
        <div className="container" style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2
            style={{
              fontSize: '44px',
              fontFamily: 'var(--font-serif)',
              color: 'var(--color-text)',
              marginBottom: '15px',
            }}
          >
            SPACES
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--color-text-light)' }}>
            캠핑 감성 바베큐를 즐기기 위한 6개의 프리미엄 공간
          </p>
        </div>
      </FadeIn>

      <RevealOnScroll delay={0.3} direction="up">
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
          <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={{
            nextEl: '.main_rooms .swiper-button-next',
            prevEl: '.main_rooms .swiper-button-prev',
          }}
          watchSlidesProgress={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            860: {
              slidesPerView: 2,
              spaceBetween: 25,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
          }}
        >
          {featuredRooms.map((room) => (
            <SwiperSlide key={room.id}>
              <RoomCard room={room as any} />
            </SwiperSlide>
          ))}

          {/* Navigation Arrows */}
          <div
            className="swiper-button-prev"
            style={{
              color: 'var(--color-gold)',
              left: '-50px',
            }}
          ></div>
          <div
            className="swiper-button-next"
            style={{
              color: 'var(--color-gold)',
              right: '-50px',
            }}
          ></div>
        </Swiper>
        </div>
      </RevealOnScroll>

      {/* View All Rooms Link */}
      <FadeIn delay={0.5}>
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
        <Link
          href="/rooms"
          style={{
            display: 'inline-block',
            padding: '15px 40px',
            background: 'var(--color-dark)',
            color: '#fff',
            fontSize: '14px',
            textDecoration: 'none',
            transition: 'background 0.3s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--color-gold)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--color-dark)';
          }}
        >
          전체 공간 보기 ({roomsData.total_rooms}개)
        </Link>
        </div>
      </FadeIn>
    </section>
  );
}
