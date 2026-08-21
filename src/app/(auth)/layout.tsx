import Logo from "@/components/logo";
import Link from "next/link";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col w-full max-w-[90%] sm:max-w-100 m-auto space-y-2">
      <Link href="/" className="cursor-default">
        <Logo />
      </Link>
      {children}
    </div>
  );
};

export default AuthLayout;
