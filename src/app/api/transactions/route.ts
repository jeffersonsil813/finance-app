import { getUserId, UnauthorizedError } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { createTransactionSchema } from "@/schemas/transaction";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Type } from "../../../../prisma/generated/enums";

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserId();

    const { searchParams } = new URL(request.url);
    const typeParam = searchParams.get("type")?.toUpperCase();
    const search = searchParams.get("search");

    const isValidType = Object.values(Type).includes(typeParam as Type);

    const searchClause = search
      ? {
          description: {
            contains: search,
            mode: "insensitive" as const,
          },
        }
      : {};

    const baseWhere = {
      userId,
      ...searchClause,
    };

    const listWhere = {
      ...baseWhere,
      ...(isValidType && { type: typeParam as Type }),
    };

    const [transactions, totalIn, totalOut] = await Promise.all([
      prisma.transaction.findMany({
        where: listWhere,
        orderBy: {
          date: "desc",
        },
      }),
      prisma.transaction.aggregate({
        _sum: { amount: true },
        where: { ...baseWhere, type: "INCOME" },
      }),
      prisma.transaction.aggregate({
        _sum: { amount: true },
        where: { ...baseWhere, type: "EXPENSE" },
      }),
    ]);

    return NextResponse.json({
      summary: {
        totalIn: totalIn._sum.amount || 0,
        totalOut: totalOut._sum.amount || 0,
      },
      transactions,
    });
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

export async function POST(request: Request) {
  try {
    const userId = await getUserId();

    const body = await request.json();

    const validation = createTransactionSchema.safeParse(body);

    if (!validation.success) {
      const flattened = z.flattenError(validation.error);

      return NextResponse.json(
        { error: flattened.fieldErrors },
        { status: 400 },
      );
    }

    const newTransaction = await prisma.transaction.create({
      data: {
        userId,
        ...validation.data,
      },
    });

    return NextResponse.json(
      {
        message: "Transaction created successfully!",
        transaction: newTransaction,
      },
      { status: 201 },
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
