import { api } from "@/lib/api-client";
import { User } from "../../prisma/generated/client";

const userBaseUrl = "/api/users/me";

type NewUserData = Partial<Omit<User, "id">>;

interface BaseResponse {
  message: string;
}

export async function updateUser(newUserData: NewUserData) {
  return api<BaseResponse>(userBaseUrl, {
    method: "PATCH",
    body: newUserData,
  });
}

export type GetUserResponse = Omit<User, "id" | "password"> & {
  initials: string;
  createdAt: string;
};

export async function getUser() {
  return api<GetUserResponse>(userBaseUrl, {
    method: "GET",
  });
}

export async function deleteUser() {
  return api<BaseResponse>(userBaseUrl, {
    method: "DELETE",
  });
}
