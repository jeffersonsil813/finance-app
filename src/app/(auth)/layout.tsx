import Logo from "@/components/logo";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col max-w-7xl m-auto">
      <Logo />
      {children}
    </div>
  );
};

export default AuthLayout;
