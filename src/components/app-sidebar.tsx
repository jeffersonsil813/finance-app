"use client";

import { CreditCard, House, LogOut, Plus, User } from "lucide-react";

import { Button } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./logo";
import CustomButton from "./custom-button";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: House },
  { title: "Transactions", url: "/transactions", icon: CreditCard },
  { title: "Profile", url: "/profile", icon: User },
];

const defaultStyle = "py-4 px-6 bg-white";

const AppSidebar = () => {
  const pathname = usePathname();

  return (
    <Sidebar variant="floating">
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
              {items.map((item) => {
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
                          ? "text-light-green! bg-green-50!"
                          : "text-gray-subtitle bg-transparent hover:bg-gray-field hover:text-black",
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
            <SidebarMenuButton className="cursor-pointer rounded-full h-10 px-3 transition-colors text-gray-subtitle bg-transparent hover:bg-red-50 hover:text-app-red active:bg-red-50 active:text-app-red">
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
