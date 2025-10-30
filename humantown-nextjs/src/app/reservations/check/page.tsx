'use client';

/**
 * Reservation Check Page
 * /reservations/check
 *
 * Allows users to look up their reservation by ID or email.
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import type { Reservation } from '@/types';

export default function ReservationCheckPage() {
  const router = useRouter();
  const [searchType, setSearchType] = useState<'id' | 'email'>('id');
  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reservation, setReservation] = useState<Reservation | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setReservation(null);
    setIsSearching(true);

    try {
      if (searchType === 'id') {
        // Search by reservation ID
        const response = await fetch(`/api/reservations/${searchValue}`);
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.error || '예약을 찾을 수 없습니다');
        }

        setReservation(data.reservation);
      } else {
        // Search by email (not implemented in API yet, would need a new endpoint)
        setError('이메일 검색 기능은 현재 준비중입니다. 예약번호로 조회해주세요.');
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '예약 조회에 실패했습니다'
      );
    } finally {
      setIsSearching(false);
    }
  };

  const handleCancelReservation = async () => {
    if (!reservation) return;

    if (!confirm('정말로 예약을 취소하시겠습니까?')) return;

    try {
      const response = await fetch(`/api/reservations/${reservation.id}/cancel`, {
        method: 'POST',
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || '예약 취소에 실패했습니다');
      }

      alert('예약이 취소되었습니다.');
      setReservation(data.data);
    } catch (err) {
      alert(
        err instanceof Error ? err.message : '예약 취소에 실패했습니다'
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">예약 조회</h1>
          <p className="text-gray-600">
            예약 번호 또는 이메일로 예약 내역을 확인하세요
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <form onSubmit={handleSearch} className="space-y-6">
            {/* Search Type Toggle */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setSearchType('id')}
                className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                  searchType === 'id'
                    ? 'bg-primary-main text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                예약 번호로 조회
              </button>
              <button
                type="button"
                onClick={() => setSearchType('email')}
                className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                  searchType === 'email'
                    ? 'bg-primary-main text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                이메일로 조회
              </button>
            </div>

            {/* Search Input */}
            <div>
              <label
                htmlFor="search"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                {searchType === 'id' ? '예약 번호' : '이메일 주소'}
              </label>
              <input
                id="search"
                type={searchType === 'id' ? 'text' : 'email'}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={
                  searchType === 'id'
                    ? '예: 550e8400'
                    : 'example@email.com'
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-main"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSearching}
              className="w-full py-4 bg-primary-main text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSearching ? '조회 중...' : '예약 조회'}
            </button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Reservation Result */}
        {reservation && (
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <div className="flex items-start justify-between mb-6 pb-4 border-b">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  예약 정보
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  예약 번호: {reservation.id.slice(0, 8).toUpperCase()}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  reservation.status === 'confirmed'
                    ? 'bg-green-100 text-green-800'
                    : reservation.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : reservation.status === 'cancelled'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {reservation.status === 'confirmed'
                  ? '확정'
                  : reservation.status === 'pending'
                  ? '대기중'
                  : reservation.status === 'cancelled'
                  ? '취소됨'
                  : reservation.status}
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">객실</span>
                <span className="font-medium text-gray-900">
                  {reservation.room_name}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">체크인</span>
                <span className="font-medium text-gray-900">
                  {format(new Date(reservation.check_in), 'yyyy.MM.dd (E)', {
                    locale: ko,
                  })}{' '}
                  15:00
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">체크아웃</span>
                <span className="font-medium text-gray-900">
                  {format(new Date(reservation.check_out), 'yyyy.MM.dd (E)', {
                    locale: ko,
                  })}{' '}
                  11:00
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">숙박 기간</span>
                <span className="font-medium text-gray-900">
                  {reservation.nights}박
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">인원</span>
                <span className="font-medium text-gray-900">
                  {reservation.guest_count}명
                </span>
              </div>

              <div className="flex justify-between pt-4 border-t">
                <span className="text-gray-600">예약자명</span>
                <span className="font-medium text-gray-900">
                  {reservation.guest_name}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">전화번호</span>
                <span className="font-medium text-gray-900">
                  {reservation.guest_phone}
                </span>
              </div>

              <div className="flex justify-between pt-4 border-t text-lg">
                <span className="font-semibold text-gray-900">
                  총 결제 금액
                </span>
                <span className="font-bold text-primary-main">
                  ₩{reservation.total_price.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            {reservation.status !== 'cancelled' && (
              <div className="mt-6 pt-6 border-t">
                <button
                  onClick={handleCancelReservation}
                  className="w-full py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  예약 취소
                </button>
              </div>
            )}
          </div>
        )}

        {/* Help Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">도움이 필요하신가요?</h3>
          <p className="text-sm text-blue-800 mb-4">
            예약 번호는 예약 완료 후 발송된 이메일에서 확인하실 수 있습니다.
          </p>
          <div className="text-sm text-blue-800">
            <p>고객센터: 0507-1380-0203</p>
            <p>운영시간: 오전 9시 - 오후 6시</p>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-block text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← 홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
