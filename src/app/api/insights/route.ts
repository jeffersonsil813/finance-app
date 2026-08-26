import { getUserId, UnauthorizedError } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

function getMonthRange(year: number, month: number) {
  const start = new Date(Date.UTC(year, month - 1, 1));
  const end = new Date(Date.UTC(year, month, 1));
  return { start, end };
}

function calcPercentageChange(
  current: number,
  previous: number,
): number | null {
  if (previous === 0) {
    return null;
  }
  return Number((((current - previous) / Math.abs(previous)) * 100).toFixed(1));
}

export async function GET(request: Request) {
  try {
    const userId = await getUserId();

    const { searchParams } = new URL(request.url);
    const monthParam = searchParams.get("month");
    const yearParam = searchParams.get("year");

    if (!monthParam || !yearParam) {
      return NextResponse.json(
        { error: "'Month' and 'year' query params are required" },
        { status: 400 },
      );
    }

    const month = Number(monthParam);
    const year = Number(yearParam);

    if (
      !Number.isInteger(month) ||
      month < 1 ||
      month > 12 ||
      !Number.isInteger(year)
    ) {
      return NextResponse.json(
        {
          error:
            "'Month' must be an integer between 1 and 12, and 'year' must be a valid integer",
        },
        { status: 400 },
      );
    }

    const now = new Date();
    const currentYear = now.getUTCFullYear();
    const currentMonth = now.getUTCMonth() + 1;

    const isFuture =
      year > currentYear || (year === currentYear && month > currentMonth);

    if (isFuture) {
      return NextResponse.json(
        { error: "Cannot request insights for a future month" },
        { status: 400 },
      );
    }

    const currentRange = getMonthRange(year, month);
    const prevDate = new Date(Date.UTC(year, month - 2, 1));
    const previousRange = getMonthRange(
      prevDate.getUTCFullYear(),
      prevDate.getUTCMonth() + 1,
    );

    const baseWhereCurrent = {
      userId,
      date: { gte: currentRange.start, lt: currentRange.end },
    };
    const baseWherePrevious = {
      userId,
      date: { gte: previousRange.start, lt: previousRange.end },
    };

    const [user, currentIn, currentOut, previousIn, previousOut] =
      await Promise.all([
        prisma.user.findUnique({
          where: { id: userId },
          select: { name: true },
        }),
        prisma.transaction.aggregate({
          _sum: { amount: true },
          where: { ...baseWhereCurrent, type: "INCOME" },
        }),
        prisma.transaction.aggregate({
          _sum: { amount: true },
          where: { ...baseWhereCurrent, type: "EXPENSE" },
        }),
        prisma.transaction.aggregate({
          _sum: { amount: true },
          where: { ...baseWherePrevious, type: "INCOME" },
        }),
        prisma.transaction.aggregate({
          _sum: { amount: true },
          where: { ...baseWherePrevious, type: "EXPENSE" },
        }),
      ]);

    const inValue = Number(currentIn._sum.amount ?? 0);
    const outValue = Number(currentOut._sum.amount ?? 0);
    const prevInValue = Number(previousIn._sum.amount ?? 0);
    const prevOutValue = Number(previousOut._sum.amount ?? 0);

    const total = Number((inValue - outValue).toFixed(2));

    return NextResponse.json(
      {
        userFirstName: (user?.name || "").split(" ")[0] || "",
        total,
        totalIn: Number(inValue.toFixed(2)),
        totalOut: Number(outValue.toFixed(2)),
        incomeChangePercent: calcPercentageChange(inValue, prevInValue),
        expenseChangePercent: calcPercentageChange(outValue, prevOutValue),
      },
      { status: 200 },
    );
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
