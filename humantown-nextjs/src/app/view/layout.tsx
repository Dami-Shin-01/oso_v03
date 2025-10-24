import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '시설 외경 | 오소 캠핑 바베큐',
  description: '부락산 한 자락에 자리한 오소캠핑바베큐의 외경을 감상하세요. 사계절 각기 다른 매력을 선사하는 오소의 모습을 담았습니다.',
  keywords: ['오소캠핑바베큐 외경', '평택 바베큐장 갤러리', '부락산 풍경', '셀프바베큐장 감성 사진'],
  openGraph: {
    title: '시설 외경 | 오소 캠핑 바베큐',
    description: '부락산 한 자락 속 아름다운 자연과 함께하는 오소캠핑바베큐',
    type: 'website',
  },
};

export default function ViewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
