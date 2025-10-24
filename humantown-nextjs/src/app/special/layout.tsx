import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '부대시설 | 오소 캠핑바베큐 (OSO Camping BBQ)',
  description: 'OSO 캠핑바베큐의 특별한 부대시설을 소개합니다. 물놀이장, 바베큐장, 잔디광장, 카페, 식당, 키즈존 등 다양한 시설을 즐기세요.',
  keywords: ['평택 바베큐', '셀프바베큐장', '캠핑바베큐', '평택 부대시설', '키즈존'],
  openGraph: {
    title: '부대시설 | 오소 캠핑바베큐 (OSO Camping BBQ)',
    description: '물놀이장, BBQ, 잔디광장, 카페, 식당, 키즈존 - 6개 특별 시설',
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
