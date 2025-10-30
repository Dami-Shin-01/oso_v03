import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: '예약 안내 | 오소 캠핑바베큐',
  description: '오소캠핑바베큐 예약 방법과 운영 시간, 결제 안내, 이용 수칙, 취소 규정을 확인하세요.',
  keywords: ['오소캠핑바베큐 예약', '평택 바베큐장 예약', '셀프바베큐 예약 안내', '송탄 단체 예약'],
  openGraph: {
    title: '예약 안내 | 오소 캠핑바베큐',
    description: '전화 예약과 방문 예약 정보를 포함한 오소캠핑바베큐 예약 안내입니다.',
  },
});

export default function ReservationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
