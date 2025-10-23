import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '주변 여행지 | 가평 휴먼타운 펜션',
  description: '가평 휴먼타운 펜션 주변의 인기 관광지를 소개합니다. 남이섬, 쁘띠프랑스, 아침고요수목원, 자라섬, 레일바이크, 짚와이어 등 다양한 여행지가 있습니다.',
  keywords: ['가평 여행지', '남이섬', '쁘띠프랑스', '아침고요수목원', '자라섬', '가평 레일바이크', '가평 관광'],
  openGraph: {
    title: '주변 여행지 | 가평 휴먼타운 펜션',
    description: '가평의 인기 관광지 - 남이섬, 쁘띠프랑스, 아침고요수목원 등',
    type: 'website',
  },
};

export default function TravelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
