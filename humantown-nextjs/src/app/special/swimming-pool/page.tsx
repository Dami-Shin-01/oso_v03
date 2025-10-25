import Image from 'next/image';
import Link from 'next/link';
import { facilityImages } from '@/lib/unsplash-images';

export default function SwimmingPoolPage() {
  return (
    <div style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '100px' }}>
      {/* Page Header */}
      <section style={{
        background: 'var(--color-bg-light)',
        padding: '60px 0',
        marginBottom: '60px'
      }}>
        <div className="container">
          <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
            <h1 style={{
              fontSize: '48px',
              fontFamily: 'var(--font-heading)',
              color: 'var(--color-primary)',
              marginBottom: '20px'
            }}>
              물놀이장
            </h1>
            <p style={{
              fontSize: '18px',
              fontFamily: 'var(--font-serif)',
              color: 'var(--color-text-light)'
            }}>
              Water Play Area
            </p>
          </div>
        </div>
      </section>

      <div className="container">
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {/* Main Image */}
          <section style={{ marginBottom: '60px' }}>
            <div style={{
              position: 'relative',
              width: '100%',
              height: '500px',
              borderRadius: 'var(--radius)',
              overflow: 'hidden'
            }}>
              <Image
                src={facilityImages['swimming-pool']}
                alt="물놀이장"
                fill
                sizes="100vw"
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          </section>

          {/* Description */}
          <section style={{ marginBottom: '60px', textAlign: 'center' }}>
            <h2 style={{
              fontSize: '32px',
              fontFamily: 'var(--font-serif)',
              color: 'var(--color-text)',
              marginBottom: '30px'
            }}>
              시원한 여름을 즐기세요
            </h2>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: 'var(--color-text)',
              marginBottom: '20px'
            }}>
              여름철 운영되는 야외 물놀이장에서 시원한 물놀이를 즐겨보세요.
              어른과 아이 모두가 안전하게 즐길 수 있도록 깊이가 다양하게 구성되어 있습니다.
            </p>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: 'var(--color-text)'
            }}>
              북한강변의 아름다운 자연을 감상하며 가족, 친구들과 함께
              특별한 추억을 만들어보세요.
            </p>
          </section>

          {/* Info Grid */}
          <section style={{ marginBottom: '60px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '30px'
            }}>
              <div style={{
                background: '#fff',
                padding: '30px',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius)',
                textAlign: 'center'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: 'var(--color-text)',
                  marginBottom: '15px'
                }}>
                  운영 기간
                </h3>
                <p style={{ fontSize: '16px', color: 'var(--color-gold)', fontWeight: 'bold' }}>
                  7월 ~ 8월
                </p>
                <p style={{ fontSize: '14px', color: 'var(--color-text-light)', marginTop: '5px' }}>
                  (여름철 한정)
                </p>
              </div>

              <div style={{
                background: '#fff',
                padding: '30px',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius)',
                textAlign: 'center'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: 'var(--color-text)',
                  marginBottom: '15px'
                }}>
                  이용 시간
                </h3>
                <p style={{ fontSize: '16px', color: 'var(--color-text)' }}>
                  10:00 ~ 19:00
                </p>
              </div>

              <div style={{
                background: '#fff',
                padding: '30px',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius)',
                textAlign: 'center'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: 'var(--color-text)',
                  marginBottom: '15px'
                }}>
                  이용 요금
                </h3>
                <p style={{ fontSize: '16px', color: 'var(--color-gold)', fontWeight: 'bold' }}>
                  투숙객 무료
                </p>
              </div>
            </div>
          </section>

          {/* Usage Notice */}
          <section style={{ marginBottom: '60px' }}>
            <div style={{
              background: 'var(--color-bg-light)',
              padding: '40px',
              borderRadius: 'var(--radius)'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontFamily: 'var(--font-serif)',
                color: 'var(--color-text)',
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                이용 안내
              </h3>
              <div style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: 'var(--color-text)',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                <p style={{ marginBottom: '10px' }}>
                  • 안전을 위해 보호자 동반 하에 이용해주세요
                </p>
                <p style={{ marginBottom: '10px' }}>
                  • 수영복, 수영모자를 착용해주세요
                </p>
                <p style={{ marginBottom: '10px' }}>
                  • 음식물 반입은 금지되어 있습니다
                </p>
                <p style={{ marginBottom: '10px' }}>
                  • 안전 요원이 상주하지 않으니 안전에 유의해주세요
                </p>
                <p>
                  • 날씨에 따라 운영이 중단될 수 있습니다
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section>
            <div style={{
              background: 'var(--color-dark)',
              color: '#fff',
              padding: '50px 40px',
              borderRadius: 'var(--radius)',
              textAlign: 'center'
            }}>
              <h3 style={{
                fontSize: '28px',
                fontFamily: 'var(--font-serif)',
                marginBottom: '20px'
              }}>
                다른 부대시설 둘러보기
              </h3>
              <div style={{
                display: 'flex',
                gap: '15px',
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginTop: '30px'
              }}>
                <Link
                  href="/special/barbecue"
                  style={{
                    padding: '12px 30px',
                    background: 'rgba(255,255,255,0.1)',
                    color: '#fff',
                    borderRadius: 'var(--radius)',
                    textDecoration: 'none',
                    border: '1px solid rgba(255,255,255,0.3)',
                    transition: 'all 0.3s'
                  }}
                >
                  바베큐
                </Link>
                <Link
                  href="/special/sports"
                  style={{
                    padding: '12px 30px',
                    background: 'rgba(255,255,255,0.1)',
                    color: '#fff',
                    borderRadius: 'var(--radius)',
                    textDecoration: 'none',
                    border: '1px solid rgba(255,255,255,0.3)',
                    transition: 'all 0.3s'
                  }}
                >
                  잔디광장
                </Link>
                <Link
                  href="/special/cafe"
                  style={{
                    padding: '12px 30px',
                    background: 'rgba(255,255,255,0.1)',
                    color: '#fff',
                    borderRadius: 'var(--radius)',
                    textDecoration: 'none',
                    border: '1px solid rgba(255,255,255,0.3)',
                    transition: 'all 0.3s'
                  }}
                >
                  카페
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
