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
        { message: "Transaction not found" },
        { status: 404 },
      ),
    };
  }

  if (transaction.userId !== userId) {
    return {
      error: NextResponse.json({ message: "Forbidden" }, { status: 403 }),
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
      { message: "Transaction deleted successfully" },
      { status: 200 },
    );
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

export async function PATCH(request: Request, { params }: RequestParams) {
  try {
    const userId = await getUserId();
    const { id: transactionId } = await params;

    const body = await request.json();
    const validation = updateTransactionSchema.safeParse(body);

    if (!validation.success) {
      const flattened = z.flattenError(validation.error);
      return NextResponse.json(
        { errors: flattened.fieldErrors },
        { status: 400 },
      );
    }

    if (Object.keys(validation.data).length === 0) {
      return NextResponse.json(
        { message: "No fields provided to update" },
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
        message: "Transaction updated successfully",
        transaction: updatedTransaction,
      },
      { status: 200 },
    );
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
