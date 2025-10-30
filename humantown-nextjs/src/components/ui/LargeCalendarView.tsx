'use client';

/**
 * LargeCalendarView Component
 *
 * A large, prominent calendar component for selecting date ranges.
 * Displays 1 month at a time with large, easy-to-click date cells.
 * Shows availability for each date.
 */

import { useState, useEffect } from 'react';
import { DayPicker, DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';

interface LargeCalendarViewProps {
  /** Selected date range */
  value?: DateRange;
  /** Callback when date range changes */
  onChange: (range: DateRange | undefined) => void;
  /** Dates that are unavailable (disabled) */
  unavailableDates?: Date[];
  /** Price by date (YYYY-MM-DD format) */
  pricesByDate?: Record<string, number>;
  /** Minimum date (default: today) */
  minDate?: Date;
  /** Maximum date (default: 1 year from today) */
  maxDate?: Date;
  /** Error message to display */
  error?: string;
}

export default function LargeCalendarView({
  value,
  onChange,
  unavailableDates = [],
  pricesByDate = {},
  minDate = new Date(),
  maxDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
  error,
}: LargeCalendarViewProps) {
  const [selected, setSelected] = useState<DateRange | undefined>(value);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  const handleSelect = (range: DateRange | undefined) => {
    setSelected(range);
    onChange(range);
  };

  return (
    <div className="large-calendar-wrapper">
      <DayPicker
        mode="range"
        selected={selected}
        onSelect={handleSelect}
        disabled={[
          { before: minDate },
          { after: maxDate },
          ...unavailableDates,
        ]}
        locale={ko}
        numberOfMonths={1}
        showOutsideDays={true}
        fixedWeeks={false}
        className="rdp-large"
        modifiersClassNames={{
          selected: 'rdp-day-selected',
          today: 'rdp-day-today',
          disabled: 'rdp-day-disabled',
          range_start: 'rdp-day-range-start',
          range_end: 'rdp-day-range-end',
          range_middle: 'rdp-day-range-middle',
        }}
      />

      {/* Error Message */}
      {error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}

      {/* Selection Info */}
      {selected?.from && (
        <div className="selection-info">
          <p>
            <strong>선택한 날짜:</strong>{' '}
            {format(selected.from, 'yyyy년 M월 d일', { locale: ko })}
            {selected.to &&
              ` - ${format(selected.to, 'yyyy년 M월 d일', { locale: ko })}`}
          </p>
        </div>
      )}

      {/* Styles */}
      <style jsx global>{`
        .large-calendar-wrapper {
          width: 100%;
          padding: 20px;
          background: white;
          border-radius: 12px;
          border: 1px solid #e5e5e5;
        }

        .rdp-large {
          font-family: inherit;
          font-size: 16px;
          width: 100%;
        }

        .rdp-large .rdp-month {
          width: 100%;
        }

        .rdp-large .rdp-table {
          width: 100%;
          max-width: none;
        }

        .rdp-large .rdp-head_cell {
          font-weight: 600;
          color: #666;
          padding: 12px 8px;
          text-align: center;
        }

        .rdp-large .rdp-cell {
          padding: 4px;
        }

        .rdp-large .rdp-day {
          width: 100%;
          min-width: 64px;
          height: 80px;
          font-size: 18px;
          font-weight: 500;
          border-radius: 8px;
          border: 1px solid #f0f0f0;
          transition: all 0.2s ease;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Selected state */
        .rdp-day-selected {
          background-color: #b2946b !important;
          color: white !important;
          border-color: #b2946b !important;
        }

        /* Today */
        .rdp-day-today {
          font-weight: bold;
          border: 2px solid #b2946b;
          background-color: #fefaf5;
        }

        /* Disabled */
        .rdp-day-disabled {
          opacity: 0.3;
          cursor: not-allowed;
          background-color: #f8f8f8;
        }

        /* Range styling */
        .rdp-day-range-start,
        .rdp-day-range-end {
          background-color: #a08560 !important;
          color: white !important;
          border-color: #a08560 !important;
        }

        .rdp-day-range-middle {
          background-color: #dec48e !important;
          color: #333 !important;
          border-color: #dec48e !important;
        }

        /* Hover */
        .rdp-day:not(.rdp-day-disabled):hover {
          background-color: #f9f9f9;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          border-color: #b2946b;
        }

        /* Caption (Month/Year header) */
        .rdp-large .rdp-caption {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px 0;
        }

        .rdp-large .rdp-caption_label {
          font-size: 20px;
          font-weight: bold;
          color: var(--color-text);
        }

        .rdp-large .rdp-nav {
          position: absolute;
          right: 0;
        }

        .rdp-large .rdp-nav_button {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid #e5e5e5;
          background: white;
          cursor: pointer;
          transition: all 0.2s;
        }

        .rdp-large .rdp-nav_button:hover {
          background: var(--color-gold);
          border-color: var(--color-gold);
          color: white;
        }

        /* Error message */
        .error-message {
          margin-top: 12px;
          padding: 12px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 6px;
          color: #dc2626;
          font-size: 14px;
        }

        /* Selection info */
        .selection-info {
          margin-top: 16px;
          padding: 16px;
          background: #fefaf5;
          border-radius: 8px;
          border: 1px solid #dec48e;
        }

        .selection-info p {
          margin: 0;
          color: #666;
          font-size: 14px;
        }

        .selection-info strong {
          color: #333;
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
          .large-calendar-wrapper {
            padding: 12px;
          }

          .rdp-large .rdp-day {
            min-width: 40px;
            height: 64px;
            font-size: 16px;
          }

          .rdp-large .rdp-caption_label {
            font-size: 18px;
          }
        }

        /* Very small screens */
        @media (max-width: 480px) {
          .rdp-large .rdp-day {
            min-width: 36px;
            height: 56px;
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
}
