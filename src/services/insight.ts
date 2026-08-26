import { api } from "@/lib/api-client";

interface InsightParams {
  year: number;
  month: number;
}

interface GetInsightsResponse {
  userFirstName: string;
  total: number;
  totalIn: number;
  totalOut: number;
  incomeChangePercent: number;
  expenseChangePercent: number;
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
