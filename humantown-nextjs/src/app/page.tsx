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
            OSO
          </h1>
          <h2 style={{ fontSize: '33px', fontFamily: 'var(--font-serif)', color: 'var(--color-text)', marginBottom: '40px' }}>
            OSO 캠핑바베큐
          </h2>
          <p style={{ fontSize: '18px', color: 'var(--color-text-light)', marginBottom: '60px' }}>
            경기도 평택시 지산로 282-31
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginTop: '80px' }}>
            <div style={{ padding: '40px 20px', background: 'var(--color-bg-light)', borderRadius: 'var(--radius)' }}>
              <h3 style={{ fontSize: '26px', fontFamily: 'var(--font-serif)', color: 'var(--color-text)', marginBottom: '15px' }}>
                22개 공간
              </h3>
              <p style={{ color: 'var(--color-text-light)' }}>
                야외테이블, 텐트동<br />
                프라이빗룸, VIP동
              </p>
            </div>

            <div style={{ padding: '40px 20px', background: 'var(--color-bg-light)', borderRadius: 'var(--radius)' }}>
              <h3 style={{ fontSize: '26px', fontFamily: 'var(--font-serif)', color: 'var(--color-text)', marginBottom: '15px' }}>
                풍부한 부대시설
              </h3>
              <p style={{ color: 'var(--color-text-light)' }}>
                물놀이장, 키즈존, 카페<br />
                식당, 잔디광장, 주차장
              </p>
            </div>

            <div style={{ padding: '40px 20px', background: 'var(--color-bg-light)', borderRadius: 'var(--radius)' }}>
              <h3 style={{ fontSize: '26px', fontFamily: 'var(--font-serif)', color: 'var(--color-text)', marginBottom: '15px' }}>
                캠핑 감성 바베큐
              </h3>
              <p style={{ color: 'var(--color-text-light)' }}>
                부담없이 즐기는<br />
                셀프 바베큐 체험
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
