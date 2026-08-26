import { cn } from "@/lib/utils";
import { ButtonProps } from "@base-ui/react";
import { cva, type VariantProps } from "class-variance-authority";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";
import { Button } from "./ui/button";

const customButtonVariants = cva(
  "flex items-center gap-2 h-10 rounded-full cursor-pointer transition-colors active:translate-y-0! active:scale-100! px-4",
  {
    variants: {
      variant: {
        primary:
          "bg-green-600 text-white hover:bg-[color-mix(in_srgb,var(--color-green-600)_85%,black)]",
        outline:
          "border border-[#E5E5E0] bg-transparent text-[#6B7280] hover:bg-gray-field",
        black: "bg-black hover:bg-[#1a1a2a] text-white",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

interface CustomButtonProps
  extends ButtonProps, VariantProps<typeof customButtonVariants> {
  children: ReactNode;
  startIcon?: LucideIcon;
  endIcon?: LucideIcon;
}

const CustomButton = ({
  children,
  startIcon: StartIcon,
  endIcon: EndIcon,
  variant,
  className,
  ...props
}: CustomButtonProps) => {
  return (
    <Button
      className={cn(customButtonVariants({ variant }), className)}
      {...props}
    >
      {StartIcon && <StartIcon className="w-4 h-4" />}
      {children}
      {EndIcon && <EndIcon className="w-4 h-4" />}
    </Button>
  );
};

export default CustomButton;
