import { api } from "@/lib/api-client";
import { User } from "../../prisma/generated/client";

type LoginCredentials = Omit<User, "name" | "id">;

export async function LoginClient(credentials: LoginCredentials) {
  return api("/api/auth/login", {
    method: "POST",
    body: credentials,
  });
}
