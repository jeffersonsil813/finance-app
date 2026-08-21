import { api } from "@/lib/api-client";
import { Transaction } from "../../prisma/generated/client";
import { Type } from "../../prisma/generated/enums";

interface TransactionsResponse {
  summary: {
    totalIn: number;
    totalOut: number;
  };
  transactions: Transaction[];
}

interface TransactionsParams {
  search?: string;
  filter?: "ALL" | Type;
}

export async function getTransactions(params?: TransactionsParams) {
  const queryParams = new URLSearchParams();

  if (params?.search) queryParams.append("search", params.search);
  if (params?.filter && params.filter !== "ALL")
    queryParams.append("type", params.filter);

  const url = `/api/transactions${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

  return api<TransactionsResponse>(url, {
    method: "GET",
  });
}
