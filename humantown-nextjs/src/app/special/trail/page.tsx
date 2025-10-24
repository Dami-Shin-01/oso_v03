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
              식당
            </h1>
            <p style={{ fontSize: '18px', fontFamily: 'var(--font-serif)', color: 'var(--color-text-light)' }}>
              RESTAURANT
            </p>
          </div>
        </div>
      </section>

      <div className="container">
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <section style={{ marginBottom: '60px' }}>
            <div style={{ position: 'relative', width: '100%', height: '500px', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
              <Image src={facilityImages['cafe']} alt="식당" fill sizes="100vw" style={{ objectFit: 'cover' }} priority />
            </div>
          </section>

          <section style={{ marginBottom: '60px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '32px', fontFamily: 'var(--font-serif)', color: 'var(--color-text)', marginBottom: '30px' }}>
              맛있는 식사와 따뜻한 분위기
            </h2>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--color-text)', marginBottom: '20px' }}>
              OSO 캠핑바베큐의 내부 식당에서 다양한 메뉴를 즐기세요.
              바베큐와 함께 즐길 수 있는 한식, 양식 메뉴를 준비하였습니다.
            </p>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--color-text)' }}>
              편안한 실내 공간에서 가족, 친구들과 함께 맛있는 식사를 즐기며
              특별한 추억을 만들어보세요.
            </p>
          </section>

          <section style={{ marginBottom: '60px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
              <div style={{ background: '#fff', padding: '30px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius)', textAlign: 'center' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--color-text)', marginBottom: '15px' }}>운영 시간</h3>
                <p style={{ fontSize: '16px', color: 'var(--color-text)' }}>11:00 - 21:00</p>
                <p style={{ fontSize: '14px', color: 'var(--color-text-light)', marginTop: '5px' }}>(라스트오더 20:00)</p>
              </div>
              <div style={{ background: '#fff', padding: '30px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius)', textAlign: 'center' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--color-text)', marginBottom: '15px' }}>메뉴</h3>
                <p style={{ fontSize: '16px', color: 'var(--color-text)' }}>한식 / 양식</p>
                <p style={{ fontSize: '14px', color: 'var(--color-text-light)', marginTop: '5px' }}>(음료 및 주류 제공)</p>
              </div>
              <div style={{ background: '#fff', padding: '30px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius)', textAlign: 'center' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--color-text)', marginBottom: '15px' }}>예약</h3>
                <p style={{ fontSize: '16px', color: 'var(--color-gold)', fontWeight: 'bold' }}>사전 예약 권장</p>
              </div>
            </div>
          </section>

          <section style={{ marginBottom: '60px' }}>
            <div style={{ background: 'var(--color-bg-light)', padding: '40px', borderRadius: 'var(--radius)' }}>
              <h3 style={{ fontSize: '24px', fontFamily: 'var(--font-serif)', color: 'var(--color-text)', marginBottom: '20px', textAlign: 'center' }}>
                이용 안내
              </h3>
              <div style={{ fontSize: '15px', lineHeight: '1.8', color: 'var(--color-text)', maxWidth: '600px', margin: '0 auto' }}>
                <p style={{ marginBottom: '10px' }}>• 단체 이용 시 사전 예약 필수입니다</p>
                <p style={{ marginBottom: '10px' }}>• 테이블 배정은 선착순으로 진행됩니다</p>
                <p style={{ marginBottom: '10px' }}>• 외부 음식 반입이 제한될 수 있습니다</p>
                <p>• 주말 및 공휴일은 혼잡할 수 있으니 미리 예약해주세요</p>
              </div>
            </div>
          </section>

          <section>
            <div style={{ background: 'var(--color-dark)', color: '#fff', padding: '50px 40px', borderRadius: 'var(--radius)', textAlign: 'center' }}>
              <h3 style={{ fontSize: '28px', fontFamily: 'var(--font-serif)', marginBottom: '20px' }}>다른 부대시설 둘러보기</h3>
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '30px' }}>
                <Link href="/special/cafe" style={{ padding: '12px 30px', background: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: 'var(--radius)', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.3)' }}>카페</Link>
                <Link href="/special/playground" style={{ padding: '12px 30px', background: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: 'var(--radius)', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.3)' }}>키즈존</Link>
                <Link href="/special/barbecue" style={{ padding: '12px 30px', background: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: 'var(--radius)', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.3)' }}>바베큐</Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
