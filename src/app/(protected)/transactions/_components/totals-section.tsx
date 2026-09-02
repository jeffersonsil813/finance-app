import { Card, CardContent } from "@/components/ui/card";
import { fadeInDown, fadeInTransition, fadeInUp } from "@/lib/animations";
import { cn, formatCurrency } from "@/lib/utils";
import { motion } from "motion/react";
import { forwardRef, memo } from "react";
import { Type } from "../../../../../prisma/generated/enums";

interface TotalsSectionProps {
  totalIn: number;
  totalOut: number;
  filter: "ALL" | Type;
}

interface TotalCardProps {
  label: string;
  value: number;
  type: Type;
  cardStyle: string;
  valueColor: string;
}

const TotalCard = memo(
  forwardRef<HTMLDivElement, TotalCardProps>(
    ({ label, value, cardStyle, valueColor, type }, ref) => (
      <Card
        ref={ref}
        className={cn("rounded-2xl px-3 pt-1 pb-2 flex-1", cardStyle)}
      >
        <CardContent className="p-0 space-y-1">
          <dt className="text-[10px] text-gray-500 uppercase">{label}</dt>
          <dd className={cn("text-[14px] font-bold", valueColor)}>
            {`${type === "INCOME" ? "+" : "-"}${formatCurrency(value)}`}
          </dd>
        </CardContent>
      </Card>
    ),
  ),
);
TotalCard.displayName = "TotalCard";

const MotionTotalCard = motion.create(TotalCard);

const TotalsSection = ({ totalIn, totalOut, filter }: TotalsSectionProps) => {
  const showIn = filter === "ALL" || filter === Type.INCOME;
  const showOut = filter === "ALL" || filter === Type.EXPENSE;

  return (
    <dl className="flex flex-col md:flex-row gap-4 md:items-center">
      {showIn && (
        <MotionTotalCard
          initial={fadeInUp.initial}
          animate={fadeInUp.animate}
          transition={fadeInTransition(0)}
          label="Total In"
          value={totalIn}
          type={Type.INCOME}
          cardStyle="bg-green-50 border border-green-200 ring-0"
          valueColor="text-green-600"
        />
      )}
      {showOut && (
        <MotionTotalCard
          initial={fadeInDown.initial}
          animate={fadeInDown.animate}
          transition={fadeInTransition(showIn ? 1 : 0)}
          label="Total Out"
          value={totalOut}
          type={Type.EXPENSE}
          cardStyle="bg-red-50 border border-red-200 ring-0"
          valueColor="text-red-600"
        />
      )}
    </dl>
  );
};

export default TotalsSection;
