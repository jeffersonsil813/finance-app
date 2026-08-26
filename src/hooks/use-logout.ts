import { handleApiError } from "@/lib/handle-api-error";
import { logoutClient } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useLogout() {
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: logoutClient,
  });

  const handleLogout = async () => {
    await toast.promise(mutateAsync(), {
      loading: "Logging out...",
      success: () => {
        router.replace("/");
        return "You have been logged out!";
      },
      error: (err) => {
        handleApiError(err);
        return null;
      },
    });
  };

  return {
    handleLogout,
    isPending,
  };
}
