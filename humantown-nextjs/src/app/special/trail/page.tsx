import Image from 'next/image';
import Link from 'next/link';
import { facilityImages } from '@/lib/unsplash-images';

export default function TrailPage() {
  return (
    <div style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '100px' }}>
      <section style={{ background: 'var(--color-bg-light)', padding: '60px 0', marginBottom: '60px' }}>
        <div className="container">
          <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
            <h1 style={{ fontSize: '48px', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', marginBottom: '20px' }}>
              산책로
            </h1>
            <p style={{ fontSize: '18px', fontFamily: 'var(--font-serif)', color: 'var(--color-text-light)' }}>
              Walking Trail
            </p>
          </div>
        </div>
      </section>

      <div className="container">
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <section style={{ marginBottom: '60px' }}>
            <div style={{ position: 'relative', width: '100%', height: '500px', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
              <Image src={facilityImages['walking-trail']} alt="산책로" fill sizes="100vw" style={{ objectFit: 'cover' }} priority />
            </div>
          </section>

          <section style={{ marginBottom: '60px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '32px', fontFamily: 'var(--font-serif)', color: 'var(--color-text)', marginBottom: '30px' }}>
              자연 속 힐링 산책
            </h2>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--color-text)', marginBottom: '20px' }}>
              펜션 주변으로 조성된 산책로를 걸으며 자연의 아름다움을 만끽하세요.
              북한강변을 따라 이어지는 산책로에서 사계절의 다양한 풍경을 감상할 수 있습니다.
            </p>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--color-text)' }}>
              아침 일찍 산책하며 상쾌한 공기를 마시거나,
              저녁 노을을 바라보며 여유로운 시간을 보내보세요.
            </p>
          </section>

          <section style={{ marginBottom: '60px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
              <div style={{ background: '#fff', padding: '30px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius)', textAlign: 'center' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--color-text)', marginBottom: '15px' }}>이용 시간</h3>
                <p style={{ fontSize: '16px', color: 'var(--color-text)' }}>24시간 이용 가능</p>
              </div>
              <div style={{ background: '#fff', padding: '30px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius)', textAlign: 'center' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--color-text)', marginBottom: '15px' }}>코스 길이</h3>
                <p style={{ fontSize: '16px', color: 'var(--color-text)' }}>약 1.5km</p>
                <p style={{ fontSize: '14px', color: 'var(--color-text-light)', marginTop: '5px' }}>(왕복 30분 소요)</p>
              </div>
              <div style={{ background: '#fff', padding: '30px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius)', textAlign: 'center' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--color-text)', marginBottom: '15px' }}>이용 요금</h3>
                <p style={{ fontSize: '16px', color: 'var(--color-gold)', fontWeight: 'bold' }}>투숙객 무료</p>
              </div>
            </div>
          </section>

          <section style={{ marginBottom: '60px' }}>
            <div style={{ background: 'var(--color-bg-light)', padding: '40px', borderRadius: 'var(--radius)' }}>
              <h3 style={{ fontSize: '24px', fontFamily: 'var(--font-serif)', color: 'var(--color-text)', marginBottom: '20px', textAlign: 'center' }}>
                이용 안내
              </h3>
              <div style={{ fontSize: '15px', lineHeight: '1.8', color: 'var(--color-text)', maxWidth: '600px', margin: '0 auto' }}>
                <p style={{ marginBottom: '10px' }}>• 편안한 운동화를 착용하시길 권장합니다</p>
                <p style={{ marginBottom: '10px' }}>• 야간 산책 시 안전에 유의해주세요</p>
                <p style={{ marginBottom: '10px' }}>• 자연보호를 위해 쓰레기는 되가져가 주세요</p>
                <p>• 우천 시 이용에 주의가 필요합니다</p>
              </div>
            </div>
          </section>

          <section>
            <div style={{ background: 'var(--color-dark)', color: '#fff', padding: '50px 40px', borderRadius: 'var(--radius)', textAlign: 'center' }}>
              <h3 style={{ fontSize: '28px', fontFamily: 'var(--font-serif)', marginBottom: '20px' }}>다른 부대시설 둘러보기</h3>
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '30px' }}>
                <Link href="/special/cafe" style={{ padding: '12px 30px', background: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: 'var(--radius)', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.3)' }}>카페</Link>
                <Link href="/special/playground" style={{ padding: '12px 30px', background: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: 'var(--radius)', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.3)' }}>어린이놀이터</Link>
                <Link href="/special/barbecue" style={{ padding: '12px 30px', background: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: 'var(--radius)', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.3)' }}>바베큐</Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
