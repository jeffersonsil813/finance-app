import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
} from "@/components/ui/chart";
import { formatCurrency } from "@/lib/utils";
import { GetInsightsResponse } from "@/services/insight";
import { CalendarDays } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

interface MonthlyOverviewProps {
  data: GetInsightsResponse["monthlyOverview"];
}

const expensesColor = "#FCA5A5";
const incomeColor = "#22C55E";

const MonthlyOverview = ({ data }: MonthlyOverviewProps) => {
  const chartData = data.map(({ month, expenses, income }) => ({
    month,
    expenses,
    income,
  }));

  const chartConfig = {
    month: { label: "Month" },
    income: { label: "Income", color: incomeColor },
    expenses: { label: "Expenses", color: expensesColor },
  } satisfies ChartConfig;

  const hasData = chartData.length > 0;

  return (
    <div className="col-span-12 lg:col-span-7 h-full bg-white border border-[#E5E5E0] rounded-2xl p-5 shadow-sm flex flex-col">
      <p className="text-sm font-semibold text-black">Income vs Expenses</p>

      <p className="text-xs text-[#9CA3AF] mb-5">6-month overview</p>

      {hasData ? (
        <ChartContainer
          config={chartConfig}
          className="w-full flex-1 aspect-square"
        >
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />

            <ChartTooltip
              cursor={{ fill: "rgba(0,0,0,0.03)" }}
              content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null;

                return (
                  <div
                    className="flex flex-col gap-1 border border-border bg-white px-3 py-2.5 min-w-35"
                    style={{ borderRadius: "7.2px" }}
                  >
                    <span className="text-sm font-semibold text-black">
                      {label}
                    </span>

                    {payload.map((entry) => (
                      <span
                        key={entry.dataKey?.toString()}
                        className="text-sm"
                        style={{ color: entry.color }}
                      >
                        {entry.dataKey === "income" ? "Income" : "Expenses"}:{" "}
                        {formatCurrency(Number(entry.value))}
                      </span>
                    ))}
                  </div>
                );
              }}
            />

            <ChartLegend
              content={({ payload }) => {
                if (!payload?.length) return null;

                const order = ["income", "expenses"];
                const sorted = [...payload].sort(
                  (a, b) =>
                    order.indexOf(a.dataKey as string) -
                    order.indexOf(b.dataKey as string),
                );

                return (
                  <div className="flex items-center justify-center gap-5 mt-2">
                    {sorted.map((entry) => (
                      <div
                        key={entry.dataKey?.toString()}
                        className="flex items-center gap-2"
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-xs text-[#6B7280]">
                          {entry.dataKey === "income" ? "Income" : "Expenses"}
                        </span>
                      </div>
                    ))}
                  </div>
                );
              }}
            />
            <Bar
              dataKey="income"
              stackId="a"
              fill={incomeColor}
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="expenses"
              stackId="a"
              fill={expensesColor}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-2 py-8 text-center">
          <div className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center">
            <CalendarDays className="w-5 h-5 text-[#9CA3AF]" />
          </div>
          <p className="text-sm font-medium text-black">
            No recent transactions
          </p>
          <p className="text-xs text-[#9CA3AF] max-w-50">
            Add transactions to see your overview.
          </p>
        </div>
      )}
    </div>
  );
};

export default MonthlyOverview;
