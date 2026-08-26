"use client";

import { currentMonth, currentYear } from "@/lib/constants";
import { getInsights } from "@/services/insight";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import PageHeader from "./page-header";

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
    </main>
  );
};

export default PageContent;
