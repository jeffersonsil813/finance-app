import { NextResponse } from "next/server";
import { Type } from "../../../../../prisma/generated/enums";

interface LabeledType {
  value: Type;
  label: string;
}

export async function GET() {
  try {
    const typeLabels: Record<Type, string> = {
      EXPENSE: "Expense",
      INCOME: "Income",
    };

    const transactionType: LabeledType[] = Object.entries(typeLabels).map(
      ([value, label]) => ({
        value: value as Type,
        label,
      }),
    );

    return NextResponse.json({ transactionType });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
