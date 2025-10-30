'use client';

/**
 * DateRangePicker Component
 *
 * A date range picker component for selecting check-in and check-out dates.
 * Uses react-day-picker library for the calendar UI.
 */

import { useState, useEffect } from 'react';
import { DayPicker, DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';

interface DateRangePickerProps {
  /** Selected date range */
  value?: DateRange;
  /** Callback when date range changes */
  onChange: (range: DateRange | undefined) => void;
  /** Dates that are unavailable (disabled) */
  unavailableDates?: Date[];
  /** Minimum date (default: today) */
  minDate?: Date;
  /** Maximum date (default: 1 year from today) */
  maxDate?: Date;
  /** Error message to display */
  error?: string;
}

export default function DateRangePicker({
  value,
  onChange,
  unavailableDates = [],
  minDate = new Date(),
  maxDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
  error,
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<DateRange | undefined>(value);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  const handleSelect = (range: DateRange | undefined) => {
    setSelected(range);
    onChange(range);

    // Close picker when both dates are selected
    if (range?.from && range?.to) {
      setTimeout(() => setIsOpen(false), 300);
    }
  };

  const displayText = selected?.from
    ? selected?.to
      ? `${format(selected.from, 'yyyy.MM.dd')} - ${format(selected.to, 'yyyy.MM.dd')}`
      : format(selected.from, 'yyyy.MM.dd')
    : '날짜를 선택하세요';

  return (
    <div className="relative">
      {/* Input Display */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 text-left border rounded-lg transition-colors ${
          error
            ? 'border-red-500 focus:border-red-600'
            : 'border-gray-300 hover:border-primary-main focus:border-primary-main'
        } bg-white focus:outline-none`}
      >
        <div className="flex items-center justify-between">
          <span className={selected?.from ? 'text-gray-900' : 'text-gray-400'}>
            {displayText}
          </span>
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </button>

      {/* Error Message */}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}

      {/* Calendar Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Calendar */}
          <div className="absolute z-50 mt-2 p-4 bg-white border border-gray-200 rounded-lg shadow-xl">
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
              numberOfMonths={2}
              className="rdp-custom"
              modifiersClassNames={{
                selected: 'rdp-day-selected',
                today: 'rdp-day-today',
                disabled: 'rdp-day-disabled',
                range_start: 'rdp-day-range-start',
                range_end: 'rdp-day-range-end',
                range_middle: 'rdp-day-range-middle',
              }}
            />
          </div>
        </>
      )}

      {/* Custom Styles */}
      <style jsx global>{`
        .rdp-custom {
          font-family: inherit;
        }

        .rdp-day-selected {
          background-color: #b2946b !important;
          color: white !important;
        }

        .rdp-day-today {
          font-weight: bold;
          color: #b2946b;
        }

        .rdp-day-disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .rdp-day-range-start,
        .rdp-day-range-end {
          background-color: #a08560 !important;
        }

        .rdp-day-range-middle {
          background-color: #dec48e !important;
          color: #333 !important;
        }

        .rdp-day:hover:not(.rdp-day-disabled) {
          background-color: #f5f5f5;
        }
      `}</style>
    </div>
  );
}
