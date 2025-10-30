'use client';

/**
 * ReservationForm Component
 *
 * Complete reservation form with date selection, guest information,
 * and price calculation.
 */

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DateRange } from 'react-day-picker';
import { differenceInDays } from 'date-fns';
import DateRangePicker from '@/components/ui/DateRangePicker';
import type { Room, ReservationFormData } from '@/types';

// Validation schema
const reservationSchema = z.object({
  room_id: z.string().min(1, '객실을 선택해주세요'),
  room_name: z.string().min(1),
  guest_name: z.string().min(2, '이름을 입력해주세요 (최소 2자)'),
  guest_email: z.string().email('올바른 이메일 주소를 입력해주세요'),
  guest_phone: z
    .string()
    .regex(/^010-\d{4}-\d{4}$/, '전화번호 형식: 010-1234-5678'),
  guest_count: z.number().min(1, '인원수를 선택해주세요'),
  check_in: z.date({ message: '체크인 날짜를 선택해주세요' }),
  check_out: z.date({ message: '체크아웃 날짜를 선택해주세요' }),
  price_per_night: z.number().min(0),
  total_price: z.number().min(0),
  special_requests: z.string().optional(),
});

type ReservationFormValues = z.infer<typeof reservationSchema>;

interface ReservationFormProps {
  /** Selected room */
  room: Room;
  /** Callback when form is submitted successfully */
  onSuccess?: (reservationId: string) => void;
  /** Callback when form submission fails */
  onError?: (error: string) => void;
}

export default function ReservationForm({
  room,
  onSuccess,
  onError,
}: ReservationFormProps) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nights, setNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      room_id: room.id,
      room_name: room.name,
      price_per_night: room.pricing?.weekday || 0,
      guest_count: room.capacity?.standard || 2,
    },
  });

  const watchCheckIn = watch('check_in');
  const watchCheckOut = watch('check_out');

  // Fetch unavailable dates when room changes
  useEffect(() => {
    const fetchAvailability = async () => {
      setIsLoadingAvailability(true);
      try {
        const today = new Date();
        const oneYearLater = new Date(
          Date.now() + 365 * 24 * 60 * 60 * 1000
        );

        const from = today.toISOString().split('T')[0];
        const to = oneYearLater.toISOString().split('T')[0];

        const response = await fetch(
          `/api/rooms/${room.id}/availability?from=${from}&to=${to}`
        );
        const data = await response.json();

        if (data.success && data.availability) {
          const unavailable = data.availability.unavailable_dates.map(
            (dateStr: string) => new Date(dateStr)
          );
          setUnavailableDates(unavailable);
        }
      } catch (error) {
        console.error('Failed to fetch availability:', error);
      } finally {
        setIsLoadingAvailability(false);
      }
    };

    fetchAvailability();
  }, [room.id]);

  // Calculate nights and total price when dates change
  useEffect(() => {
    if (watchCheckIn && watchCheckOut) {
      const nightsCount = differenceInDays(watchCheckOut, watchCheckIn);
      setNights(nightsCount);

      const pricePerNight = room.pricing?.weekday || 0;
      setTotalPrice(nightsCount * pricePerNight);

      setValue('price_per_night', pricePerNight);
      setValue('total_price', nightsCount * pricePerNight);
    }
  }, [watchCheckIn, watchCheckOut, room.pricing, setValue]);

  // Handle date range change
  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
    if (range?.from) {
      setValue('check_in', range.from, { shouldValidate: true });
    }
    if (range?.to) {
      setValue('check_out', range.to, { shouldValidate: true });
    }
  };

  // Submit form
  const onSubmit = async (data: ReservationFormValues) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/reservations/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          check_in: data.check_in.toISOString().split('T')[0],
          check_out: data.check_out.toISOString().split('T')[0],
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Reservation failed');
      }

      if (result.reservation && onSuccess) {
        onSuccess(result.reservation.id);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      if (onError) {
        onError(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Date Selection */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          체크인 / 체크아웃 <span className="text-red-500">*</span>
        </label>
        <Controller
          name="check_in"
          control={control}
          render={({ field }) => (
            <DateRangePicker
              value={dateRange}
              onChange={handleDateRangeChange}
              unavailableDates={unavailableDates}
              error={errors.check_in?.message || errors.check_out?.message}
            />
          )}
        />
        {nights > 0 && (
          <p className="mt-2 text-sm text-gray-600">
            {nights}박 · ₩{totalPrice.toLocaleString()}
          </p>
        )}
      </div>

      {/* Guest Count */}
      <div>
        <label
          htmlFor="guest_count"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          인원수 <span className="text-red-500">*</span>
        </label>
        <select
          id="guest_count"
          {...register('guest_count', { valueAsNumber: true })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-main"
        >
          {Array.from(
            { length: room.capacity?.maximum || 4 },
            (_, i) => i + 1
          ).map((count) => (
            <option key={count} value={count}>
              {count}명
            </option>
          ))}
        </select>
        {errors.guest_count && (
          <p className="mt-1 text-sm text-red-500">
            {errors.guest_count.message}
          </p>
        )}
      </div>

      {/* Guest Name */}
      <div>
        <label
          htmlFor="guest_name"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          예약자 이름 <span className="text-red-500">*</span>
        </label>
        <input
          id="guest_name"
          type="text"
          {...register('guest_name')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-main"
          placeholder="홍길동"
        />
        {errors.guest_name && (
          <p className="mt-1 text-sm text-red-500">
            {errors.guest_name.message}
          </p>
        )}
      </div>

      {/* Guest Email */}
      <div>
        <label
          htmlFor="guest_email"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          이메일 <span className="text-red-500">*</span>
        </label>
        <input
          id="guest_email"
          type="email"
          {...register('guest_email')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-main"
          placeholder="example@email.com"
        />
        {errors.guest_email && (
          <p className="mt-1 text-sm text-red-500">
            {errors.guest_email.message}
          </p>
        )}
      </div>

      {/* Guest Phone */}
      <div>
        <label
          htmlFor="guest_phone"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          전화번호 <span className="text-red-500">*</span>
        </label>
        <input
          id="guest_phone"
          type="tel"
          {...register('guest_phone')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-main"
          placeholder="010-1234-5678"
        />
        {errors.guest_phone && (
          <p className="mt-1 text-sm text-red-500">
            {errors.guest_phone.message}
          </p>
        )}
      </div>

      {/* Special Requests */}
      <div>
        <label
          htmlFor="special_requests"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          특별 요청사항 (선택)
        </label>
        <textarea
          id="special_requests"
          {...register('special_requests')}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-main resize-none"
          placeholder="추가 요청사항이 있으시면 입력해주세요"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || isLoadingAvailability}
        className="w-full py-4 text-white transition-colors rounded-lg bg-primary-main hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? '예약 처리 중...' : `₩${totalPrice.toLocaleString()} 예약하기`}
      </button>

      {/* Notice */}
      <p className="text-xs text-center text-gray-500">
        예약 확정 후 이메일로 예약 확인서가 발송됩니다.
      </p>
    </form>
  );
}
