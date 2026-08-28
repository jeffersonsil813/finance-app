import { api } from "@/lib/api-client";
import { Transaction } from "../../prisma/generated/browser";

interface InsightParams {
  year: number;
  month: number;
}

export interface GetInsightsResponse {
  userFirstName: string;
  total: number;
  totalIn: number;
  totalOut: number;
  incomeChangePercent: number;
  expenseChangePercent: number;
  expenseByCategory: {
    category: string;
    total: number;
  }[];
  recentTransactions: Transaction[];
  monthlyOverview: {
    month: string;
    year: number;
    income: number;
    expenses: number;
  }[];
}

export async function getInsights({ month, year }: InsightParams) {
  const queryParams = new URLSearchParams();

  queryParams.append("year", year.toString());
  queryParams.append("month", month.toString());

  const url = `/api/insights?${queryParams.toString()}`;

  return api<GetInsightsResponse>(url, {
    method: "GET",
  });
}
