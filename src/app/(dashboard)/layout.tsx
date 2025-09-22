"use client";
import React, { ReactNode, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Dashboard/DashboardSideBar/AppSidebar";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addPageTitle } from "@/redux/features/pageTitle/pageTitle";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import { useGetMeQuery } from "@/redux/api/authApi/authApi";
//import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import img from "@/assets/images/admin.png";
import Image from "next/image";
const Layout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { description, title } = useAppSelector((state) => state.pageTitle);
  useEffect(() => {
    let pageData = { title: "Default", description: "" };

    switch (true) {
      case pathname === "/overview":
        pageData = { title: "Home", description: "Welcome to homepage" };
      case pathname === "/task_assign":
        pageData = {
          title: "Assign Task",
          description: "Assign task to a teacher",
        };
        break;
      case /^\/task_assign\/\w+/.test(pathname): // dynamic route like /all_class/:id
        pageData = {
          title: "Assigned Task Update",
          description: "Update of teachers task",
        };
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

  const { user } = useAppSelector((state) => state.auth);

  const { data } = useGetMeQuery("", { skip: !user?.token });
  console.log(data);
  return (
    <ProtectedRoute>
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
                <p className="font-semibold">Hello, {data?.data.full_name}</p>

                <Image
                  className="w-9 h-9  me-2 rounded-full"
                  alt=""
                  src={img}
                  width={40}
                  height={40}
                ></Image>
              </div>
            </div>

            <div className="">{children}</div>
          </main>
        </SidebarProvider>
      </div>
    </ProtectedRoute>
  );
};

export default Layout;
