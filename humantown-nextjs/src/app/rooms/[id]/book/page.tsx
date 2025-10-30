'use client';

/**
 * Room Booking Page
 * /rooms/[id]/book
 *
 * Displays the reservation form for a specific room.
 */

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getRoomById } from '@/lib/rooms';
import { roomImagesByType } from '@/lib/unsplash-images';
import ReservationForm from '@/components/forms/ReservationForm';

export default function RoomBookingPage() {
  const params = useParams();
  const router = useRouter();
  const roomId = params.id as string;
  const room = getRoomById(roomId);

  if (!room) {
    return (
      <div
        style={{
          minHeight: '100vh',
          paddingTop: '120px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <h1
            style={{
              fontSize: '32px',
              color: 'var(--color-text)',
              marginBottom: '20px',
            }}
          >
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
              textDecoration: 'none',
            }}
          >
            공간 목록으로
          </Link>
        </div>
      </div>
    );
  }

  // Get room image
  const roomType =
    room.type?.includes('64평') || (room.size_pyeong ?? 0) >= 50
      ? 'premium'
      : (room.size_pyeong ?? 0) >= 30
      ? 'deluxe'
      : 'default';
  const imageSet = roomImagesByType[roomType];
  const mainImage = room.images?.[0] || imageSet.main;

  const handleSuccess = (reservationId: string) => {
    router.push(`/reservations/${reservationId}/success`);
  };

  const handleError = (error: string) => {
    alert(error);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        paddingTop: '120px',
        paddingBottom: '100px',
        background: 'var(--color-bg-light)',
      }}
    >
      <div className="container">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Breadcrumb */}
          <div style={{ marginBottom: '30px' }}>
            <Link
              href={`/rooms/${roomId}`}
              style={{
                fontSize: '14px',
                color: 'var(--color-text-light)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              ← {room.name} 상세 보기
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '40px',
              alignItems: 'start',
            }}
          >
            {/* Left: Room Info */}
            <div>
              {/* Room Image */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '400px',
                  borderRadius: 'var(--radius)',
                  overflow: 'hidden',
                  marginBottom: '30px',
                }}
              >
                <Image
                  src={mainImage}
                  alt={room.name}
                  fill
                  sizes="50vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>

              {/* Room Details */}
              <div
                style={{
                  background: '#fff',
                  padding: '30px',
                  borderRadius: 'var(--radius)',
                }}
              >
                <h1
                  style={{
                    fontSize: '32px',
                    fontFamily: 'var(--font-heading)',
                    color: 'var(--color-primary)',
                    marginBottom: '10px',
                  }}
                >
                  {room.name}
                </h1>
                {room.name_english && (
                  <p
                    style={{
                      fontSize: '16px',
                      color: 'var(--color-text-light)',
                      fontStyle: 'italic',
                      marginBottom: '20px',
                    }}
                  >
                    {room.name_english}
                  </p>
                )}

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '20px',
                    paddingTop: '20px',
                    borderTop: '1px solid var(--color-border)',
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontSize: '14px',
                        color: 'var(--color-text-light)',
                        marginBottom: '5px',
                      }}
                    >
                      공간 크기
                    </p>
                    <p
                      style={{
                        fontSize: '18px',
                        color: 'var(--color-text)',
                        fontWeight: 'bold',
                      }}
                    >
                      {room.size_pyeong}평 ({room.size_sqm}m²)
                    </p>
                  </div>

                  {room.capacity && (
                    <div>
                      <p
                        style={{
                          fontSize: '14px',
                          color: 'var(--color-text-light)',
                          marginBottom: '5px',
                        }}
                      >
                        수용 인원
                      </p>
                      <p
                        style={{
                          fontSize: '18px',
                          color: 'var(--color-text)',
                          fontWeight: 'bold',
                        }}
                      >
                        기준 {room.capacity.standard}명 / 최대{' '}
                        {room.capacity.maximum}명
                      </p>
                    </div>
                  )}
                </div>

                {room.amenities && room.amenities.length > 0 && (
                  <div style={{ marginTop: '20px' }}>
                    <p
                      style={{
                        fontSize: '14px',
                        color: 'var(--color-text-light)',
                        marginBottom: '10px',
                      }}
                    >
                      편의시설
                    </p>
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px',
                      }}
                    >
                      {room.amenities.slice(0, 6).map((amenity, index) => (
                        <span
                          key={index}
                          style={{
                            fontSize: '13px',
                            color: 'var(--color-text)',
                            background: 'var(--color-bg-light)',
                            padding: '6px 12px',
                            borderRadius: '4px',
                          }}
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Reservation Form */}
            <div
              style={{
                background: '#fff',
                padding: '40px',
                borderRadius: 'var(--radius)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                position: 'sticky',
                top: '120px',
              }}
            >
              <h2
                style={{
                  fontSize: '24px',
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--color-text)',
                  marginBottom: '30px',
                  paddingBottom: '20px',
                  borderBottom: '2px solid var(--color-border)',
                }}
              >
                예약하기
              </h2>

              <ReservationForm
                room={room}
                onSuccess={handleSuccess}
                onError={handleError}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
