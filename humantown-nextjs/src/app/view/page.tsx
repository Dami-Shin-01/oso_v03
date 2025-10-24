'use client';

import Image from 'next/image';
import { useState } from 'react';
import { exteriorImages } from '@/lib/unsplash-images';
import { FadeIn, RevealOnScroll } from '@/components/animations';

export default function ViewPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '100px' }}>
      {/* Page Header */}
      <FadeIn delay={0.2}>
        <section style={{
          background: 'var(--color-bg-light)',
          padding: '60px 0',
          marginBottom: '80px'
        }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <h1 style={{
              fontSize: '48px',
              fontFamily: 'var(--font-heading)',
              color: 'var(--color-primary)',
              marginBottom: '20px'
            }}>
              VIEW
            </h1>
            <p style={{
              fontSize: '18px',
              fontFamily: 'var(--font-serif)',
              color: 'var(--color-text-light)'
            }}>
              오소캠핑바베큐 시설 외경
            </p>
          </div>
        </section>
      </FadeIn>

      <div className="container">
        {/* Introduction */}
        <RevealOnScroll delay={0.3} direction="up">
          <section style={{ marginBottom: '60px', textAlign: 'center' }}>
            <h2 style={{
              fontSize: '32px',
              fontFamily: 'var(--font-serif)',
              color: 'var(--color-text)',
              marginBottom: '20px'
            }}>
              자연과 함께하는 공간
            </h2>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: 'var(--color-text-light)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              부락한 한 자락 속에 위치한 오소 캠핑바베큐의 외경을 감상하세요.
              사계절 각기 다른 매력을 선사하는 오소의 모습을 담았습니다.
            </p>
          </section>
        </RevealOnScroll>

        {/* Photo Gallery */}
        <section>
          <RevealOnScroll delay={0.4} direction="up">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '30px',
              marginBottom: '40px'
            }}>
              {exteriorImages.map((image, index) => (
                <div
                  key={index}
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '280px',
                    borderRadius: 'var(--radius)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                  onClick={() => setSelectedImage(image)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                  }}
                >
                  <Image
                    src={image}
                    alt={`오소캠핑바베큐 외경 ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                    priority={index < 3}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
                    padding: '30px 20px 20px',
                    color: '#fff',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    오소 캠핑바베큐 {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </RevealOnScroll>

          {/* Info Text */}
          <FadeIn delay={0.6}>
            <div style={{
              background: 'var(--color-bg-light)',
              padding: '40px',
              borderRadius: 'var(--radius)',
              textAlign: 'center'
            }}>
              <p style={{
                fontSize: '15px',
                color: 'var(--color-text-light)',
                lineHeight: '1.8'
              }}>
                * 실제 시설의 모습은 계절과 날씨에 따라 다를 수 있습니다.<br />
                * 사진을 클릭하시면 크게 보실 수 있습니다.
              </p>
            </div>
          </FadeIn>
        </section>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
            cursor: 'pointer'
          }}
          onClick={() => setSelectedImage(null)}
        >
          <button
            style={{
              position: 'absolute',
              top: '30px',
              right: '30px',
              width: '40px',
              height: '40px',
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '50%',
              color: '#fff',
              fontSize: '24px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.3s'
            }}
            onClick={() => setSelectedImage(null)}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
            }}
            aria-label="사진 보기 닫기"
          >
            ×
          </button>
          <div style={{
            position: 'relative',
            maxWidth: '90vw',
            maxHeight: '90vh',
            width: '1200px',
            height: '800px'
          }}>
            <Image
              src={selectedImage}
              alt="확대 이미지"
              fill
              sizes="90vw"
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
