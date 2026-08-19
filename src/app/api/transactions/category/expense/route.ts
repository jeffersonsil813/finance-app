import { sortLabelsWithOtherLast } from "@/lib/labels";
import { NextResponse } from "next/server";
import { ExpenseCategory } from "../../../../../../prisma/generated/enums";

interface LabeledExpense {
  value: ExpenseCategory;
  label: string;
}

export async function GET() {
  try {
    const expenseLabels: Record<ExpenseCategory, string> = {
      FOOD: "Food",
      RESTAURANT: "Restaurant",
      SUPERMARKET: "Supermarket",
      TRANSPORT: "Transport",
      FUEL: "Fuel",
      PUBLIC_TRANSPORT: "Public Transport",
      VEHICLE_MAINTENANCE: "Vehicle Maintenance",
      HOUSING: "Housing",
      RENT: "Rent",
      CONDOMINIUM: "Condominium",
      WATER: "Water",
      ELECTRICITY: "Electricity",
      GAS: "Gas",
      INTERNET: "Internet",
      PHONE: "Phone",
      HEALTH: "Health",
      PHARMACY: "Pharmacy",
      MEDICAL: "Medical",
      DENTIST: "Dentist",
      EDUCATION: "Education",
      COURSES: "Courses",
      BOOKS: "Books",
      ENTERTAINMENT: "Entertainment",
      STREAMING: "Streaming",
      GAMES: "Games",
      MOVIES: "Movies",
      SHOPPING: "Shopping",
      CLOTHING: "Clothing",
      ELECTRONICS: "Electronics",
      TRAVEL: "Travel",
      INSURANCE: "Insurance",
      TAXES: "Taxes",
      PETS: "Pets",
      OTHER: "Other",
    };

    const expenseType: LabeledExpense[] = sortLabelsWithOtherLast(
      Object.entries(expenseLabels).map(([value, label]) => ({
        value: value as ExpenseCategory,
        label,
      })),
    );

    return NextResponse.json({ expenseType });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
