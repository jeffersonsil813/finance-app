import { currentMonth, currentYear } from "@/lib/constants";
import { Dispatch, SetStateAction } from "react";
import { MonthYearPicker } from "./month-year-picker";

interface PageHeaderProps {
  userName: string;
  setPeriod: Dispatch<
    SetStateAction<{
      year: number;
      month: number;
    }>
  >;
  period: {
    year: number;
    month: number;
  };
}

const PageHeader = ({ period, setPeriod, userName }: PageHeaderProps) => {
  const handleChangeDate = (month: number, year: number) => {
    setPeriod({ month, year });
  };

  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold text-black">Hello, {userName}</h1>
        <p className="text-sm text-[#6B7280]">Here's your financial overview</p>
      </div>
      <MonthYearPicker
        month={period.month}
        year={period.year}
        onChange={handleChangeDate}
        maxDate={{ month: currentMonth, year: currentYear }}
      />
    </div>
  );
};

export default PageHeader;
