import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: '객실 안내 | 오소 캠핑바베큐',
  description:
    '오소캠핑바베큐의 6개 프리미엄 공간과 9개 야외 테이블을 한눈에 확인하세요. 수용 인원과 구성, 이용 정보를 제공합니다.',
  keywords: ['오소캠핑바베큐 객실', '평택 바베큐 공간', '송탄 단체 모임', '캠핑 감성 공간'],
  openGraph: {
    title: '객실 안내 | 오소 캠핑바베큐',
    description: '캠핑 감성 바베큐를 즐길 수 있는 오소캠핑바베큐의 객실 구성과 이용 정보를 확인하세요.',
  },
});

export default function RoomsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
