"use client";

import { LogOut, Plus } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useLogout } from "@/hooks/use-logout";
import { navItems } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CustomButton from "./custom-button";
import Logo from "./logo";

const defaultStyle = "py-4 px-6 bg-white";

const AppSidebar = () => {
  const pathname = usePathname();
  const { handleLogout, isPending } = useLogout();

  return (
    <Sidebar variant="floating" className="pr-0">
      <SidebarHeader className={cn(defaultStyle, "border-b rounded-t-2xl")}>
        <Link href="/dashboard" className="w-fit cursor-default">
          <Logo />
        </Link>
      </SidebarHeader>

      <SidebarContent
        className={cn(defaultStyle, "flex flex-col justify-between")}
      >
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      render={
                        <Link
                          href={item.url}
                          className="flex items-center gap-3"
                        />
                      }
                      tooltip={item.title}
                      isActive={isActive}
                      className={cn(
                        "rounded-full h-10 px-3 transition-colors",
                        isActive
                          ? "text-green-600! bg-green-50!"
                          : "text-gray-500 bg-transparent hover:bg-gray-field hover:text-black",
                      )}
                    >
                      <item.icon className="w-5! h-5!" />
                      <span className="font-medium text-[14px]">
                        {item.title}
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto pt-4 flex flex-col">
          <CustomButton startIcon={Plus}>Add Transaction</CustomButton>
        </div>
      </SidebarContent>

      <SidebarFooter className={cn(defaultStyle, "border-t rounded-b-2xl")}>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              disabled={isPending}
              onClick={handleLogout}
              className="cursor-pointer rounded-full h-10 px-3 transition-colors text-gray-500 bg-transparent hover:bg-red-50 hover:text-red-600 active:bg-red-50 active:text-red-600"
            >
              <LogOut className="w-5! h-5!" />
              <span className="font-medium text-[14px]">Log out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
