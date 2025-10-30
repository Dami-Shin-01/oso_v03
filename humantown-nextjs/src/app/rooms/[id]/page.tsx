'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { getRoomById } from '@/lib/rooms';
import { roomImagesByType } from '@/lib/unsplash-images';

export default function RoomDetailPage() {
  const params = useParams();
  const roomId = params.id as string;
  const room = getRoomById(roomId);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!room) {
    return (
      <div style={{
        minHeight: '100vh',
        paddingTop: '120px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '32px', color: 'var(--color-text)', marginBottom: '20px' }}>
            공간을 찾을 수 없습니다
          </h1>
          <Link
            href="/rooms"
            style={{
              display: 'inline-block',
              padding: '12px 30px',
              background: 'var(--color-gold)',
              color: '#fff',
              borderRadius: 'var(--radius)',
              textDecoration: 'none'
            }}
          >
            공간 목록으로
          </Link>
        </div>
      </div>
    );
  }

  // Get room images
  const roomType = room.type?.includes('64평') || (room.size_pyeong ?? 0) >= 50 ? 'premium'
    : (room.size_pyeong ?? 0) >= 30 ? 'deluxe'
    : 'default';
  const imageSet = roomImagesByType[roomType];
  const images = room.images || [imageSet.main, ...imageSet.thumbnails];

  return (
    <div style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '100px' }}>
      {/* Page Header */}
      <section style={{
        background: 'var(--color-bg-light)',
        padding: '60px 0',
        marginBottom: '60px'
      }}>
        <div className="container">
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ marginBottom: '15px' }}>
              <Link
                href="/rooms"
                style={{
                  fontSize: '14px',
                  color: 'var(--color-text-light)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                ← 공간 목록
              </Link>
            </div>
            <h1 style={{
              fontSize: '42px',
              fontFamily: 'var(--font-heading)',
              color: 'var(--color-primary)',
              marginBottom: '15px'
            }}>
              {room.name}
            </h1>
            {room.name_english && (
              <p style={{
                fontSize: '18px',
                color: 'var(--color-text-light)',
                fontStyle: 'italic'
              }}>
                {room.name_english}
              </p>
            )}
          </div>
        </div>
      </section>

      <div className="container">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Image Gallery */}
          <section style={{ marginBottom: '60px' }}>
            {/* Main Image */}
            <div style={{
              position: 'relative',
              width: '100%',
              height: '500px',
              borderRadius: 'var(--radius)',
              overflow: 'hidden',
              marginBottom: '20px',
              cursor: 'pointer'
            }}
            onClick={() => setSelectedImage(images[0])}>
              <Image
                src={images[0]}
                alt={room.name}
                fill
                sizes="100vw"
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>

            {/* Thumbnail Grid */}
            {images.length > 1 && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '15px'
              }}>
                {images.slice(1).map((image, index) => (
                  <div
                    key={index}
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '150px',
                      borderRadius: 'var(--radius)',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'transform 0.3s'
                    }}
                    onClick={() => setSelectedImage(image)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <Image
                      src={image}
                      alt={`${room.name} ${index + 2}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Room Info Grid */}
          <section style={{ marginBottom: '60px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '30px'
            }}>
              {/* Size Info */}
              <div style={{
                background: '#fff',
                padding: '30px',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius)'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: 'var(--color-text)',
                  marginBottom: '15px'
                }}>
                  공간 크기
                </h3>
                <p style={{ fontSize: '24px', color: 'var(--color-gold)', fontWeight: 'bold' }}>
                  {room.size_pyeong}평
                </p>
                <p style={{ fontSize: '14px', color: 'var(--color-text-light)', marginTop: '5px' }}>
                  ({room.size_sqm}m²)
                </p>
              </div>

              {/* Capacity Info */}
              {room.capacity && (
                <div style={{
                  background: '#fff',
                  padding: '30px',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius)'
                }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: 'var(--color-text)',
                    marginBottom: '15px'
                  }}>
                    수용 인원
                  </h3>
                  <p style={{ fontSize: '16px', color: 'var(--color-text)', marginBottom: '8px' }}>
                    기준: {room.capacity.standard}인
                  </p>
                  <p style={{ fontSize: '16px', color: 'var(--color-text)' }}>
                    최대: {room.capacity.maximum}인
                  </p>
                </div>
              )}

              {/* Room Type */}
              {room.type && (
                <div style={{
                  background: '#fff',
                  padding: '30px',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius)'
                }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: 'var(--color-text)',
                    marginBottom: '15px'
                  }}>
                    공간 유형
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--color-text)', lineHeight: '1.6' }}>
                    {room.type}
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Pricing Information */}
          {room.pricing && (
            <section style={{ marginBottom: '60px' }}>
              <h2 style={{
                fontSize: '28px',
                fontFamily: 'var(--font-serif)',
                color: 'var(--color-text)',
                marginBottom: '30px'
              }}>
                공간 요금
              </h2>
              <div style={{
                background: 'var(--color-bg-light)',
                padding: '40px',
                borderRadius: 'var(--radius)'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '30px'
                }}>
                  {/* Peak Season */}
                  {room.pricing.peak && (
                    <div>
                      <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--color-gold)', marginBottom: '15px' }}>
                        성수기
                      </h4>
                      <div style={{ fontSize: '14px', lineHeight: '1.8', color: 'var(--color-text)' }}>
                        {room.pricing.peak.weekday && <p>평일: {room.pricing.peak.weekday.toLocaleString()}원</p>}
                        {room.pricing.peak.friday && <p>금요일: {room.pricing.peak.friday.toLocaleString()}원</p>}
                        {room.pricing.peak.weekend && <p>주말: {room.pricing.peak.weekend.toLocaleString()}원</p>}
                      </div>
                    </div>
                  )}

                  {/* Standard Season */}
                  {room.pricing.standard && (
                    <div>
                      <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--color-text)', marginBottom: '15px' }}>
                        준성수기
                      </h4>
                      <div style={{ fontSize: '14px', lineHeight: '1.8', color: 'var(--color-text)' }}>
                        {room.pricing.standard.weekday && <p>평일: {room.pricing.standard.weekday.toLocaleString()}원</p>}
                        {room.pricing.standard.friday && <p>금요일: {room.pricing.standard.friday.toLocaleString()}원</p>}
                        {room.pricing.standard.weekend && <p>주말: {room.pricing.standard.weekend.toLocaleString()}원</p>}
                      </div>
                    </div>
                  )}

                  {/* Off Season */}
                  {room.pricing.off_season && (
                    <div>
                      <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--color-text-light)', marginBottom: '15px' }}>
                        비수기
                      </h4>
                      <div style={{ fontSize: '14px', lineHeight: '1.8', color: 'var(--color-text)' }}>
                        {room.pricing.off_season.weekday && <p>평일: {room.pricing.off_season.weekday.toLocaleString()}원</p>}
                        {room.pricing.off_season.friday && <p>금요일: {room.pricing.off_season.friday.toLocaleString()}원</p>}
                        {room.pricing.off_season.weekend && <p>주말: {room.pricing.off_season.weekend.toLocaleString()}원</p>}
                      </div>
                    </div>
                  )}

                  {/* OSO Camping BBQ Pricing */}
                  {room.pricing['3hour'] && (
                    <div>
                      <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--color-gold)', marginBottom: '15px' }}>
                        시간별 요금 (1인당)
                      </h4>
                      <div style={{ fontSize: '14px', lineHeight: '1.8', color: 'var(--color-text)' }}>
                        {room.pricing['3hour']?.per_person && <p>3시간: {room.pricing['3hour'].per_person.toLocaleString()}원</p>}
                        {room.pricing['7hour']?.per_person && <p>7시간: {room.pricing['7hour'].per_person.toLocaleString()}원</p>}
                        {room.pricing['12hour']?.per_person && <p>12시간: {room.pricing['12hour'].per_person.toLocaleString()}원</p>}
                      </div>
                    </div>
                  )}

                  {/* Package Pricing */}
                  {room.pricing.daytime && (
                    <div>
                      <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--color-text)', marginBottom: '15px' }}>
                        패키지 요금
                      </h4>
                      <div style={{ fontSize: '14px', lineHeight: '1.8', color: 'var(--color-text)' }}>
                        {room.pricing.daytime?.package && <p>주간 풀타임: {room.pricing.daytime.package.toLocaleString()}원</p>}
                        {room.pricing.allnight?.package && <p>올나잇: {room.pricing.allnight.package.toLocaleString()}원</p>}
                      </div>
                    </div>
                  )}

                  {/* VIP Pricing */}
                  {room.pricing.weekday && (
                    <div>
                      <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--color-gold)', marginBottom: '15px' }}>
                        VIP 공간 요금
                      </h4>
                      <div style={{ fontSize: '14px', lineHeight: '1.8', color: 'var(--color-text)' }}>
                        <p>평일: {room.pricing.weekday.toLocaleString()}원</p>
                        {room.pricing.weekend_holiday && <p>주말/공휴일: {room.pricing.weekend_holiday.toLocaleString()}원</p>}
                      </div>
                    </div>
                  )}
                </div>
                <p style={{
                  marginTop: '20px',
                  fontSize: '13px',
                  color: 'var(--color-text-light)',
                  textAlign: 'center'
                }}>
                  * 성수기: 7-8월, 12-2월 / 준성수기: 4-6월, 9-11월 / 비수기: 3월
                </p>
              </div>
            </section>
          )}

          {/* Amenities */}
          {room.amenities && room.amenities.length > 0 && (
            <section style={{ marginBottom: '60px' }}>
              <h2 style={{
                fontSize: '28px',
                fontFamily: 'var(--font-serif)',
                color: 'var(--color-text)',
                marginBottom: '30px'
              }}>
                편의시설
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '15px'
              }}>
                {room.amenities.map((amenity, index) => (
                  <div
                    key={index}
                    style={{
                      padding: '15px 20px',
                      background: '#fff',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius)',
                      textAlign: 'center',
                      fontSize: '14px',
                      color: 'var(--color-text)'
                    }}
                  >
                    {amenity}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Reservation CTA */}
          <section style={{
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
              {room.name} 예약하기
            </h3>
            <p style={{ fontSize: '16px', marginBottom: '30px', opacity: 0.9 }}>
              지금 바로 예약하시고 특별한 휴식을 경험하세요
            </p>
            <Link
              href={`/rooms/${roomId}/book`}
              style={{
                display: 'inline-block',
                padding: '15px 50px',
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
              실시간 예약하기
            </Link>
          </section>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
            cursor: 'pointer'
          }}
          onClick={() => setSelectedImage(null)}
        >
          <button
            style={{
              position: 'absolute',
              top: '30px',
              right: '30px',
              width: '40px',
              height: '40px',
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '50%',
              color: '#fff',
              fontSize: '24px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={() => setSelectedImage(null)}
            aria-label="이미지 보기 닫기"
          >
            ×
          </button>
          <div style={{
            position: 'relative',
            maxWidth: '90vw',
            maxHeight: '90vh',
            width: '1200px',
            height: '800px'
          }}>
            <Image
              src={selectedImage}
              alt="확대 이미지"
              fill
              sizes="90vw"
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
