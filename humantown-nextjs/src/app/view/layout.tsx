import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '펜션 외경 | 가평 휴먼타운 펜션',
  description: '북한강변의 아름다운 자연 속에 자리한 휴먼타운 펜션의 외경을 감상하세요. 사계절 각기 다른 매력을 선사하는 펜션의 모습을 담았습니다.',
  keywords: ['가평펜션 외경', '휴먼타운 갤러리', '북한강 풍경', '펜션 사진'],
  openGraph: {
    title: '펜션 외경 | 가평 휴먼타운 펜션',
    description: '북한강변의 아름다운 자연 속 휴먼타운 펜션',
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
