import { headers } from "next/headers";

export class UnauthorizedError extends Error {
  constructor(message = "Missing token") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export async function getUserId(): Promise<string> {
  const userId = (await headers()).get("userId");

  if (!userId) {
    throw new UnauthorizedError();
  }

  return userId;
}
