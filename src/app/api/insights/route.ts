import { getUserId, UnauthorizedError } from "@/lib/auth";
import { currentMonth, currentYear } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const MONTHS_TO_SHOW = 6;

function getMonthRange(year: number, month: number) {
  const start = new Date(Date.UTC(year, month - 1, 1));
  const end = new Date(Date.UTC(year, month, 1));
  return { start, end };
}

function shiftMonth(year: number, month: number, offset: number) {
  const date = new Date(Date.UTC(year, month - 1 + offset, 1));
  return { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1 };
}

function calcPercentageChange(
  current: number,
  previous: number,
): number | null {
  if (previous === 0) {
    return null;
  }

  const change = Number(
    (((current - previous) / Math.abs(previous)) * 100).toFixed(1),
  );

  if (change === 0) {
    return null;
  }

  return change;
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

    const overviewBuckets = Array.from({ length: MONTHS_TO_SHOW }, (_, i) =>
      shiftMonth(year, month, i - (MONTHS_TO_SHOW - 1)),
    );
    const overviewRangeStart = new Date(
      Date.UTC(overviewBuckets[0].year, overviewBuckets[0].month - 1, 1),
    );
    const overviewRangeEnd = currentRange.end;

    const [
      user,
      currentIn,
      currentOut,
      previousIn,
      previousOut,
      byCategoryRaw,
      recentTransactions,
      overviewTransactions,
    ] = await Promise.all([
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
      prisma.transaction.groupBy({
        by: ["expenseCategory"],
        _sum: { amount: true },
        where: { ...baseWhereCurrent, type: "EXPENSE" },
      }),
      prisma.transaction.findMany({
        where: baseWhereCurrent,
        orderBy: { date: "desc" },
        take: 5,
      }),
      prisma.transaction.findMany({
        where: {
          userId,
          date: { gte: overviewRangeStart, lt: overviewRangeEnd },
        },
        select: { amount: true, type: true, date: true },
      }),
    ]);

    const inValue = Number(currentIn._sum.amount ?? 0);
    const outValue = Number(currentOut._sum.amount ?? 0);
    const prevInValue = Number(previousIn._sum.amount ?? 0);
    const prevOutValue = Number(previousOut._sum.amount ?? 0);

    const total = Number((inValue - outValue).toFixed(2));

    const expenseByCategory = byCategoryRaw
      .filter((item) => item.expenseCategory !== null)
      .map((item) => ({
        category: item.expenseCategory as string,
        total: Number(item._sum.amount ?? 0),
      }))
      .sort((a, b) => b.total - a.total);

    const overviewTotals = new Map<
      string,
      { income: number; expense: number }
    >();
    overviewBuckets.forEach(({ year, month }) => {
      overviewTotals.set(`${year}-${month}`, { income: 0, expense: 0 });
    });

    for (const tx of overviewTransactions) {
      const txDate = new Date(tx.date);
      const key = `${txDate.getUTCFullYear()}-${txDate.getUTCMonth() + 1}`;
      const bucket = overviewTotals.get(key);
      if (!bucket) continue;

      const amount = Number(tx.amount);
      if (tx.type === "INCOME") {
        bucket.income += amount;
      } else {
        bucket.expense += amount;
      }
    }

    const monthlyOverview = overviewBuckets.map(({ year, month }) => {
      const bucket = overviewTotals.get(`${year}-${month}`)!;
      return {
        month: MONTH_LABELS[month - 1],
        year,
        income: Number(bucket.income.toFixed(2)),
        expenses: Number(bucket.expense.toFixed(2)),
      };
    });

    const hasMonthlyOverviewData = monthlyOverview.some(
      ({ income, expenses }) => income > 0 || expenses > 0,
    );

    return NextResponse.json(
      {
        userFirstName: (user?.name || "").split(" ")[0] || "",
        total,
        totalIn: Number(inValue.toFixed(2)),
        totalOut: Number(outValue.toFixed(2)),
        incomeChangePercent: calcPercentageChange(inValue, prevInValue),
        expenseChangePercent: calcPercentageChange(outValue, prevOutValue),
        expenseByCategory,
        recentTransactions,
        monthlyOverview: hasMonthlyOverviewData ? monthlyOverview : [],
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
