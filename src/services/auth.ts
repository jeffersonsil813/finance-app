import { api } from "@/lib/api-client";
import { User } from "../../prisma/generated/client";

type LoginCredentials = Omit<User, "name" | "id" | "createdAt">;

export async function loginClient(credentials: LoginCredentials) {
  return api("/api/auth/login", {
    method: "POST",
    body: credentials,
  });
}

export async function logoutClient() {
  return api("/api/auth/logout", {
    method: "POST",
  });
}

type RegisterData = Omit<User, "id" | "createdAt">;

interface RegisterResponse {
  message: string;
}

export async function registerClient(newUserData: RegisterData) {
  return api<RegisterResponse>("/api/auth/register", {
    method: "POST",
    body: newUserData,
  });
}
