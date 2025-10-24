import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '오시는 길 | 오소 캠핑 바베큐',
  description: '오소캠핑바베큐 찾아오시는 길을 안내합니다. 주소: 경기 평택시 지산로 282-31. 자가용 및 대중교통 이용 방법을 확인하세요.',
  keywords: ['오소캠핑바베큐 위치', '오소캠핑바베큐 찾아가는길', '평택 오소캠핑바베큐 교통', '지산로 282-31'],
  openGraph: {
    title: '오시는 길 | 오소 캠핑 바베큐',
    description: '경기 평택시 지산로 282-31',
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
