import { sortLabelsWithOtherLast } from "@/lib/labels";
import { NextResponse } from "next/server";
import { IncomeCategory } from "../../../../../../prisma/generated/enums";

interface LabeledIncome {
  value: IncomeCategory;
  label: string;
}

export async function GET() {
  try {
    const incomeLabels: Record<IncomeCategory, string> = {
      SALARY: "Salary",
      BONUS: "Bonus",
      FREELANCE: "Freelance",
      COMMISSION: "Commission",
      INVESTMENT: "Investment",
      DIVIDENDS: "Dividends",
      RENTAL: "Rental",
      REFUND: "Refund",
      GIFT: "Gift",
      SALE: "Sale",
      OTHER: "Other",
    };

    const incomeType: LabeledIncome[] = sortLabelsWithOtherLast(
      Object.entries(incomeLabels).map(([value, label]) => ({
        value: value as IncomeCategory,
        label,
      })),
    );

    return NextResponse.json({ incomeType });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
