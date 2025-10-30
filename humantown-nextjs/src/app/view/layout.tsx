import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: '시설 전경 | 오소 캠핑바베큐',
  description: '부락산 자락에 자리한 오소캠핑바베큐의 사계절 전경과 감성 가득한 모습을 감상하세요.',
  keywords: ['오소캠핑바베큐 전경', '평택 바베큐장 갤러리', '부락산 캠핑장', '감성 캠핑 사진'],
  openGraph: {
    title: '시설 전경 | 오소 캠핑바베큐',
    description: '사계절 각기 다른 매력을 담은 오소캠핑바베큐 전경 갤러리입니다.',
  },
});

export default function ViewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
