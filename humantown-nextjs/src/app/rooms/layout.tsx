import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '객실 안내 | 가평 휴먼타운 펜션',
  description: '20평부터 64평까지 다양한 크기의 객실을 준비했습니다. 가족 단위 여행객부터 단체 모임까지 모두 만족하실 수 있는 22개 객실을 만나보세요.',
  keywords: ['가평펜션 객실', '휴먼타운 객실', '펜션 룸', '가평 숙소 객실', '북한강 펜션 객실'],
  openGraph: {
    title: '객실 안내 | 가평 휴먼타운 펜션',
    description: '편안한 휴식을 위한 다양한 객실 - 20평~64평, 2~8인',
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
