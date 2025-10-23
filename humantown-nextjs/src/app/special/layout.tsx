import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '부대시설 | 가평 휴먼타운 펜션',
  description: '휴먼타운 펜션의 특별한 부대시설을 소개합니다. 수영장, 바베큐장, 운동장, 카페, 산책로, 어린이놀이터 등 다양한 시설을 즐기세요.',
  keywords: ['가평펜션 수영장', '펜션 바베큐', '펜션 부대시설', '가평 펜션 시설'],
  openGraph: {
    title: '부대시설 | 가평 휴먼타운 펜션',
    description: '수영장, BBQ, 운동장, 카페, 산책로, 놀이터 - 6개 특별 시설',
    type: 'website',
  },
};

export default function SpecialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
