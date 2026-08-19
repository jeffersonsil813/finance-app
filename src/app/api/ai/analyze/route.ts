import { generateFinancialAnalysis } from "@/lib/ai";
import { getUserId, UnauthorizedError } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const userId = await getUserId();
    const { month, year } = await request.json();

    if (
      month === undefined ||
      year === undefined ||
      typeof month !== "number" ||
      typeof year !== "number"
    ) {
      return NextResponse.json(
        { error: "Month and year are required and must be numbers" },
        { status: 400 },
      );
    }

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    if (transactions.length === 0) {
      return NextResponse.json(
        { error: "No transactions found for this period" },
        { status: 404 },
      );
    }

    const analysis = await generateFinancialAnalysis(transactions);

    return NextResponse.json({ analysis });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
