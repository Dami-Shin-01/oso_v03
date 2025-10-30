import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: '부대시설 | 오소 캠핑바베큐',
  description: '오소캠핑바베큐의 물놀이장, 바베큐장, 잔디광장, 카페, 식당, 키즈존 등 다양한 부대시설을 소개합니다.',
  keywords: ['오소캠핑바베큐 부대시설', '평택 바베큐장 시설', '캠핑 부대시설', '키즈존 바베큐장'],
  openGraph: {
    title: '부대시설 | 오소 캠핑바베큐',
    description: '여섯 가지 특별한 부대시설로 캠핑 감성을 더한 오소캠핑바베큐의 시설을 만나보세요.',
  },
});

export default function SpecialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
