'use client';

import RoomCard from '@/components/ui/RoomCard';
import { getAllRooms, getTotalRoomCount } from '@/lib/rooms';
import { FadeIn, RevealOnScroll } from '@/components/animations';

export default function RoomsPage() {
  const rooms = getAllRooms();
  const totalRooms = getTotalRoomCount();

  // Filter out rooms with incomplete data
  const validRooms = rooms.filter(room =>
    room.name &&
    room.size_pyeong &&
    room.capacity?.standard &&
    room.capacity?.maximum
  );

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
              SPACES
            </h1>
            <p style={{
              fontSize: '18px',
              fontFamily: 'var(--font-serif)',
              color: 'var(--color-text-light)',
              marginBottom: '10px'
            }}>
              공간 안내
            </p>
            <p style={{
              fontSize: '14px',
              color: 'var(--color-text-light)'
            }}>
              총 {totalRooms}개 공간
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
              캠핑 감성 바베큐를 위한 다양한 공간
            </h2>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: 'var(--color-text-light)',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              프라이빗룸 5개와 VIP동 1개, 총 6개의 프리미엄 공간을 준비했습니다.<br />
              소규모 모임부터 단체 행사까지 모두 만족하실 수 있습니다.
            </p>
          </section>
        </RevealOnScroll>

        {/* Room Cards Grid */}
        <RevealOnScroll delay={0.4} direction="up">
          <section style={{ marginBottom: '80px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              gap: '40px'
            }}>
              {validRooms.map((room) => (
                <RoomCard key={room.id} room={room} variant="default" />
              ))}
            </div>

            {validRooms.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: 'var(--color-text-light)'
              }}>
                <p>공간 정보를 불러오는 중입니다...</p>
              </div>
            )}
          </section>
        </RevealOnScroll>

        {/* Info Section */}
        <FadeIn delay={0.5}>
          <section>
            <div style={{
              background: 'var(--color-bg-light)',
              padding: '50px 40px',
              borderRadius: 'var(--radius)',
              textAlign: 'center'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontFamily: 'var(--font-serif)',
                color: 'var(--color-text)',
                marginBottom: '20px'
              }}>
                공간 이용 안내
              </h3>
              <div style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: 'var(--color-text-light)',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                <p style={{ marginBottom: '10px' }}>
                  • 외부 음식 반입 가능
                </p>
                <p style={{ marginBottom: '10px' }}>
                  • 숯, 그릴, 고기 등 모든 물품 대여/구매 가능
                </p>
                <p style={{ marginBottom: '10px' }}>
                  • 시간별/패키지별 다양한 요금제 제공
                </p>
                <p>
                  • 공간별 요금 및 상세 정보는 각 공간 페이지를 참고해주세요
                </p>
              </div>
            </div>
          </section>
        </FadeIn>
      </div>
    </div>
  );
}
