import HeroSection from '@/components/sections/HeroSection';
import SpecialSection from '@/components/sections/SpecialSection';
import RoomsSection from '@/components/sections/RoomsSection';

export default function Home() {
  return (
    <>
      {/* Hero Section with Swiper Slider */}
      <HeroSection />

      {/* Special Section - 6 Facilities */}
      <SpecialSection />

      {/* Rooms Section - Featured Rooms */}
      <RoomsSection />

      {/* Temporary Content Section */}
      <div style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '100px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '60px', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', marginBottom: '20px' }}>
            HUMANTOWN
          </h1>
          <h2 style={{ fontSize: '33px', fontFamily: 'var(--font-serif)', color: 'var(--color-text)', marginBottom: '40px' }}>
            가평 휴먼타운 펜션
          </h2>
          <p style={{ fontSize: '18px', color: 'var(--color-text-light)', marginBottom: '60px' }}>
            경기 가평군 가평읍 북한강변로 882
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginTop: '80px' }}>
            <div style={{ padding: '40px 20px', background: 'var(--color-bg-light)', borderRadius: 'var(--radius)' }}>
              <h3 style={{ fontSize: '26px', fontFamily: 'var(--font-serif)', color: 'var(--color-text)', marginBottom: '15px' }}>
                22개 객실
              </h3>
              <p style={{ color: 'var(--color-text-light)' }}>
                20평 ~ 64평<br />
                기준 2인 ~ 최대 8인
              </p>
            </div>

            <div style={{ padding: '40px 20px', background: 'var(--color-bg-light)', borderRadius: 'var(--radius)' }}>
              <h3 style={{ fontSize: '26px', fontFamily: 'var(--font-serif)', color: 'var(--color-text)', marginBottom: '15px' }}>
                6개 부대시설
              </h3>
              <p style={{ color: 'var(--color-text-light)' }}>
                수영장, BBQ, 운동장<br />
                카페, 산책로, 놀이터
              </p>
            </div>

            <div style={{ padding: '40px 20px', background: 'var(--color-bg-light)', borderRadius: 'var(--radius)' }}>
              <h3 style={{ fontSize: '26px', fontFamily: 'var(--font-serif)', color: 'var(--color-text)', marginBottom: '15px' }}>
                고급스러운 휴식
              </h3>
              <p style={{ color: 'var(--color-text-light)' }}>
                북한강변의 아름다운<br />
                자연 속에서의 힐링
              </p>
            </div>
          </div>

          <div style={{ marginTop: '100px', padding: '60px 0', background: 'var(--color-dark)', color: '#fff' }}>
            <h3 style={{ fontSize: '33px', fontFamily: 'var(--font-serif)', marginBottom: '20px' }}>
              Phase 6.2 완료
            </h3>
            <p style={{ opacity: 0.8 }}>
              ✓ Hero Section 구현 완료<br />
              ✓ Special Section 구현 완료 (6개 부대시설)<br />
              ✓ Rooms Section 구현 완료 (22개 객실)<br />
              다음: 상세 페이지, 애니메이션, 최적화
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
