import { Card } from "@/components/ui/card";
import { fadeInLeft, fadeInRight, fadeInTransition } from "@/lib/animations";
import {
  EXPENSE_CATEGORY_OPTIONS,
  INCOME_CATEGORY_OPTIONS,
  TRANSACTION_TYPE_OPTIONS,
} from "@/lib/constants";
import { formatCurrency, formatDate } from "@/lib/utils";
import { motion } from "motion/react";
import { forwardRef, memo } from "react";
import { Transaction, Type } from "../../../../../prisma/generated/browser";

interface ListSectionProps {
  transactions: Transaction[];
  onItemClick: (transaction: Transaction) => void;
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

interface TransactionItemProps {
  transaction: Transaction;
  categoryConfig: ReturnType<typeof getCategoryConfig> & {};
  onClick: (transaction: Transaction) => void;
}

const TransactionItem = memo(
  forwardRef<HTMLDivElement, TransactionItemProps>(
    ({ transaction, categoryConfig, onClick }, ref) => {
      const { date, amount, description, type, id } = transaction;
      const {
        icon: TransactionIcon,
        representativeColor,
        label,
      } = categoryConfig!;

      const isIncome = type === Type.INCOME;
      const formattedAmount = `${isIncome ? "+" : "-"}${formatCurrency(amount)}`;
      const amountColor = isIncome ? "text-green-600" : "text-red-600";

      const title =
        description ||
        TRANSACTION_TYPE_OPTIONS.find((t) => t.value === type)?.label ||
        "";

      return (
        <Card
          ref={ref}
          key={id}
          className="flex flex-col gap-2 bg-transparent ring-0"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#6B7280] uppercase">
              {formatDate(new Date(date))}
            </span>
            <span className={`text-[12px] ${amountColor}`}>
              {formattedAmount}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onClick(transaction)}
            className="flex items-center justify-between transition-colors bg-white hover:bg-gray-field py-4 px-3.5 rounded-2xl shadow-md w-full text-left appearance-none border-0 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div
                className="rounded-full flex items-center justify-center w-8 h-8"
                style={{
                  backgroundColor: `color-mix(in srgb, ${representativeColor} 15%, white)`,
                  color: representativeColor,
                }}
              >
                <TransactionIcon className="w-4 h-4" />
              </div>

              <div className="flex flex-col">
                <h1 className="text-black">{title}</h1>
                <span className="text-[#9CA3AF] text-[12px]">{label}</span>
              </div>
            </div>
            <span className={`font-semibold ${amountColor}`}>
              {formattedAmount}
            </span>
          </button>
        </Card>
      );
    },
  ),
);

const MotionTransactionItem = motion.create(TransactionItem);

const ListSection = ({ transactions, onItemClick }: ListSectionProps) => {
  return (
    <div className="flex flex-col">
      {transactions.map((transaction, index) => {
        const categoryConfig = getCategoryConfig(transaction);
        if (!categoryConfig) return null;

        const fadeIn = index % 2 === 0 ? fadeInRight : fadeInLeft;

        return (
          <MotionTransactionItem
            initial={fadeIn.initial}
            animate={fadeIn.animate}
            transition={fadeInTransition(index)}
            key={transaction.id}
            transaction={transaction}
            categoryConfig={categoryConfig}
            onClick={onItemClick}
          />
        );
      })}
    </div>
  );
};

export default ListSection;
