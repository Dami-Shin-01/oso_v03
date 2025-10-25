import Image from 'next/image';
import Link from 'next/link';
import { facilityImages } from '@/lib/unsplash-images';

export default function BarbequeePage() {
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
              바베큐
            </h1>
            <p style={{
              fontSize: '18px',
              fontFamily: 'var(--font-serif)',
              color: 'var(--color-text-light)'
            }}>
              Barbecue
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
                src={facilityImages['barbecue']}
                alt="바베큐"
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
              자연 속에서 즐기는 바베큐
            </h2>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: 'var(--color-text)',
              marginBottom: '20px'
            }}>
              부락산 자락의 맑은 공기와 함께 신선한 바베큐 파티를 즐겨보세요.
              각 객실마다 전용 바베큐 시설이 준비되어 있어 편리하게 이용하실 수 있습니다.
            </p>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: 'var(--color-text)'
            }}>
              가족, 친구들과 함께 특별한 추억을 만들어보세요.
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
                  이용 가능 시간
                </h3>
                <p style={{ fontSize: '16px', color: 'var(--color-text)' }}>
                  시설별 상이 (체크인 후 프론트 문의)
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
                  제공 사항
                </h3>
                <p style={{ fontSize: '16px', color: 'var(--color-text)' }}>
                  테이블 및 의자, 전용 그릴 ( 숯 및 식재료 별도 준비 혹은 구매 가능)
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
                  별도의 시설 이용료 없음
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
                  • 식재료는 반입 혹은 내부 구매 가능합니다.
                </p>
                <p style={{ marginBottom: '10px' }}>
                  • 사용 후 주변 정리를 부탁드립니다
                </p>
                <p style={{ marginBottom: '10px' }}>
                  • 소음 발생에 유의해주세요 
                </p>
                <p style={{ marginBottom: '10px' }}>
                  • 화재 예방을 위해 안전 수칙을 준수해주세요
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
                <Link href="/special/swimming-pool" style={{ padding: '12px 30px', background: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: 'var(--radius)', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.3)' }}>
                  물놀이장
                </Link>
                <Link href="/special/sports" style={{ padding: '12px 30px', background: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: 'var(--radius)', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.3)' }}>
                  잔디광장
                </Link>
                <Link href="/special/cafe" style={{ padding: '12px 30px', background: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: 'var(--radius)', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.3)' }}>
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
