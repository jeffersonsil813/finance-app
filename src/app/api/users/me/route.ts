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
      { message: "User successfully updated!" },
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
        message: "Account successfully deleted!",
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

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);

  if (words.length === 0 || !words[0]) return "";

  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }

  const firstInitial = words[0].charAt(0);
  const lastInitial = words[words.length - 1].charAt(0);

  return `${firstInitial}${lastInitial}`.toUpperCase();
}

export async function GET() {
  try {
    const userId = await getUserId();

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userData = {
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      initials: getInitials(user.name),
    };

    return NextResponse.json({ ...userData }, { status: 200 });
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
