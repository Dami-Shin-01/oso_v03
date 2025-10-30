'use client';

/**
 * Reservation Success Page
 * /reservations/[id]/success
 *
 * Displays reservation confirmation details.
 */

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import type { Reservation } from '@/types';

export default function ReservationSuccessPage() {
  const params = useParams();
  const router = useRouter();
  const reservationId = params.id as string;

  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await fetch(`/api/reservations/${reservationId}`);
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.error || 'Failed to load reservation');
        }

        setReservation(data.reservation);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load reservation'
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (reservationId) {
      fetchReservation();
    }
  }, [reservationId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-main"></div>
          <p className="mt-4 text-gray-600">예약 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error || !reservation) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            예약 정보를 찾을 수 없습니다
          </h1>
          <p className="text-gray-600 mb-8">{error}</p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-primary-main text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const checkInDate = new Date(reservation.check_in);
  const checkOutDate = new Date(reservation.check_out);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            예약이 완료되었습니다!
          </h1>
          <p className="text-gray-600">
            예약 확인서가 이메일로 발송되었습니다.
          </p>
        </div>

        {/* Reservation Details Card */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-4 border-b">
            예약 정보
          </h2>

          <div className="space-y-4">
            {/* Reservation ID */}
            <div className="flex justify-between">
              <span className="text-gray-600">예약 번호</span>
              <span className="font-medium text-gray-900">
                {reservation.id.slice(0, 8).toUpperCase()}
              </span>
            </div>

            {/* Status */}
            <div className="flex justify-between">
              <span className="text-gray-600">예약 상태</span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  reservation.status === 'confirmed'
                    ? 'bg-green-100 text-green-800'
                    : reservation.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {reservation.status === 'confirmed'
                  ? '확정'
                  : reservation.status === 'pending'
                  ? '대기중'
                  : reservation.status}
              </span>
            </div>

            {/* Room */}
            <div className="flex justify-between">
              <span className="text-gray-600">객실</span>
              <span className="font-medium text-gray-900">
                {reservation.room_name}
              </span>
            </div>

            {/* Dates */}
            <div className="flex justify-between">
              <span className="text-gray-600">체크인</span>
              <span className="font-medium text-gray-900">
                {format(checkInDate, 'yyyy년 M월 d일 (E)', { locale: ko })} 15:00
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">체크아웃</span>
              <span className="font-medium text-gray-900">
                {format(checkOutDate, 'yyyy년 M월 d일 (E)', { locale: ko })} 11:00
              </span>
            </div>

            {/* Nights */}
            <div className="flex justify-between">
              <span className="text-gray-600">숙박 기간</span>
              <span className="font-medium text-gray-900">
                {reservation.nights}박
              </span>
            </div>

            {/* Guest Count */}
            <div className="flex justify-between">
              <span className="text-gray-600">인원</span>
              <span className="font-medium text-gray-900">
                {reservation.guest_count}명
              </span>
            </div>

            {/* Guest Info */}
            <div className="flex justify-between pt-4 border-t">
              <span className="text-gray-600">예약자명</span>
              <span className="font-medium text-gray-900">
                {reservation.guest_name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">이메일</span>
              <span className="font-medium text-gray-900">
                {reservation.guest_email}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">전화번호</span>
              <span className="font-medium text-gray-900">
                {reservation.guest_phone}
              </span>
            </div>

            {/* Special Requests */}
            {reservation.special_requests && (
              <div className="pt-4 border-t">
                <span className="block text-gray-600 mb-2">특별 요청사항</span>
                <p className="text-gray-900">{reservation.special_requests}</p>
              </div>
            )}

            {/* Total Price */}
            <div className="flex justify-between pt-4 border-t text-lg">
              <span className="font-semibold text-gray-900">총 결제 금액</span>
              <span className="font-bold text-primary-main">
                ₩{reservation.total_price.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Link
            href="/"
            className="text-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            홈으로
          </Link>
          <Link
            href="/reservations/check"
            className="text-center px-6 py-3 bg-primary-main text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            예약 조회
          </Link>
        </div>

        {/* Notice */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">안내사항</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• 체크인: 오후 3시 / 체크아웃: 오전 11시</li>
            <li>• 예약 확인서는 입력하신 이메일로 발송됩니다</li>
            <li>• 예약 변경 및 취소는 고객센터로 문의해주세요</li>
            <li>• 전화: 0507-1380-0203</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
