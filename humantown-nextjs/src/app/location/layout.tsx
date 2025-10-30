import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: '오시는 길 | 오소 캠핑바베큐',
  description: '경기 평택시 지산로 282-31에 위치한 오소캠핑바베큐로 찾아오는 길을 안내합니다. 자가용 및 대중교통 이용 정보를 확인하세요.',
  keywords: ['오소캠핑바베큐 위치', '평택 오시는 길', '지산로 282-31', '바베큐장 찾아오는 길'],
  openGraph: {
    title: '오시는 길 | 오소 캠핑바베큐',
    description: '카카오맵과 구글맵 링크로 오소캠핑바베큐 위치를 쉽게 확인하세요.',
  },
});

export default function LocationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
