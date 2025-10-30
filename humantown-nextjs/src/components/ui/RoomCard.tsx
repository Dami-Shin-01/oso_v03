'use client';

import Link from 'next/link';
import { Room } from '@/types';
import { roomImages, roomImagesByType } from '@/lib/unsplash-images';

interface RoomCardProps {
  room: Room;
  variant?: 'default' | 'compact';
}

export default function RoomCard({ room, variant = 'default' }: RoomCardProps) {
  // 객실 이미지 매핑 (실제 이미지가 없으면 Unsplash 샘플 사용)
  const roomType = room.type?.includes('64평') || (room.size_pyeong ?? 0) >= 50 ? 'premium'
    : (room.size_pyeong ?? 0) >= 30 ? 'deluxe'
    : 'default';

  const imageSet = roomImagesByType[roomType];
  const mainImage = room.images?.[0] || imageSet.main;
  const thumbnails = room.images?.slice(1, 4) || imageSet.thumbnails;
  const roomUrl = `/rooms/${room.id}`;

  return (
    <div className={`room-card ${variant === 'compact' ? 'room-card-compact' : ''}`}>
      {/* Clickable overlay - Removed to allow button clicks */}
      {/* <Link href={roomUrl} className="link" aria-label={room.name}></Link> */}

      {/* Main Image */}
      <Link href={roomUrl}>
        <div
          className="img"
          style={{ backgroundImage: `url('${mainImage}')` }}
          role="img"
          aria-label={`${room.name} 객실 대표 이미지`}
        ></div>
      </Link>

      {/* Room Info Wrapper */}
      <div className="room_inner_wrap clear">
        {/* Left: Text Content */}
        <div className="room_inner_box">
          <Link href={roomUrl}>
            <strong>{room.name}</strong>
          </Link>
          <p>
            {room.size_pyeong && `${room.size_pyeong}평`}
            {room.capacity && (
              <>
                {room.size_pyeong && ' / '}기준 {room.capacity.standard}인 / 최대{' '}
                {room.capacity.maximum}인
              </>
            )}
          </p>
          <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
            <Link
              href={roomUrl}
              className={`btn_more ${variant === 'compact' ? 'small' : 'compact'}`}
            >
              {variant === 'compact' ? '자세히보기' : '객실보기'}
            </Link>
            <Link
              href={`${roomUrl}/book`}
              className={`btn_more ${variant === 'compact' ? 'small' : 'compact'}`}
              style={{
                background: 'var(--color-gold)',
                color: '#fff',
                border: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-gold-dark)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--color-gold)';
              }}
            >
              예약하기
            </Link>
          </div>
        </div>

        {/* Right: Thumbnail Images (only in default variant) */}
        {variant === 'default' && thumbnails.length > 0 && (
          <div className="btm_img">
            <ul>
              {thumbnails.map((thumb, index) => (
                <li
                  key={index}
                  style={{ backgroundImage: `url('${thumb}')` }}
                  role="img"
                  aria-label={`${room.name} 객실 사진 ${index + 2}`}
                ></li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
