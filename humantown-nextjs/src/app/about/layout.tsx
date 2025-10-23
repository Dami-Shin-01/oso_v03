import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '펜션 소개 | 가평 휴먼타운 펜션',
  description: '가평 휴먼타운 펜션은 북한강변에 위치한 고급 펜션입니다. 22개 객실과 6개 부대시설을 갖추고 있으며, 가족 단위 여행객부터 단체 모임까지 모두 만족하실 수 있습니다.',
  keywords: ['가평펜션 소개', '휴먼타운 정보', '북한강 펜션', '가평 숙소'],
  openGraph: {
    title: '펜션 소개 | 가평 휴먼타운 펜션',
    description: '자연 속의 특별한 휴식을 위한 22개 객실과 다양한 부대시설',
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
