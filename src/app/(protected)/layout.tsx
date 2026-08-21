import AppSidebar from "@/components/app-sidebar";
import BottomNav from "@/components/bottom-nav";
import { SidebarProvider } from "@/components/ui/sidebar";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex w-full">
        <AppSidebar />
        <div className="flex flex-1 p-7 pb-24 md:p-7 xl:px-40 justify-center">
          {children}
        </div>

        <BottomNav />
      </div>
    </SidebarProvider>
  );
};

export default ProtectedLayout;
