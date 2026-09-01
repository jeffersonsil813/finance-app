import { forwardRef, HTMLAttributes, ReactNode } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className = "", ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={`bg-white border border-[#E5E5E0] rounded-2xl p-5 shadow-sm ${className}`}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

Container.displayName = "Container";

export default Container;
