import { getUserId, UnauthorizedError } from "@/lib/auth";
import { BCRYPT_SALT_ROUNDS } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { changePasswordSchema } from "@/schemas/user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function PATCH(request: Request) {
  try {
    const userId = await getUserId();
    const body = await request.json();

    const validation = changePasswordSchema.safeParse(body);

    if (!validation.success) {
      const flattened = z.flattenError(validation.error);
      return NextResponse.json(
        { error: flattened.fieldErrors },
        { status: 400 },
      );
    }

    const { currentPassword, newPassword } = validation.data;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.password) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password,
    );

    if (!isCurrentPasswordValid) {
      return NextResponse.json(
        { error: "Incorrect current password" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, BCRYPT_SALT_ROUNDS);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return NextResponse.json(
      { message: "Password updated successfully!" },
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
