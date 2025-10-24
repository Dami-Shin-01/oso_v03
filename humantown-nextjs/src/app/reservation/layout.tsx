import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '예약 안내 | 오소캠핑바베큐',
  description: '오소캠핑바베큐 예약 안내입니다. 입실/퇴실 시간, 결제 방법, 취소 정책, 이용 수칙 등 예약 전 꼭 확인해주세요.',
  keywords: ['오소캠핑바베큐 예약', '평택 셀프바베큐장 예약', '오소 예약 안내', '송탄 바베큐장 예약'],
  openGraph: {
    title: '예약 안내 | 오소캠핑바베큐',
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
