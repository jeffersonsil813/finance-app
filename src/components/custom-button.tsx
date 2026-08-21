import { ButtonProps } from "@base-ui/react";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";
import { Button } from "./ui/button";

interface CustomButtonProps extends ButtonProps {
  children: ReactNode;
  startIcon?: LucideIcon;
  endIcon?: LucideIcon;
}

const CustomButton = ({
  children,
  startIcon: StartIcon,
  endIcon: EndIcon,
  ...props
}: CustomButtonProps) => {
  return (
    <Button
      type="button"
      className="bg-light-green text-white flex items-center gap-2 h-10 rounded-full cursor-pointer hover:bg-[color-mix(in_srgb,var(--color-light-green)_85%,black)] transition-colors active:translate-y-0! active:scale-100! px-4"
      {...props}
    >
      {StartIcon && <StartIcon className="w-4 h-4" />}
      {children}
      {EndIcon && <EndIcon className="w-4 h-4" />}
    </Button>
  );
};

export default CustomButton;
