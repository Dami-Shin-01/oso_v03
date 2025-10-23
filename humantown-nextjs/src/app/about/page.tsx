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
              휴먼타운 펜션 소개
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
              자연 속의 특별한 휴식
            </h2>

            <div style={{
              maxWidth: '800px',
              margin: '0 auto',
              fontSize: '16px',
              lineHeight: '1.8',
              color: 'var(--color-text)'
            }}>
              <p style={{ marginBottom: '20px' }}>
                가평 휴먼타운 펜션은 경기도 가평군 북한강변에 위치한 고급 펜션입니다.
                아름다운 자연 경관과 함께 편안한 휴식을 제공하는 22개의 객실과
                다양한 부대시설을 갖추고 있습니다.
              </p>
              <p style={{ marginBottom: '20px' }}>
                각 객실은 20평부터 64평까지 다양한 크기로 구성되어 있으며,
                기준 2인부터 최대 8인까지 수용 가능합니다.
                가족 단위 여행객부터 단체 모임까지 모두 만족하실 수 있는 공간을 제공합니다.
              </p>
              <p>
                수영장, 바베큐, 운동장, 카페, 산책로, 어린이놀이터 등
                6개의 부대시설을 통해 특별한 추억을 만들어보세요.
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
              펜션 특징
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '40px'
            }}>
              {[
                {
                  title: '22개 객실',
                  description: '20평 ~ 64평\n기준 2인 ~ 최대 8인',
                  icon: '🏠'
                },
                {
                  title: '6개 부대시설',
                  description: '수영장, BBQ, 운동장\n카페, 산책로, 놀이터',
                  icon: '⭐'
                },
                {
                  title: '북한강변 위치',
                  description: '아름다운 자연 경관\n힐링 가능한 환경',
                  icon: '🌿'
                },
                {
                  title: '편리한 접근성',
                  description: '서울에서 1시간\n대중교통 이용 가능',
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

        {/* Contact Information */}
        <FadeIn delay={0.5}>
          <section style={{
            background: 'var(--color-dark)',
            color: '#fff',
            padding: '60px 40px',
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
            <p style={{ fontSize: '18px', marginBottom: '10px' }}>
              📍 경기 가평군 가평읍 북한강변로 882 (이화리 23-2)
            </p>
            <p style={{ fontSize: '18px', marginBottom: '10px' }}>
              📞 T. 1833-9306
            </p>
            <p style={{ fontSize: '14px', opacity: 0.8, marginTop: '20px' }}>
              사업자등록번호: 132-81-12613 | 대표: 홍순옥
            </p>
          </section>
        </FadeIn>
      </div>
    </div>
  );
}
