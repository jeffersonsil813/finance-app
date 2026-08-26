"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

interface MonthYearPickerProps {
  month: number; // 1-12
  year: number;
  onChange: (month: number, year: number) => void;
  maxDate?: { month: number; year: number };
}

export function MonthYearPicker({
  month,
  year,
  onChange,
  maxDate,
}: MonthYearPickerProps) {
  const isAtMax = maxDate && year === maxDate.year && month === maxDate.month;

  const isBeyondMax =
    maxDate &&
    (year > maxDate.year || (year === maxDate.year && month > maxDate.month));

  function goToPrevious() {
    if (month === 1) {
      onChange(12, year - 1);
    } else {
      onChange(month - 1, year);
    }
  }

  function goToNext() {
    if (isAtMax || isBeyondMax) return;
    if (month === 12) {
      onChange(1, year + 1);
    } else {
      onChange(month + 1, year);
    }
  }

  return (
    <div className="flex items-center gap-1 bg-white border border-[#E5E5E0] rounded-full p-1 shadow-sm">
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 rounded-full text-[#6B7280] hover:text-black hover:bg-[#F5F5F2] transition cursor-pointer"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <span className="text-sm font-medium text-black text-center select-none">
        {MONTHS[month - 1]} / {year}
      </span>

      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 rounded-full text-[#6B7280] hover:text-black hover:bg-[#F5F5F2] transition cursor-pointer"
        onClick={goToNext}
        disabled={isAtMax || isBeyondMax}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
