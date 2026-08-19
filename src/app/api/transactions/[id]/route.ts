import { getUserId, UnauthorizedError } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { updateTransactionSchema } from "@/schemas/transaction";
import { NextResponse } from "next/server";
import { z } from "zod";

interface RequestParams {
  params: Promise<{ id: string }>;
}

async function findOwnedTransaction(transactionId: string, userId: string) {
  const transaction = await prisma.transaction.findUnique({
    where: { id: transactionId },
  });

  if (!transaction) {
    return {
      error: NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 },
      ),
    };
  }

  if (transaction.userId !== userId) {
    return {
      error: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    };
  }

  return { transaction };
}

export async function DELETE(_request: Request, { params }: RequestParams) {
  try {
    const userId = await getUserId();
    const { id: transactionId } = await params;

    const { error } = await findOwnedTransaction(transactionId, userId);
    if (error) return error;

    await prisma.transaction.delete({
      where: { id: transactionId },
    });

    return NextResponse.json(
      { message: "Transaction successfully deleted!" },
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

export async function PATCH(request: Request, { params }: RequestParams) {
  try {
    const userId = await getUserId();
    const { id: transactionId } = await params;

    const body = await request.json();
    const validation = updateTransactionSchema.safeParse(body);

    if (!validation.success) {
      const flattened = z.flattenError(validation.error);
      return NextResponse.json(
        { error: flattened.fieldErrors },
        { status: 400 },
      );
    }

    if (Object.keys(validation.data).length === 0) {
      return NextResponse.json(
        { error: "No fields provided to update" },
        { status: 400 },
      );
    }

    const { error } = await findOwnedTransaction(transactionId, userId);
    if (error) return error;

    const updatedTransaction = await prisma.transaction.update({
      where: { id: transactionId },
      data: validation.data,
    });

    return NextResponse.json(
      {
        message: "Transaction successfully updated!",
        transaction: updatedTransaction,
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
