// components/summary-card.tsx
import { formatCurrency } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SummaryCardProps {
  label: string;
  value: number;
  variant?: "dark" | "light";
  icon?: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  changePercent?: number | null;
  invertChangeColor?: boolean;
  footer?: string;
}

export function SummaryCard({
  label,
  value,
  variant = "light",
  icon: Icon,
  iconColor,
  iconBg,
  changePercent,
  invertChangeColor = false,
  footer,
}: SummaryCardProps) {
  const isDark = variant === "dark";

  const isPositive = (changePercent ?? 0) > 0;
  const changeIsGood = invertChangeColor ? !isPositive : isPositive;

  return (
    <div
      className={`col-span-12 lg:col-span-4 h-full rounded-2xl p-5 ${
        isDark
          ? "bg-black shadow-md"
          : "bg-white border border-[#E5E5E0] shadow-sm"
      }`}
    >
      <div className="flex items-center gap-2 mb-2.5">
        {Icon && (
          <div
            className="rounded-full w-6 h-6 flex items-center justify-center"
            style={{ color: iconColor, backgroundColor: iconBg }}
          >
            <Icon className="w-3.5 h-3.5" />
          </div>
        )}
        <p
          className={`text-[10px] uppercase tracking-widest font-medium ${
            isDark ? "text-white/50" : "text-[#6B7280]"
          }`}
        >
          {label}
        </p>
      </div>

      <h3
        className={`font-semibold leading-none tracking-tight ${
          isDark ? "text-[1.65rem] text-white" : "text-2xl text-black"
        }`}
      >
        {formatCurrency(value)}
      </h3>

      {footer && (
        <p
          className={`text-[11px] mt-2.5 ${
            isDark ? "text-white/35" : "text-[#6B7280]"
          }`}
        >
          {footer}
        </p>
      )}

      {changePercent != null && (
        <p
          className={`text-[11px] mt-2.5 font-medium ${
            changeIsGood ? "text-[#16A34A]" : "text-[#DC2626]"
          }`}
        >
          {isPositive ? "+" : ""}
          {changePercent}% vs last month
        </p>
      )}
    </div>
  );
}
