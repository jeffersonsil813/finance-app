import { getUserId, UnauthorizedError } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { createTransactionSchema } from "@/schemas/transaction";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET() {
  try {
    const userId = await getUserId();

    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ transactions });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    return NextResponse.json(
      { message: "Internal server error" },
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
        { errors: flattened.fieldErrors },
        { status: 400 },
      );
    }

    const newTransaction = await prisma.transaction.create({
      data: {
        userId,
        ...validation.data,
      },
    });

    return NextResponse.json({ transaction: newTransaction }, { status: 201 });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
