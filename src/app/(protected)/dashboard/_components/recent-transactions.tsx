import {
  EXPENSE_CATEGORY_OPTIONS,
  INCOME_CATEGORY_OPTIONS,
} from "@/lib/constants";
import { formatCurrency, formatDate } from "@/lib/utils";
import { BadgeDollarSign } from "lucide-react";
import Link from "next/link";
import { memo, useMemo } from "react";
import { Transaction, Type } from "../../../../../prisma/generated/browser";

interface RecentTransactionsProps {
  transactions: Transaction[];
}

function getCategoryConfig(transaction: Transaction) {
  const options =
    transaction.type === Type.INCOME
      ? INCOME_CATEGORY_OPTIONS
      : EXPENSE_CATEGORY_OPTIONS;

  const category =
    transaction.type === Type.INCOME
      ? transaction.incomeCategory
      : transaction.expenseCategory;

  return options.find((c) => c.value === category);
}

type CategoryConfig = NonNullable<ReturnType<typeof getCategoryConfig>>;

interface TransactionItemProps {
  transaction: Transaction;
  categoryConfig: CategoryConfig;
}

const TransactionItem = memo(
  ({ transaction, categoryConfig }: TransactionItemProps) => {
    const {
      representativeColor,
      icon: TransactionIcon,
      label,
    } = categoryConfig;
    const { description, date, amount, type: transactionType } = transaction;
    const isIncome = transactionType === Type.INCOME;

    return (
      <div className="flex items-center gap-3 py-3 border-b border-[#F5F5F2] last:border-b-0">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
          style={{
            backgroundColor: `color-mix(in srgb, ${representativeColor} 15%, white)`,
            color: representativeColor,
          }}
        >
          <TransactionIcon className="w-3.75 h-3.75" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-black truncate">
            {description || label}
          </p>
          <p className="text-xs text-[#9CA3AF]">{formatDate(new Date(date))}</p>
        </div>

        <span
          className={`text-sm font-semibold shrink-0 ${isIncome ? "text-green-600" : "text-red-600"}`}
        >
          {`${isIncome ? "+" : "-"}${formatCurrency(amount)}`}
        </span>
      </div>
    );
  },
);

const RecentTransactions = ({ transactions }: RecentTransactionsProps) => {
  const items = useMemo(
    () =>
      transactions
        .map((transaction) => ({
          transaction,
          categoryConfig: getCategoryConfig(transaction),
        }))
        .filter(
          (
            item,
          ): item is {
            transaction: Transaction;
            categoryConfig: CategoryConfig;
          } => item.categoryConfig !== undefined,
        ),
    [transactions],
  );

  const hasData = items.length > 0;

  return (
    <div className="col-span-12 lg:col-span-8 h-full bg-white border border-[#E5E5E0] rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-semibold text-black">Recent Transactions</p>

        {hasData && (
          <Link
            href="/transactions"
            className="text-xs text-[#16A34A] font-medium hover:underline"
          >
            View all
          </Link>
        )}
      </div>

      {hasData ? (
        <div className="flex flex-col">
          {items.map(({ transaction, categoryConfig }) => (
            <TransactionItem
              key={transaction.id}
              categoryConfig={categoryConfig}
              transaction={transaction}
            />
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-2 py-8 text-center">
          <div className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center">
            <BadgeDollarSign className="w-5 h-5 text-[#9CA3AF]" />
          </div>
          <p className="text-sm font-medium text-black">
            No transactions this month
          </p>
          <p className="text-xs text-[#9CA3AF] max-w-50">
            Add a transaction to see your recent transactions.
          </p>
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;
