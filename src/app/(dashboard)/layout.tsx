import React, { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Dashboard/DashboardSideBar/AppSidebar";
//import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    ///    <ProtectedRoute>
    <div className="h-full">
      <SidebarProvider className="flex h-full overflow-hidden ">
        <AppSidebar />

        <main className="w-full h-full ">
          {/* Top bar */}
          <div className="p-2  flex  items-center justify-between border-b">
            <SidebarTrigger className="" />
            <div className="flex justify-center items-center gap-2">
              <p className="font-semibold">Hello, Abir</p>
              <div className="w-10 h-10 bg-gray-950 rounded-full"></div>
            </div>
          </div>

          <div className="">{children}</div>
        </main>
      </SidebarProvider>
    </div>
    //   </ProtectedRoute>
  );
};

export default layout;
