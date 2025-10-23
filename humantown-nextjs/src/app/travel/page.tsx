'use client';

import Image from 'next/image';
import { travelImages } from '@/lib/unsplash-images';

interface Attraction {
  id: string;
  name: string;
  nameEng: string;
  description: string;
  distance: string;
  time: string;
  highlights: string[];
}

const attractions: Attraction[] = [
  {
    id: 'nami-island',
    name: '남이섬',
    nameEng: 'Nami Island',
    description: '드라마 \'겨울연가\' 촬영지로 유명한 아름다운 섬. 사계절 내내 아름다운 자연경관을 자랑하며, 메타세콰이어 길과 은행나무 길이 특히 유명합니다.',
    distance: '약 15km',
    time: '차량 20분',
    highlights: ['메타세콰이어 길', '자전거 대여', '공연 및 전시', '포토존']
  },
  {
    id: 'petite-france',
    name: '쁘띠프랑스',
    nameEng: 'Petite France',
    description: '프랑스 문화 마을로 꾸며진 테마파크. 알록달록한 건물들과 어린왕자 테마로 구성되어 있어 사진 찍기 좋은 명소입니다.',
    distance: '약 12km',
    time: '차량 15분',
    highlights: ['어린왕자 테마', '프랑스 건축', '인형극 공연', '포토존']
  },
  {
    id: 'morning-calm',
    name: '아침고요수목원',
    nameEng: 'Morning Calm Arboretum',
    description: '한국의 미를 담은 정원으로 사계절 아름다운 정원을 감상할 수 있습니다. 특히 봄 수선화, 가을 국화, 겨울 오색별빛정원축제가 유명합니다.',
    distance: '약 18km',
    time: '차량 25분',
    highlights: ['계절 정원', '야간 조명', '산책로', '포토존']
  },
  {
    id: 'jarasum',
    name: '자라섬',
    nameEng: 'Jarasum Island',
    description: '북한강에 위치한 아름다운 섬으로, 자라섬국제재즈페스티벌 개최지로 유명합니다. 캠핑과 산책하기 좋은 장소입니다.',
    distance: '약 8km',
    time: '차량 10분',
    highlights: ['캠핑장', '산책로', '페스티벌', '수상레저']
  },
  {
    id: 'rail-bike',
    name: '가평 레일바이크',
    nameEng: 'Gapyeong Rail Bike',
    description: '북한강변을 따라 달리는 레일바이크. 아름다운 자연 경관을 감상하며 즐거운 시간을 보낼 수 있습니다.',
    distance: '약 10km',
    time: '차량 15분',
    highlights: ['북한강 뷰', '가족 체험', '터널 조명', '포토존']
  },
  {
    id: 'zip-line',
    name: '가평 짚와이어',
    nameEng: 'Gapyeong Zip Line',
    description: '북한강을 가로지르는 스릴 넘치는 짚라인. 짜릿한 경험과 함께 아름다운 경관을 즐길 수 있습니다.',
    distance: '약 10km',
    time: '차량 15분',
    highlights: ['스릴 체험', '강 뷰', '포토존', '카페']
  }
];

export default function TravelPage() {
  return (
    <div style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '100px' }}>
      {/* Page Header */}
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
            TRAVEL
          </h1>
          <p style={{
            fontSize: '18px',
            fontFamily: 'var(--font-serif)',
            color: 'var(--color-text-light)'
          }}>
            주변 여행지 안내
          </p>
        </div>
      </section>

      <div className="container">
        {/* Introduction */}
        <section style={{ marginBottom: '80px', textAlign: 'center' }}>
          <h2 style={{
            fontSize: '32px',
            fontFamily: 'var(--font-serif)',
            color: 'var(--color-text)',
            marginBottom: '20px'
          }}>
            가평의 아름다운 명소들
          </h2>
          <p style={{
            fontSize: '16px',
            lineHeight: '1.8',
            color: 'var(--color-text-light)',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            휴먼타운 펜션에서 가까운 거리에 위치한 가평의 다양한 관광 명소를 소개합니다.<br />
            자연과 문화가 어우러진 특별한 여행을 경험해보세요.
          </p>
        </section>

        {/* Attractions Grid */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))',
            gap: '50px'
          }}>
            {attractions.map((attraction) => (
              <div
                key={attraction.id}
                style={{
                  background: '#fff',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius)',
                  overflow: 'hidden',
                  transition: 'transform 0.3s, box-shadow 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Image */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '280px',
                  overflow: 'hidden'
                }}>
                  <Image
                    src={travelImages[attraction.id as keyof typeof travelImages]}
                    alt={attraction.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    background: 'var(--color-gold)',
                    color: '#fff',
                    padding: '8px 15px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: 'bold'
                  }}>
                    {attraction.distance}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '30px' }}>
                  <h3 style={{
                    fontSize: '24px',
                    fontFamily: 'var(--font-serif)',
                    color: 'var(--color-text)',
                    marginBottom: '8px'
                  }}>
                    {attraction.name}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: 'var(--color-text-light)',
                    fontStyle: 'italic',
                    marginBottom: '15px'
                  }}>
                    {attraction.nameEng}
                  </p>
                  <p style={{
                    fontSize: '15px',
                    lineHeight: '1.7',
                    color: 'var(--color-text)',
                    marginBottom: '20px'
                  }}>
                    {attraction.description}
                  </p>

                  {/* Info */}
                  <div style={{
                    display: 'flex',
                    gap: '20px',
                    marginBottom: '20px',
                    paddingTop: '20px',
                    borderTop: '1px solid var(--color-border)'
                  }}>
                    <div>
                      <p style={{
                        fontSize: '13px',
                        color: 'var(--color-text-light)',
                        marginBottom: '5px'
                      }}>
                        거리
                      </p>
                      <p style={{
                        fontSize: '15px',
                        color: 'var(--color-text)',
                        fontWeight: 'bold'
                      }}>
                        {attraction.distance}
                      </p>
                    </div>
                    <div>
                      <p style={{
                        fontSize: '13px',
                        color: 'var(--color-text-light)',
                        marginBottom: '5px'
                      }}>
                        소요 시간
                      </p>
                      <p style={{
                        fontSize: '15px',
                        color: 'var(--color-text)',
                        fontWeight: 'bold'
                      }}>
                        {attraction.time}
                      </p>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div>
                    <p style={{
                      fontSize: '13px',
                      color: 'var(--color-text-light)',
                      marginBottom: '10px'
                    }}>
                      주요 즐길거리
                    </p>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px'
                    }}>
                      {attraction.highlights.map((highlight, index) => (
                        <span
                          key={index}
                          style={{
                            padding: '6px 12px',
                            background: 'var(--color-bg-light)',
                            color: 'var(--color-text)',
                            fontSize: '13px',
                            borderRadius: '15px'
                          }}
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Info Notice */}
        <section>
          <div style={{
            background: 'var(--color-bg-light)',
            padding: '40px',
            borderRadius: 'var(--radius)',
            textAlign: 'center'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: 'var(--color-text)',
              marginBottom: '15px'
            }}>
              여행 TIP
            </h3>
            <p style={{
              fontSize: '15px',
              lineHeight: '1.8',
              color: 'var(--color-text-light)'
            }}>
              각 관광지의 운영시간과 입장료는 계절에 따라 다를 수 있으니 방문 전 확인하시기 바랍니다.<br />
              대중교통 이용 시 버스 배차 간격이 길 수 있으니 시간 여유를 두고 계획하세요.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
