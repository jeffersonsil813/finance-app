"use client";

import { currentMonth, currentYear } from "@/lib/constants";
import { getInsights } from "@/services/insight";
import { useQuery } from "@tanstack/react-query";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import AIAnalysis from "./ai-analysis";
import ExpenseGraph from "./expense-graph";
import MonthlyOverview from "./monthly-overview";
import PageHeader from "./page-header";
import RecentTransactions from "./recent-transactions";
import { SummaryCard } from "./summary-card";

const PageContent = () => {
  const [period, setPeriod] = useState({
    year: currentYear,
    month: currentMonth,
  });

  const { data: insightsData } = useQuery({
    queryKey: ["insights", period],
    queryFn: async () => {
      const { month, year } = period;
      const params = { year, month };
      return await getInsights(params);
    },
  });

  return (
    <main className="w-full max-w-5xl flex flex-col space-y-4">
      <PageHeader
        setPeriod={setPeriod}
        period={period}
        userName={insightsData?.userFirstName || ""}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <SummaryCard
          variant="dark"
          label="Total Balance"
          value={insightsData?.total || 0}
          footer="Updated today"
          index={0}
        />

        <SummaryCard
          label="Income"
          value={insightsData?.totalIn || 0}
          icon={ArrowUpRight}
          iconColor="#16A34A"
          iconBg="#DCFCE7"
          changePercent={insightsData?.incomeChangePercent}
          index={1}
        />

        <SummaryCard
          label="Expenses"
          value={insightsData?.totalOut || 0}
          icon={ArrowDownRight}
          iconColor="#DC2626"
          iconBg="#FEE2E2"
          changePercent={insightsData?.expenseChangePercent}
          invertChangeColor
          index={2}
        />

        <MonthlyOverview data={insightsData?.monthlyOverview || []} index={3} />

        <ExpenseGraph data={insightsData?.expenseByCategory || []} index={4} />

        <RecentTransactions
          transactions={insightsData?.recentTransactions || []}
          index={5}
        />

        <AIAnalysis
          month={period.month}
          year={period.year}
          isAbleToGenerateAnalysis={
            (insightsData?.recentTransactions || []).length > 0
          }
          index={6}
        />
      </div>
    </main>
  );
};

export default PageContent;
