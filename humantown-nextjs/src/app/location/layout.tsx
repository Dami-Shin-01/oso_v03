import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '오시는 길 | 가평 휴먼타운 펜션',
  description: '가평 휴먼타운 펜션 찾아오시는 길을 안내합니다. 주소: 경기 가평군 가평읍 북한강변로 882. 자가용 및 대중교통 이용 방법을 확인하세요.',
  keywords: ['가평펜션 위치', '휴먼타운 찾아가는길', '가평 펜션 교통', '북한강변로 882'],
  openGraph: {
    title: '오시는 길 | 가평 휴먼타운 펜션',
    description: '경기 가평군 가평읍 북한강변로 882',
    type: 'website',
  },
};

export default function LocationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
