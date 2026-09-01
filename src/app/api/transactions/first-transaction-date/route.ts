import { getUserId, UnauthorizedError } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const userId = await getUserId();

    const firstTransaction = await prisma.transaction.findFirst({
      where: { userId },
      orderBy: { date: "asc" },
      select: { date: true },
    });

    const firstTransactionDate = firstTransaction
      ? {
          year: firstTransaction.date.getUTCFullYear(),
          month: firstTransaction.date.getUTCMonth() + 1,
        }
      : null;

    return NextResponse.json(
      {
        firstTransactionDate,
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
