import { api } from "@/lib/api-client";
import { User } from "../../prisma/generated/client";

type RegisterData = Omit<User, "id">;

type RegisterResponse = {
  message: string;
};

export async function RegisterClient(newUserData: RegisterData) {
  return api<RegisterResponse>("/api/auth/register", {
    method: "POST",
    body: newUserData,
  });
}
