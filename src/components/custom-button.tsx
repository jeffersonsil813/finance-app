import { ButtonProps } from "@base-ui/react";
import { ReactNode } from "react";
import { Button } from "./ui/button";

interface CustomButtonProps extends ButtonProps {
  children: ReactNode;
}

const CustomButton = ({ children, ...props }: CustomButtonProps) => {
  return (
    <Button
      type="button"
      className="bg-light-green h-10 rounded-full cursor-pointer hover:bg-[color-mix(in_srgb,var(--color-light-green)_85%,black)] transition-colors"
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
