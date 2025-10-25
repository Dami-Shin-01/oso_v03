'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
import { heroImages } from '@/lib/unsplash-images';
import { FadeIn } from '@/components/animations';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

interface HeroSlide {
  image: string;
  altText: string;
  overlay?: {
    title: string;
    subtitle: string;
    description: string;
  };
}

const heroSlides: HeroSlide[] = [
  {
    image: heroImages.slide1,
    altText: '오소캠핑바베큐의 자연 경관',
    overlay: {
      title: 'Welcome to OSO',
      subtitle: 'OSO CAMPING BBQ',
      description: 'Enjoy Camping Vibe BBQ',
    },
  },
  {
    image: heroImages.slide2,
    altText: '오소캠핑바베큐의 캠핑 공간',
  },
  {
    image: heroImages.slide3,
    altText: '오소캠핑바베큐의 야경',
  },
];

export default function HeroSection() {
  return (
    <section className="main_visual">
      <Swiper
        className="swiper-container visual-swiper"
        modules={[Autoplay, EffectFade, Navigation]}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        navigation={{
          nextEl: '.arw_box .swiper-button-next',
          prevEl: '.arw_box .swiper-button-prev',
        }}
        speed={1000}
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="img"
              style={{ backgroundImage: `url('${slide.image}')` }}
              role="img"
              aria-label={slide.altText}
            >
              {slide.overlay && (
                <FadeIn delay={0.5} duration={0.8}>
                  <div className="txt_overlay">
                    <h1>{slide.overlay.title}</h1>
                    <p>{slide.overlay.subtitle}</p>
                    <span>{slide.overlay.description}</span>
                  </div>
                </FadeIn>
              )}
            </div>
          </SwiperSlide>
        ))}

        {/* Navigation Arrows */}
        <div className="arw_box">
          <div className="swiper-button-prev" role="button" tabIndex={0} aria-label="이전 슬라이드"></div>
          <div className="swiper-button-next" role="button" tabIndex={0} aria-label="다음 슬라이드"></div>
        </div>
      </Swiper>

      {/* Scroll Down Indicator */}
      <FadeIn delay={1} duration={0.8}>
        <div className="scroll_down" aria-label="아래로 스크롤하여 더보기">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M15 5L15 25M15 25L10 20M15 25L20 20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </FadeIn>
    </section>
  );
}
