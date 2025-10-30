import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: '오소 소개 | 오소 캠핑바베큐',
  description:
    '오소캠핑바베큐는 평택 지산로에 위치한 캠핑 감성 셀프 바베큐장입니다. 6개의 프리미엄동과 야외 테이블, 다양한 부대시설을 갖추고 있습니다.',
  keywords: ['오소캠핑바베큐 소개', '평택 바베큐장 정보', '송탄 셀프바베큐장', '캠핑 감성 바베큐'],
  openGraph: {
    title: '오소 소개 | 오소 캠핑바베큐',
    description:
      '캠핑 감성의 셀프 바베큐장, 오소캠핑바베큐를 소개합니다. 프리미엄 공간과 다양한 부대시설로 완벽한 캠핑 경험을 선사합니다.',
  },
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
