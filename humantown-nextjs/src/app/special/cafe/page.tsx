import Image from 'next/image';
import Link from 'next/link';
import { facilityImages } from '@/lib/unsplash-images';

export default function CafePage() {
  return (
    <div style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '100px' }}>
      <section style={{ background: 'var(--color-bg-light)', padding: '60px 0', marginBottom: '60px' }}>
        <div className="container">
          <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
            <h1 style={{ fontSize: '48px', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', marginBottom: '20px' }}>
              카페
            </h1>
            <p style={{ fontSize: '18px', fontFamily: 'var(--font-serif)', color: 'var(--color-text-light)' }}>
              Cafe
            </p>
          </div>
        </div>
      </section>

      <div className="container">
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <section style={{ marginBottom: '60px' }}>
            <div style={{ position: 'relative', width: '100%', height: '500px', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
              <Image src={facilityImages['cafe']} alt="카페" fill sizes="100vw" style={{ objectFit: 'cover' }} priority />
            </div>
          </section>

          <section style={{ marginBottom: '60px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '32px', fontFamily: 'var(--font-serif)', color: 'var(--color-text)', marginBottom: '30px' }}>
              여유로운 휴식 공간
            </h2>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--color-text)', marginBottom: '20px' }}>
              펜션 내 카페에서 여유로운 시간을 보내세요.
              향긋한 커피와 함께 북한강변의 아름다운 풍경을 감상할 수 있습니다.
            </p>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--color-text)' }}>
              따뜻한 음료와 간단한 디저트를 준비했습니다.
            </p>
          </section>

          <section style={{ marginBottom: '60px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
              <div style={{ background: '#fff', padding: '30px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius)', textAlign: 'center' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--color-text)', marginBottom: '15px' }}>운영 시간</h3>
                <p style={{ fontSize: '16px', color: 'var(--color-text)' }}>08:00 ~ 21:00</p>
                <p style={{ fontSize: '14px', color: 'var(--color-text-light)', marginTop: '5px' }}>(계절에 따라 변동)</p>
              </div>
              <div style={{ background: '#fff', padding: '30px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius)', textAlign: 'center' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--color-text)', marginBottom: '15px' }}>메뉴</h3>
                <p style={{ fontSize: '16px', color: 'var(--color-text)' }}>커피, 음료, 디저트</p>
              </div>
              <div style={{ background: '#fff', padding: '30px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius)', textAlign: 'center' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--color-text)', marginBottom: '15px' }}>이용 방법</h3>
                <p style={{ fontSize: '16px', color: 'var(--color-text)' }}>별도 요금</p>
              </div>
            </div>
          </section>

          <section style={{ marginBottom: '60px' }}>
            <div style={{ background: 'var(--color-bg-light)', padding: '40px', borderRadius: 'var(--radius)' }}>
              <h3 style={{ fontSize: '24px', fontFamily: 'var(--font-serif)', color: 'var(--color-text)', marginBottom: '20px', textAlign: 'center' }}>
                이용 안내
              </h3>
              <div style={{ fontSize: '15px', lineHeight: '1.8', color: 'var(--color-text)', maxWidth: '600px', margin: '0 auto' }}>
                <p style={{ marginBottom: '10px' }}>• 테이크아웃 가능합니다</p>
                <p style={{ marginBottom: '10px' }}>• 계절에 따라 운영 시간이 변동될 수 있습니다</p>
                <p style={{ marginBottom: '10px' }}>• 간단한 간식도 판매합니다</p>
                <p>• 자세한 메뉴와 가격은 현장에서 확인해주세요</p>
              </div>
            </div>
          </section>

          <section>
            <div style={{ background: 'var(--color-dark)', color: '#fff', padding: '50px 40px', borderRadius: 'var(--radius)', textAlign: 'center' }}>
              <h3 style={{ fontSize: '28px', fontFamily: 'var(--font-serif)', marginBottom: '20px' }}>다른 부대시설 둘러보기</h3>
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '30px' }}>
                <Link href="/special/trail" style={{ padding: '12px 30px', background: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: 'var(--radius)', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.3)' }}>식당</Link>
                <Link href="/special/playground" style={{ padding: '12px 30px', background: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: 'var(--radius)', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.3)' }}>키즈존</Link>
                <Link href="/special/swimming-pool" style={{ padding: '12px 30px', background: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: 'var(--radius)', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.3)' }}>물놀이장</Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
