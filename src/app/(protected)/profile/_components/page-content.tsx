"use client";

import CustomButton from "@/components/custom-button";
import { useLogout } from "@/hooks/use-logout";
import { LogOut } from "lucide-react";
import UserForm from "./user-form";

const PageContent = () => {
  const { handleLogout, isPending } = useLogout();

  return (
    <main className="flex flex-col space-y-5 w-full max-w-120">
      <h1 className="text-[20px] font-semibold">Profile</h1>

      <UserForm />

      <CustomButton
        startIcon={LogOut}
        className="h-11 rounded-2xl border border-[#FEE2E2] bg-white text-[#DC2626] hover:bg-[#FEF2F2] shadow-sm -mt-2"
        onClick={handleLogout}
        disabled={isPending}
      >
        Log out
      </CustomButton>
    </main>
  );
};

export default PageContent;
