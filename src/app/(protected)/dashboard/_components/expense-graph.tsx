import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { fadeInTransition, fadeInUp } from "@/lib/animations";
import { EXPENSE_CATEGORY_OPTIONS } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { GetInsightsResponse } from "@/services/insight";
import { PieChartIcon } from "lucide-react";
import { motion } from "motion/react";
import { Pie, PieChart } from "recharts";

interface ExpenseGraphProps {
  data: GetInsightsResponse["expenseByCategory"];
  index: number;
}

const ExpenseGraph = ({ data, index }: ExpenseGraphProps) => {
  const chartData = data.map(({ category, total }) => ({
    category,
    total,
    fill: EXPENSE_CATEGORY_OPTIONS.find((option) => option.value === category)
      ?.representativeColor,
  }));

  const chartConfig = {
    total: { label: "Total" },
    ...Object.fromEntries(
      EXPENSE_CATEGORY_OPTIONS.map((option) => [
        option.value,
        { label: option.label, color: option.representativeColor },
      ]),
    ),
  } satisfies ChartConfig;

  const hasData = chartData.length > 0;

  return (
    <motion.div
      initial={fadeInUp.initial}
      animate={fadeInUp.animate}
      transition={fadeInTransition(index)}
      className="col-span-12 lg:col-span-5 h-full bg-white border border-[#E5E5E0] rounded-2xl p-5 shadow-sm flex flex-col"
    >
      <p className="text-sm font-semibold text-black">By Category</p>
      <p className="text-xs text-[#9CA3AF] mb-1">Expense breakdown</p>

      {hasData ? (
        <>
          <ChartContainer
            config={chartConfig}
            className="w-full flex-1 aspect-square"
          >
            <PieChart>
              <ChartTooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const value = payload[0].value as number;
                  const fill = payload[0].payload.fill as string;

                  return (
                    <div
                      className="flex items-center gap-2 border border-border bg-white p-2 text-sm text-black"
                      style={{ borderRadius: "7.2px" }}
                    >
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: fill }}
                      />
                      {formatCurrency(value)}
                    </div>
                  );
                }}
              />
              <Pie
                data={chartData}
                dataKey="total"
                nameKey="category"
                innerRadius="55%"
                outerRadius="80%"
                strokeWidth={2}
              />
            </PieChart>
          </ChartContainer>

          <ul className="space-y-2 flex flex-col justify-end">
            {chartData.map(({ category, total, fill }) => {
              const label = EXPENSE_CATEGORY_OPTIONS.find(
                (op) => op.value === category,
              )?.label;

              return (
                <li
                  key={category}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: fill }}
                    />
                    <span className="text-xs text-[#6B7280] truncate">
                      {label}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-black shrink-0 ml-2">
                    {formatCurrency(total)}
                  </span>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-2 py-8 text-center">
          <div className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center">
            <PieChartIcon className="w-5 h-5 text-[#9CA3AF]" />
          </div>
          <p className="text-sm font-medium text-black">
            No expenses this month
          </p>
          <p className="text-xs text-[#9CA3AF] max-w-50">
            Add a transaction to see your spending by category.
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default ExpenseGraph;
