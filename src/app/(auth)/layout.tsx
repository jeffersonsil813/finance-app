import Logo from "@/components/logo";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col w-full max-w-100 m-auto space-y-2">
      <Logo />
      {children}
    </div>
  );
};

export default AuthLayout;
