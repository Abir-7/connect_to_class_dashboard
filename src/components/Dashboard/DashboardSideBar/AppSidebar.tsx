"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

import { Inbox, Search, ChevronDown, ChevronRight } from "lucide-react";
import LogoutButton from "../../LogoutComponent/LogoutButton";
import { userRoles } from "@/interface/authinterface";
import mainlogo from "@/assets/images/main_logo.png";
import Image from "next/image";
import { Input } from "../../ui/input";
import { IoHome } from "react-icons/io5";

// ✅ Menu config
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: IoHome,
    roles: [...Object.values(userRoles)],
  },
  {
    title: "Users",
    url: "/users",
    icon: Inbox,
    roles: [userRoles.ADMIN],
    children: [
      { title: "Add User", url: "/users" },
      { title: "Manage User", url: "/userss" },
    ],
  },
];

export function AppSidebar() {
  const role = "ADMIN";
  const pathname = usePathname();
  const [selectedPath, setSelectedPath] = useState(pathname);

  // Track which parent menus are open
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  return (
    <div>
      <Sidebar className="bg-[#FFFFFF]">
        {/* Header */}
        <SidebarHeader className="py-6 bg-[#FFFFFF]">
          <div className="flex justify-center mt-5">
            <Image width={140} height={140} alt="main logo" src={mainlogo} />
          </div>
        </SidebarHeader>

        <SidebarContent className="px-2 bg-[#FFFFFF]">
          {/* Search */}
          <SidebarGroup className="relative">
            <Input placeholder="Search..." className="pl-8" />
            <Search
              className="absolute text-[#359AB1] left-4 top-1/2 -translate-y-1/2"
              size={20}
            />
          </SidebarGroup>

          {/* Menu */}
          <SidebarGroup className="bg-[#FFFFFF]">
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {items
                  .filter((item) => item.roles.includes(role))
                  .map((item) => (
                    <div key={item.title}>
                      {/* Parent Item */}
                      <SidebarMenuItem
                        className={`${
                          selectedPath === item.url
                            ? "bg-[#EDFBFE] font-semibold   text-[#297789]"
                            : ""
                        } text-[16px]  rounded-md`}
                      >
                        <SidebarMenuButton
                          asChild={!item.children}
                          className="flex  hover:bg-[#EDFBFE] h-[46px] hover:text-[#297789] duration-300 active:bg-[#EDFBFE] active:text-[#297789]"
                        >
                          {item.children ? (
                            <div
                              onClick={() => toggleMenu(item.title)}
                              className="w-full flex items-center justify-between"
                            >
                              <div className="flex items-center gap-2">
                                <item.icon />
                                <span className="text-lg">{item.title}</span>
                              </div>
                              {openMenus.includes(item.title) ? (
                                <ChevronDown size={16} />
                              ) : (
                                <ChevronRight size={16} />
                              )}
                            </div>
                          ) : (
                            <Link
                              onClick={() => setSelectedPath(item.url)}
                              href={item.url}
                            >
                              <item.icon />
                              <span className="text-lg">{item.title}</span>
                            </Link>
                          )}
                        </SidebarMenuButton>
                      </SidebarMenuItem>

                      {/* Child Sub-links (collapsible) */}
                      {item.children && openMenus.includes(item.title) && (
                        <div className="ml-4 mt-1 space-y-2 pt-1">
                          {item.children.map((child) => (
                            <SidebarMenuItem
                              key={child.title}
                              className={`${
                                selectedPath === child.url
                                  ? "bg-[#EDFBFE] font-semibold  text-[#297789]"
                                  : ""
                              } text-[15px] rounded-md   hover:bg-[#EDFBFE]    hover:text-[#297789]`}
                            >
                              <SidebarMenuButton
                                asChild
                                className="hover:bg-[#EDFBFE]  h-[46px] active:bg-[#EDFBFE] active:text-[#297789] duration-300 hover:text-[#297789]"
                              >
                                <Link
                                  onClick={() => setSelectedPath(child.url)}
                                  href={child.url}
                                >
                                  <span>{child.title}</span>
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* Logout */}
        <div className="mt-auto p-2 bg-[#FFFFFF]">
          <LogoutButton />
        </div>
      </Sidebar>
    </div>
  );
}
