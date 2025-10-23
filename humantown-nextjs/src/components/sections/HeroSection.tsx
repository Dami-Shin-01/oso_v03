'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
import { heroImages } from '@/lib/unsplash-images';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

interface HeroSlide {
  image: string;
  overlay?: {
    title: string;
    subtitle: string;
    description: string;
  };
}

const heroSlides: HeroSlide[] = [
  {
    image: heroImages.slide1,
    overlay: {
      title: 'Welcome',
      subtitle: 'Humantown Pension',
      description: 'Relaxation in Nature',
    },
  },
  {
    image: heroImages.slide2,
  },
  {
    image: heroImages.slide3,
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
            >
              {slide.overlay && (
                <div className="txt_overlay">
                  <h1>{slide.overlay.title}</h1>
                  <p>{slide.overlay.subtitle}</p>
                  <span>{slide.overlay.description}</span>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}

        {/* Navigation Arrows */}
        <div className="arw_box">
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </div>
      </Swiper>

      {/* Scroll Down Indicator */}
      <div className="scroll_down">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 5L15 25M15 25L10 20M15 25L20 20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  );
}
