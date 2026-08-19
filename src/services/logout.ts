import { api } from "@/lib/api-client";

export async function logoutClient() {
  return api("/api/auth/logout", {
    method: "POST",
  });
}
