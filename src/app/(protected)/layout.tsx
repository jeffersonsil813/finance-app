import AppSidebar from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex gap-4 w-full">
        <AppSidebar />
        <div className="flex flex-1 py-7 px-40 justify-center">{children}</div>
      </div>
    </SidebarProvider>
  );
};

export default ProtectedLayout;
