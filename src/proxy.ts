import { jwtVerify, SignJWT } from "jose";
import { NextResponse, type NextRequest } from "next/server";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

const PUBLIC_API_ROUTES = ["/api/auth/login", "/api/auth/register"];

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;
  const isApiRoute = pathname.startsWith("/api/");

  if (PUBLIC_API_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  let payload: any = null;
  let isValidToken = false;

  if (token) {
    try {
      const verified = await jwtVerify(token, SECRET_KEY);
      payload = verified.payload;

      if (payload.userId && typeof payload.userId === "string") {
        isValidToken = true;
      }
    } catch {
      isValidToken = false;
    }
  }

  if (!isApiRoute) {
    if (isValidToken && (pathname === "/" || pathname === "/register")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (!isValidToken && pathname !== "/" && pathname !== "/register") {
      const response = NextResponse.redirect(new URL("/", request.url));
      if (token) response.cookies.delete("token");
      return response;
    }

    return NextResponse.next();
  }

  if (!isValidToken) {
    const response = NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 },
    );
    if (token) response.cookies.delete("token");
    return response;
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("userId", payload.userId);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  const nowInSeconds = Math.floor(Date.now() / 1000);
  const exp = payload.exp as number;
  const timeRemainingInSeconds = exp - nowInSeconds;

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
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
