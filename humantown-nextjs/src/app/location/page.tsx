'use client';

export default function LocationPage() {
  return (
    <div style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '100px' }}>
      {/* Page Header */}
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
            LOCATION
          </h1>
          <p style={{
            fontSize: '18px',
            fontFamily: 'var(--font-serif)',
            color: 'var(--color-text-light)'
          }}>
            오시는 길
          </p>
        </div>
      </section>

      <div className="container">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Address & Contact */}
          <section style={{ marginBottom: '60px' }}>
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
                오소캠핑바베큐
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

          {/* Map */}
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

          {/* Directions */}
          <section style={{ marginBottom: '80px' }}>
            <h2 style={{
              fontSize: '28px',
              fontFamily: 'var(--font-serif)',
              color: 'var(--color-text)',
              marginBottom: '40px',
              textAlign: 'center'
            }}>
              오시는 방법
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              gap: '40px'
            }}>
              {/* By Car */}
              <div style={{
                background: '#fff',
                padding: '40px',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius)'
              }}>
                <div style={{ fontSize: '36px', marginBottom: '20px', textAlign: 'center' }}>
                  🚗
                </div>
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: 'bold',
                  color: 'var(--color-text)',
                  marginBottom: '20px',
                  textAlign: 'center'
                }}>
                  자가용 이용 시
                </h3>
                <div style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: 'var(--color-text)'
                }}>
                  <p style={{ marginBottom: '15px', fontWeight: 'bold', color: 'var(--color-gold)' }}>
                    서울 출발 (약 1시간)
                  </p>
                  <p style={{ marginBottom: '20px' }}>
                    경부고속도로 → 송탄IC → 지산동 방면<br />
                    → 지산로 282-31 도착
                  </p>
                  
                </div>
              </div>

              {/* By Public Transport */}
              <div style={{
                background: '#fff',
                padding: '40px',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius)'
              }}>
                <div style={{ fontSize: '36px', marginBottom: '20px', textAlign: 'center' }}>
                  🚌
                </div>
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: 'bold',
                  color: 'var(--color-text)',
                  marginBottom: '20px',
                  textAlign: 'center'
                }}>
                  대중교통 이용 시
                </h3>
                <div style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: 'var(--color-text)'
                }}>
               
                 
                </div>
              </div>
            </div>
          </section>

          {/* Parking Info */}
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
        </div>
      </div>
    </div>
  );
}
