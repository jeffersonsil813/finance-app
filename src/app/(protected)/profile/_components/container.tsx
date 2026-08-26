import { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-white border border-[#E5E5E0] rounded-2xl p-5 shadow-sm">
      {children}
    </div>
  );
};

export default Container;
