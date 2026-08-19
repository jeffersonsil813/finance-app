import { BCRYPT_SALT_ROUNDS } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { createUserSchema } from "@/schemas/user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validation = createUserSchema.safeParse(body);

    if (!validation.success) {
      const flattened = z.flattenError(validation.error);

      return NextResponse.json(
        { error: flattened.fieldErrors },
        { status: 400 },
      );
    }

    const { email, password, name } = validation.data;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "User successfully created" },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
