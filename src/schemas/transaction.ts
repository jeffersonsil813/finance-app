import { z } from "zod";
import {
  ExpenseCategory,
  IncomeCategory,
  Type,
} from "../../prisma/generated/enums";

const baseTransactionSchema = z.object({
  description: z.string().optional(),
  amount: z.coerce
    .number({
      error: (issue) =>
        issue.input === undefined
          ? "Amount is required"
          : "Amount must be a valid number",
    })
    .positive({ error: "Amount must be greater than 0" }),
  type: z.enum(Type, {
    error: (issue) =>
      issue.input === undefined
        ? "Type is required"
        : "Type must be either INCOME or EXPENSE",
  }),
  expenseCategory: z
    .enum(ExpenseCategory, {
      error: "Invalid expense category",
    })
    .optional(),
  incomeCategory: z
    .enum(IncomeCategory, {
      error: "Invalid income category",
    })
    .optional(),
  date: z.coerce
    .date({
      error: (issue) =>
        issue.input === undefined
          ? "Date is required"
          : "Date must be a valid date",
    })
    .refine(
      (date) => {
        const toDateOnlyString = (d: Date) => {
          const y = d.getUTCFullYear();
          const m = String(d.getUTCMonth() + 1).padStart(2, "0");
          const day = String(d.getUTCDate()).padStart(2, "0");
          return `${y}-${m}-${day}`;
        };
        return toDateOnlyString(date) <= toDateOnlyString(new Date());
      },
      { error: "Date cannot be in the future" },
    ),
});

export const createTransactionSchema = baseTransactionSchema.refine(
  (data) => {
    if (data.type === Type.EXPENSE) return !!data.expenseCategory;
    if (data.type === Type.INCOME) return !!data.incomeCategory;
    return false;
  },
  {
    message:
      "The category must match the transaction type (expenseCategory for EXPENSE, incomeCategory for INCOME).",
    path: ["expenseCategory"],
  },
);

export const updateTransactionSchema = baseTransactionSchema.partial();
