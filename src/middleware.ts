import { jwtVerify, SignJWT } from "jose";
import { NextResponse, type NextRequest } from "next/server";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);

    const nowInSeconds = Math.floor(Date.now() / 1000);
    const exp = payload.exp as number;
    const timeRemainingInSeconds = exp - nowInSeconds;

    if (!payload.userId || typeof payload.userId !== "string") {
      return NextResponse.json(
        { error: "Invalid token payload" },
        { status: 401 },
      );
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("userId", payload.userId);

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    if (timeRemainingInSeconds < 600) {
      const newToken = await new SignJWT({
        userId: payload.userId,
        email: payload.email,
      })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("30m")
        .sign(SECRET_KEY);

      response.cookies.set("token", newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 30,
      });
    }

    return response;
  } catch (error) {
    const response = NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 },
    );

    response.cookies.delete("token");

    return response;
  }
}

export const config = {
  matcher: [
    "/api/transactions/:path*",
    "/api/users/me/:path*",
    "/api/ai/analyze",
  ],
};
