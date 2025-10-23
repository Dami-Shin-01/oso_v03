import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '예약 안내 | 가평 휴먼타운 펜션',
  description: '휴먼타운 펜션 예약 안내입니다. 입실/퇴실 시간, 결제 방법, 취소 정책, 이용 수칙 등 예약 전 꼭 확인해주세요.',
  keywords: ['가평펜션 예약', '휴먼타운 예약', '펜션 예약 안내', '가평 숙소 예약'],
  openGraph: {
    title: '예약 안내 | 가평 휴먼타운 펜션',
    description: '예약 전 필수 확인사항 - 입실/퇴실, 결제, 취소 정책',
    type: 'website',
  },
};

export default function ReservationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
