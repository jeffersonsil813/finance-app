import { Card, CardContent } from "@/components/ui/card";
import { cn, formatCurrency } from "@/lib/utils";
import { Type } from "../../../../../prisma/generated/enums";

interface TotalsSectionProps {
  totalIn: number;
  totalOut: number;
  filter: "ALL" | Type;
}

interface TotalItem {
  label: string;
  value: number;
  type: Type;
  cardStyle: string;
  valueColor: string;
}

const buildTotals = (totalIn: number, totalOut: number): TotalItem[] => [
  {
    label: "Total In",
    value: totalIn,
    type: Type.INCOME,
    cardStyle: "bg-green-50 border border-green-200 ring-0",
    valueColor: "text-light-green",
  },
  {
    label: "Total Out",
    value: totalOut,
    type: Type.EXPENSE,
    cardStyle: "bg-red-50 border border-red-200 ring-0",
    valueColor: "text-app-red",
  },
];

const TotalCard = ({
  label,
  value,
  cardStyle,
  valueColor,
}: Omit<TotalItem, "type">) => (
  <Card className={cn("rounded-2xl px-3 pt-1 pb-2 flex-1", cardStyle)}>
    <CardContent className="p-0 space-y-1">
      <dt className="text-[10px] text-gray-subtitle uppercase">{label}</dt>
      <dd className={cn("text-[14px] font-bold", valueColor)}>
        {formatCurrency(value)}
      </dd>
    </CardContent>
  </Card>
);

const TotalsSection = ({ totalIn, totalOut, filter }: TotalsSectionProps) => {
  const totals = buildTotals(totalIn, totalOut).filter(
    (t) => filter === "ALL" || filter === t.type,
  );

  return (
    <dl className="flex flex-col md:flex-row gap-4 md:items-center">
      {totals.map((item) => (
        <TotalCard
          key={item.label}
          label={item.label}
          value={item.value}
          cardStyle={item.cardStyle}
          valueColor={item.valueColor}
        />
      ))}
    </dl>
  );
};

export default TotalsSection;
