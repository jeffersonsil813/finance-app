import { getUserId, UnauthorizedError } from "@/lib/auth";
import { BCRYPT_SALT_ROUNDS } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { updateUserSchema } from "@/schemas/user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function PATCH(request: Request) {
  try {
    const userId = await getUserId();

    const body = await request.json();

    const validation = updateUserSchema.safeParse(body);

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

    const { password, ...validatedData } = validation.data;

    const newUserData = {
      ...validatedData,
      password: password
        ? await bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
        : undefined,
    };

    await prisma.user.update({
      where: { id: userId },
      data: newUserData,
    });

    return NextResponse.json(
      { message: "User updated successfully" },
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

export async function DELETE() {
  try {
    const userId = await getUserId();

    await prisma.$transaction([
      prisma.transaction.deleteMany({ where: { userId } }),
      prisma.user.delete({ where: { id: userId } }),
    ]);

    const response = NextResponse.json(
      {
        message: "User deleted successful",
      },
      { status: 200 },
    );

    response.cookies.delete("token");

    return response;
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
