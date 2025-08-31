"use client";
import React, { ReactNode, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Dashboard/DashboardSideBar/AppSidebar";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addPageTitle } from "@/redux/features/pageTitle/pageTitle";
//import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

const Layout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { description, title } = useAppSelector((state) => state.pageTitle);
  useEffect(() => {
    let pageData = { title: "Default", description: "" };

    switch (true) {
      case pathname === "/overview":
        pageData = { title: "Home", description: "Welcome to homepage" };
        break;
      case pathname === "/users":
        pageData = { title: "Users", description: "All users list" };
        break;
      case pathname === "/all_class":
        pageData = { title: "Class", description: "All classes" };
        break;
      case /^\/all_class\/\w+/.test(pathname): // dynamic route like /all_class/:id
        pageData = {
          title: "Class Details",
          description: "Details of the class",
        };
        break;
      case pathname === "/event":
        pageData = { title: "Event", description: "Upcoming events" };
        break;
      case pathname === "/privacy_&_policy":
        pageData = {
          title: "Privacy Policy",
          description: "View privacy & policy",
        };
        break;
    }

    dispatch(addPageTitle(pageData));
  }, [pathname, dispatch]);
  return (
    ///    <ProtectedRoute>
    <div className="h-full">
      <SidebarProvider className="flex h-full overflow-hidden ">
        <AppSidebar />

        <main className="w-full h-full ">
          {/* Top bar */}
          <div className="p-2  flex  items-center justify-between border-b">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="" />
              <div>
                <h1 className="text-2xl font-bold">{title}</h1>
                <p className="text-sm text-gray-500">{description}</p>
              </div>
            </div>
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

export default Layout;
