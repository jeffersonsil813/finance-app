import { api } from "@/lib/api-client";
import { Transaction } from "../../prisma/generated/client";
import { Type } from "../../prisma/generated/enums";

interface GetTransactionsResponse {
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

  return api<GetTransactionsResponse>(url, {
    method: "GET",
  });
}

export type NewTransactionData = Omit<
  Transaction,
  "id" | "userId" | "createdAt"
>;

interface NewTransactionResponse {
  message: string;
  transaction: Transaction;
}

export async function createTransaction(newTransaction: NewTransactionData) {
  return api<NewTransactionResponse>("/api/transactions", {
    method: "POST",
    body: newTransaction,
  });
}

export async function updateTransaction(
  transactionId: string,
  updatedTransaction: NewTransactionData,
) {
  const url = `/api/transactions/${transactionId}`;

  return api<NewTransactionResponse>(url, {
    method: "PATCH",
    body: updatedTransaction,
  });
}

export async function deleteTransaction(transactionId: string) {
  const url = `/api/transactions/${transactionId}`;

  return api(url, {
    method: "DELETE",
  });
}

interface GetFirstTransactionDateResponse {
  firstTransactionDate: {
    year: number;
    month: number;
  };
}

export async function getFirstTransactionDate() {
  return api<GetFirstTransactionDateResponse>(
    "/api/transactions/first-transaction-date",
    {
      method: "GET",
    },
  );
}
