import { logoutClient } from "@/services/logout";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useLogout() {
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: logoutClient,
  });

  const handleLogout = () => {
    toast.promise(mutateAsync(), {
      loading: "Logging out...",
      success: () => {
        router.replace("/");
        return "You have been logged out!";
      },
      error: (err: Error) => err.message,
    });
  };

  return {
    handleLogout,
    isPending,
  };
}
