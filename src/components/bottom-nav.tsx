"use client";

import { navItems } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomNav = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t bg-white py-4 px-6 md:hidden">
      {navItems.map((item) => {
        const isActive = pathname === item.url;
        const Icon = item.icon;

        return (
          <Link
            key={item.title}
            href={item.url}
            className={cn(
              "flex flex-col items-center justify-center gap-1 transition-colors",
              isActive
                ? "text-light-green"
                : "text-gray-subtitle hover:text-black",
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="text-[12px] font-medium">{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;
