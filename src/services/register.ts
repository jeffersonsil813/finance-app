import { api } from "@/lib/api-client";
import { User } from "../../prisma/generated/client";

type RegisterData = Omit<User, "id">;

export async function RegisterClient(newUserData: RegisterData) {
  return api("/api/auth/register", {
    method: "POST",
    body: newUserData,
  });
}
