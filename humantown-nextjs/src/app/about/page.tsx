'use client';

import Image from 'next/image';
import { FadeIn, RevealOnScroll } from '@/components/animations';

export default function AboutPage() {
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
              ABOUT
            </h1>
            <p style={{
              fontSize: '18px',
              fontFamily: 'var(--font-serif)',
              color: 'var(--color-text-light)'
            }}>
              오소캠핑바베큐 소개
            </p>
          </div>
        </section>
      </FadeIn>

      <div className="container">
        {/* Main Introduction */}
        <RevealOnScroll delay={0.3} direction="up">
          <section style={{ marginBottom: '100px' }}>
            <h2 style={{
              fontSize: '36px',
              fontFamily: 'var(--font-serif)',
              color: 'var(--color-text)',
              textAlign: 'center',
              marginBottom: '40px'
            }}>
              부담없이 즐기는 캠핑 감성 바베큐
            </h2>

            <div style={{
              maxWidth: '800px',
              margin: '0 auto',
              fontSize: '16px',
              lineHeight: '1.8',
              color: 'var(--color-text)'
            }}>
              <p style={{ marginBottom: '20px' }}>
                오소캠핑바베큐는 경기도 평택시에 위치한 캠핑 감성의 셀프 바베큐장입니다.
                프라이빗룸 5개와 VIP동 1개, 총 6개의 프리미엄 공간과 텐트동, 야외테이블 공간,
                풍부한 부대시설을 갖추고 있습니다.
              </p>
              <p style={{ marginBottom: '20px' }}>
                외부 음식 반입이 가능하며, 숯, 그릴, 고기 등 모든 물품을 대여하거나 구매할 수 있습니다.
                소규모 모임부터 단체 행사까지 모두 만족하실 수 있는 공간을 제공합니다.
              </p>
              <p>
                물놀이장, 키즈존, 내부 카페, 식당, 잔디광장, 넓은 주차공간 등
                다양한 부대시설을 통해 특별한 추억을 만들어보세요.
              </p>
            </div>
          </section>
        </RevealOnScroll>

        {/* Features Grid */}
        <RevealOnScroll delay={0.4} direction="up">
          <section style={{ marginBottom: '100px' }}>
            <h2 style={{
              fontSize: '32px',
              fontFamily: 'var(--font-serif)',
              color: 'var(--color-text)',
              textAlign: 'center',
              marginBottom: '50px'
            }}>
              오소캠핑바베큐 특징
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '40px'
            }}>
              {[
                {
                  title: '6개 프리미엄 공간',
                  description: '프라이빗룸 5개\nVIP동 1개',
                  icon: '🏕️'
                },
                {
                  title: '풍부한 부대시설',
                  description: '물놀이장, 키즈존, 내부 카페\n식당, 잔디광장, 주차장',
                  icon: '⭐'
                },
                {
                  title: '자유로운 이용',
                  description: '외부음식 반입 가능\n모든 물품 대여/구매 가능',
                  icon: '🍖'
                },
                {
                  title: '서울 1시간 거리',
                  description: '접근성 우수\n넓은 주차 공간',
                  icon: '🚗'
                }
              ].map((feature, index) => (
                <div key={index} style={{
                  padding: '40px 30px',
                  background: '#fff',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius)',
                  textAlign: 'center',
                  transition: 'transform 0.3s, box-shadow 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '20px' }}>
                    {feature.icon}
                  </div>
                  <h3 style={{
                    fontSize: '24px',
                    fontFamily: 'var(--font-serif)',
                    color: 'var(--color-text)',
                    marginBottom: '15px'
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{
                    fontSize: '15px',
                    color: 'var(--color-text-light)',
                    whiteSpace: 'pre-line',
                    lineHeight: '1.6'
                  }}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </RevealOnScroll>

        {/* Contact Information & Location */}
        <FadeIn delay={0.5}>
          <section style={{ marginBottom: '80px' }}>
            <div style={{
              background: 'var(--color-dark)',
              color: '#fff',
              padding: '50px 40px',
              borderRadius: 'var(--radius)',
              textAlign: 'center'
            }}>
              <h2 style={{
                fontSize: '32px',
                fontFamily: 'var(--font-serif)',
                marginBottom: '30px'
              }}>
                오시는 길
              </h2>
              <p style={{ fontSize: '18px', marginBottom: '15px' }}>
                📍 경기 평택시 지산로 282-31
              </p>
              <p style={{ fontSize: '18px', marginBottom: '30px' }}>
                📞 T.0507-1380-0203
              </p>
              <div style={{
                display: 'flex',
                gap: '15px',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                <a
                  href="tel:1833-9306"
                  style={{
                    padding: '12px 30px',
                    background: 'var(--color-gold)',
                    color: '#fff',
                    borderRadius: 'var(--radius)',
                    textDecoration: 'none',
                    fontSize: '15px',
                    fontWeight: 'bold',
                    transition: 'background 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--color-gold-dark)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--color-gold)';
                  }}
                  aria-label="오소캠핑바베큐에 전화 걸기: 0507-1380-0203"
                >
                  전화 걸기
                </a>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText('경기 평택시 지산로 282-31');
                    alert('주소가 복사되었습니다.');
                  }}
                  style={{
                    padding: '12px 30px',
                    background: 'rgba(255,255,255,0.2)',
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.3)',
                    borderRadius: 'var(--radius)',
                    cursor: 'pointer',
                    fontSize: '15px',
                    fontWeight: 'bold',
                    transition: 'background 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                  }}
                  aria-label="주소 클립보드에 복사: 경기 평택시 지산로 282-31"
                >
                  주소 복사
                </button>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Map */}
        <RevealOnScroll delay={0.6} direction="up">
          <section style={{ marginBottom: '80px' }}>
            <h2 style={{
              fontSize: '28px',
              fontFamily: 'var(--font-serif)',
              color: 'var(--color-text)',
              marginBottom: '30px',
              textAlign: 'center'
            }}>
              지도
            </h2>
            <div style={{
              width: '100%',
              height: '450px',
              background: 'var(--color-bg-light)',
              borderRadius: 'var(--radius)',
              overflow: 'hidden',
              border: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <p style={{
                  fontSize: '16px',
                  color: 'var(--color-text-light)',
                  marginBottom: '20px'
                }}>
                  지도는 여기에 표시됩니다
                </p>
                <p style={{ fontSize: '14px', color: 'var(--color-text-light)' }}>
                  실제 구현 시 Kakao Map 또는 Google Maps API를 사용하세요
                </p>
                <div style={{ marginTop: '20px' }}>
                  <a
                    href="https://map.kakao.com/link/search/경기 평택시 지산로 282-31"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      padding: '10px 25px',
                      background: 'var(--color-gold)',
                      color: '#fff',
                      borderRadius: 'var(--radius)',
                      textDecoration: 'none',
                      fontSize: '14px',
                      marginRight: '10px'
                    }}
                    aria-label="카카오맵에서 오소캠핑바베큐 위치 보기 (새 창)"
                  >
                    카카오맵 보기
                  </a>
                  <a
                    href="https://www.google.com/maps/search/경기+평택시+지산로+282-31"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      padding: '10px 25px',
                      background: 'var(--color-primary)',
                      color: '#fff',
                      borderRadius: 'var(--radius)',
                      textDecoration: 'none',
                      fontSize: '14px'
                    }}
                    aria-label="구글맵에서 오소캠핑바베큐 위치 보기 (새 창)"
                  >
                    구글맵 보기
                  </a>
                </div>
              </div>
            </div>
          </section>
        </RevealOnScroll>

        {/* Parking Info */}
        <FadeIn delay={0.7}>
          <section>
            <div style={{
              background: 'var(--color-bg-light)',
              padding: '40px',
              borderRadius: 'var(--radius)',
              textAlign: 'center'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontFamily: 'var(--font-serif)',
                color: 'var(--color-text)',
                marginBottom: '20px'
              }}>
                주차 안내
              </h3>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: 'var(--color-text-light)',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                • 넓은 주차장으로 대형 차량도 주차 가능합니다<br />
                • 주차 요금은 무료입니다
              </p>
            </div>
          </section>
        </FadeIn>
      </div>
    </div>
  );
}
