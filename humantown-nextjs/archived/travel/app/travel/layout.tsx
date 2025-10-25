import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '주변 여행지 | 오소 캠핑바베큐 (OSO Camping BBQ)',
  description: 'OSO 캠핑바베큐 주변의 인기 관광지를 소개합니다. 평택 및 경기 남부의 다양한 관광 명소를 즐겨보세요.',
  keywords: ['평택 여행지', '평택 관광', '경기 남부 여행', '평택 바베큐', '주말 나들이'],
  openGraph: {
    title: '주변 여행지 | 오소 캠핑바베큐 (OSO Camping BBQ)',
    description: '평택 및 경기 남부의 인기 관광지를 소개합니다',
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
