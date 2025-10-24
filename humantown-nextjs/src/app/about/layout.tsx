import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '오소 소개 | 오소 캠핑 바베큐',
  description: '오소캠핑바베큐는 평택 송탄 산자락에 위치한 캠핑 감성 셀프 바베큐장입니다. 6개의 프리미엄동(VIP동, 프라이빗룸)과 야외테이블, 9개의 텐트동을 갖추고 있으며 다양한 부대시설로 커플, 친구 소모임부터 단체 행사까지 모두 만족하실 수 있습니다.',
  keywords: ['평택 바베큐장 소개', '오소캠핑바베큐 정보', '송탄 셀프바베큐장', '반려동물 동반 바베큐장', '오소 캠핑장 소개'],
  openGraph: {
    title: ' 오소 소개 | 오소 캠핑 바베큐',
    description: '사전 준비 부담 없이 편안하게 즐기는 캠핑 바베큐장, 오소캠핑바베큐입니다. 프리미엄동과 텐트동, 다양한 부대시설로 완벽한 캠핑 경험을 선사합니다.',
    type: 'website',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
