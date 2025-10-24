import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '객실 안내 | 오소 캠핑바베큐',
  description: '다양한 공간을 준비했습니다. 커플, 친구 소모임부터 단체 행사까지 모두 만족하실 수 있는 다양한 공간을 만나보세요.',
  keywords: ['오소캠핑바베큐 공간', '오소캠핑바베큐 내부', '오소캠핑바베큐 룸', '평택 셀프바베큐 공간', '송탄 바베큐 공간'],
  openGraph: {
    title: '객실 안내 | 오소 캠핑바베큐',
    description: '편안한 캠핑 감성을 위한 다양한 공간',
    type: 'website',
  },
};

export default function RoomsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
