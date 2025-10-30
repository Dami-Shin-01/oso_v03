import Image from 'next/image';
import Link from 'next/link';
import { facilityImages } from '@/lib/unsplash-images';

export default function PlaygroundPage() {
  return (
    <div style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '100px' }}>
      <section style={{ background: 'var(--color-bg-light)', padding: '60px 0', marginBottom: '60px' }}>
        <div className="container">
          <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
            <h1 style={{ fontSize: '48px', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', marginBottom: '20px' }}>
              키즈존
            </h1>
            <p style={{ fontSize: '18px', fontFamily: 'var(--font-serif)', color: 'var(--color-text-light)' }}>
              KIDS ZONE
            </p>
          </div>
        </div>
      </section>

      <div className="container">
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <section style={{ marginBottom: '60px' }}>
            <div style={{ position: 'relative', width: '100%', height: '500px', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
              <Image src={facilityImages["kids-zone"]} alt="키즈존" fill sizes="100vw" style={{ objectFit: 'cover' }} priority />
            </div>
          </section>

          <section style={{ marginBottom: '60px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '32px', fontFamily: 'var(--font-serif)', color: 'var(--color-text)', marginBottom: '30px' }}>
              아이들의 즐거운 놀이 공간
            </h2>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--color-text)', marginBottom: '20px' }}>
              안전하고 깨끗한 내부 공간에서 아이들이 마음껏 뛰어놀 수 있습니다.
              정글짐과 다양한 장난감이 준비되어 있어 아이들의 즐거운 시간을 보장합니다.
            </p>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--color-text)' }}>
              부모님께서는 카페에서 편안하게 휴식하시며
              아이들의 모습을 지켜보실 수 있습니다.
            </p>
          </section>

          <section style={{ marginBottom: '60px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
              <div style={{ background: '#fff', padding: '30px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius)', textAlign: 'center' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--color-text)', marginBottom: '15px' }}>이용 시간</h3>
                <p style={{ fontSize: '16px', color: 'var(--color-text)' }}>15:00 ~ 22:00 (카페와 동일) </p>
              </div>
              <div style={{ background: '#fff', padding: '30px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius)', textAlign: 'center' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--color-text)', marginBottom: '15px' }}>시설</h3>
                <p style={{ fontSize: '16px', color: 'var(--color-text)' }}>미끄럼틀, 그네, 시소 등</p>
              </div>
              <div style={{ background: '#fff', padding: '30px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius)', textAlign: 'center' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--color-text)', marginBottom: '15px' }}>이용 요금</h3>
                <p style={{ fontSize: '16px', color: 'var(--color-gold)', fontWeight: 'bold' }}>이용객 무료</p>
              </div>
            </div>
          </section>

          <section style={{ marginBottom: '60px' }}>
            <div style={{ background: 'var(--color-bg-light)', padding: '40px', borderRadius: 'var(--radius)' }}>
              <h3 style={{ fontSize: '24px', fontFamily: 'var(--font-serif)', color: 'var(--color-text)', marginBottom: '20px', textAlign: 'center' }}>
                이용 안내
              </h3>
              <div style={{ fontSize: '15px', lineHeight: '1.8', color: 'var(--color-text)', maxWidth: '600px', margin: '0 auto' }}>
                <p style={{ marginBottom: '10px' }}>• 반드시 보호자 동반 하에 이용해주세요</p>
                <p style={{ marginBottom: '10px' }}>• 안전사고 예방에 주의해주세요</p>
                <p style={{ marginBottom: '10px' }}>• 다른 어린이와 양보하며 사용해주세요</p>
                <p style={{ marginBottom: '10px' }}>• 장난감을 소중히 다뤄주세요</p>
                
              </div>
            </div>
          </section>

          <section>
            <div style={{ background: 'var(--color-dark)', color: '#fff', padding: '50px 40px', borderRadius: 'var(--radius)', textAlign: 'center' }}>
              <h3 style={{ fontSize: '28px', fontFamily: 'var(--font-serif)', marginBottom: '20px' }}>다른 부대시설 둘러보기</h3>
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '30px' }}>
                <Link href="/special/swimming-pool" style={{ padding: '12px 30px', background: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: 'var(--radius)', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.3)' }}>물놀이장</Link>
                <Link href="/special/sports" style={{ padding: '12px 30px', background: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: 'var(--radius)', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.3)' }}>잔디광장</Link>
                <Link href="/special/restaurant" style={{ padding: '12px 30px', background: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: 'var(--radius)', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.3)' }}>식당</Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

