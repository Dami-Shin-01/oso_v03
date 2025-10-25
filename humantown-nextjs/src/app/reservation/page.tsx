'use client';

import Link from 'next/link';

export default function ReservationPage() {
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
            RESERVATION
          </h1>
          <p style={{
            fontSize: '18px',
            fontFamily: 'var(--font-serif)',
            color: 'var(--color-text-light)'
          }}>
            실시간 예약 안내
          </p>
        </div>
      </section>

      <div className="container">
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {/* Contact Info */}
          <section style={{ marginBottom: '80px', textAlign: 'center' }}>
            <h2 style={{
              fontSize: '36px',
              fontFamily: 'var(--font-serif)',
              color: 'var(--color-text)',
              marginBottom: '30px'
            }}>
              예약 문의
            </h2>
            <div style={{
              background: 'var(--color-dark)',
              color: '#fff',
              padding: '50px 40px',
              borderRadius: 'var(--radius)',
              marginBottom: '20px'
            }}>
              <p style={{
                fontSize: '16px',
                marginBottom: '20px',
                opacity: 0.9
              }}>
                전화 예약이 가장 빠르고 정확합니다
              </p>
              <a
                href="T. 0507-1380-0203"
                style={{
                  display: 'inline-block',
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: 'var(--color-gold)',
                  textDecoration: 'none',
                  marginBottom: '30px'
                }}
              >
                1833-9306
              </a>
              <p style={{
                fontSize: '14px',
                opacity: 0.8
              }}>
                운영 시간: 평일 15:00 ~ 22:00 주말, 공휴일 10:00 ~ 22:00
              </p>
            </div>
          </section>

          {/* Reservation Info Grid */}
          <section style={{ marginBottom: '80px' }}>
            <h2 style={{
              fontSize: '32px',
              fontFamily: 'var(--font-serif)',
              color: 'var(--color-text)',
              textAlign: 'center',
              marginBottom: '40px'
            }}>
              예약 안내
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '30px',
              marginBottom: '40px'
            }}>
              <div style={{
                background: '#fff',
                padding: '40px 30px',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius)',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '36px',
                  marginBottom: '20px'
                }}>
                  🕐
                </div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: 'var(--color-text)',
                  marginBottom: '15px'
                }}>
                  입실 / 퇴실 시간
                </h3>
                <p style={{
                  fontSize: '15px',
                  color: 'var(--color-text)',
                  lineHeight: '1.8'
                }}>
                  입실: 오후 3시 (15:00)<br />
                  퇴실: 오전 11시 (11:00)
                </p>
              </div>

              <div style={{
                background: '#fff',
                padding: '40px 30px',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius)',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '36px',
                  marginBottom: '20px'
                }}>
                  💳
                </div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: 'var(--color-text)',
                  marginBottom: '15px'
                }}>
                  결제 방법
                </h3>
                <p style={{
                  fontSize: '15px',
                  color: 'var(--color-text)',
                  lineHeight: '1.8'
                }}>
                  현금, 계좌이체<br />
                  신용카드 결제 가능
                </p>
              </div>

              <div style={{
                background: '#fff',
                padding: '40px 30px',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius)',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '36px',
                  marginBottom: '20px'
                }}>
                  ❌
                </div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: 'var(--color-text)',
                  marginBottom: '15px'
                }}>
                  취소 및 환불
                </h3>
                <p style={{
                  fontSize: '15px',
                  color: 'var(--color-text)',
                  lineHeight: '1.8'
                }}>
                  이용일 7일 전: 100% 환불<br />
                  이용일 3일 전: 50% 환불<br />
                  이용일 당일: 환불 불가
                </p>
              </div>
            </div>
          </section>

          {/* Policies */}
          <section style={{ marginBottom: '80px' }}>
            <h2 style={{
              fontSize: '32px',
              fontFamily: 'var(--font-serif)',
              color: 'var(--color-text)',
              textAlign: 'center',
              marginBottom: '40px'
            }}>
              이용 수칙
            </h2>
            <div style={{
              background: 'var(--color-bg-light)',
              padding: '50px 40px',
              borderRadius: 'var(--radius)'
            }}>
              <div style={{
                maxWidth: '700px',
                margin: '0 auto',
                fontSize: '15px',
                lineHeight: '2',
                color: 'var(--color-text)'
              }}>
                <p style={{ marginBottom: '15px' }}>
                  ✓ 모든 객실은 금연입니다
                </p>
                <p style={{ marginBottom: '15px' }}>
                  ✓ 반려동물 동반은 매너 벨트 필수입니다
                </p>
                <p style={{ marginBottom: '15px' }}>
                  ✓ 기준 인원 초과 시 추가 요금이 발생합니다
                </p>
                <p style={{ marginBottom: '15px' }}>
                  ✓ 외부 음식 반입은 가능하나 정리는 고객님이 해주셔야 합니다
                </p>
               
                <p style={{ marginBottom: '15px' }}>
                  ✓ 시설물 파손 시 변상 책임이 있습니다
                </p>
                <p>
                  ✓ 타 이용객에게 피해를 주는 행위는 삼가주시기 바랍니다
                </p>
              </div>
            </div>
          </section>

          {/* Pricing Info */}
          <section style={{ marginBottom: '80px' }}>
            <div style={{
              background: '#fff',
              padding: '50px 40px',
              border: '2px solid var(--color-gold)',
              borderRadius: 'var(--radius)',
              textAlign: 'center'
            }}>
              <h3 style={{
                fontSize: '28px',
                fontFamily: 'var(--font-serif)',
                color: 'var(--color-text)',
                marginBottom: '20px'
              }}>
                객실 요금 안내
              </h3>
              <p style={{
                fontSize: '16px',
                color: 'var(--color-text-light)',
                marginBottom: '30px',
                lineHeight: '1.8'
              }}>
                시설별 상세 요금은 각 시설 페이지에서 확인하실 수 있습니다.<br />
                평일, 공휴일/주말에 따라 요금이 상이합니다.
              </p>
              <Link
                href="/rooms"
                style={{
                  display: 'inline-block',
                  padding: '15px 40px',
                  background: 'var(--color-gold)',
                  color: '#fff',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  borderRadius: 'var(--radius)',
                  textDecoration: 'none',
                  transition: 'background 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--color-gold-dark)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--color-gold)';
                }}
              >
                객실 및 요금 보기
              </Link>
            </div>
          </section>

          {/* Location Info */}
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
                marginBottom: '25px'
              }}>
                오시는 길
              </h3>
              <p style={{ fontSize: '16px', marginBottom: '10px' }}>
                📍 경기 평택시 지산로 282-31
              </p>
              <p style={{ fontSize: '16px', marginBottom: '25px' }}>
                📞 T. 0507-1380-0203
              </p>
              <Link
                href="/location"
                style={{
                  display: 'inline-block',
                  padding: '12px 35px',
                  background: 'rgba(255,255,255,0.2)',
                  color: '#fff',
                  fontSize: '15px',
                  borderRadius: 'var(--radius)',
                  textDecoration: 'none',
                  border: '1px solid rgba(255,255,255,0.3)',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                }}
              >
                지도 보기
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
