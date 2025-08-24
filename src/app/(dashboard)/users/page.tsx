"use client";
import { DynamicTable } from "@/components/Table/DashboardTableUser";
import React, { useState } from "react";

import { PaginationCustom } from "@/components/Pagination/PaginationCustom";
import SearchCustom from "@/components/Search/SearchCustom";
import { ToggleGroupButton } from "@/components/Toogle/ToogleGroup/ToggleGroup";
const Page = () => {
  const [selectedToogle, setToogle] = useState("All");

  const headers = ["Name", "Email", "JoiningDate", "UserType"];
  const data = [
    {
      name: "Olivia Rhye",
      username: "@olivia",
      email: "olivia@domain.com",
      joiningdate: "Jan 6, 2025",
      usertype: "Teacher",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      name: "Olivia Rhye",
      username: "@olivia",
      email: "olivia@domain.com",
      joiningdate: "Jan 6, 2025",
      usertype: "Teacher",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      name: "Phoenix Baker",
      username: "@phoenix",
      email: "phoenix@domain.com",
      joiningdate: "Jan 6, 2025",
      usertype: "Parents",
    },
    {
      name: "Olivia Rhye",
      username: "@olivia",
      email: "olivia@domain.com",
      joiningdate: "Jan 6, 2025",
      usertype: "Teacher",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      name: "Olivia Rhye",
      username: "@olivia",
      email: "olivia@domain.com",
      joiningdate: "Jan 6, 2025",
      usertype: "Teacher",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      name: "Phoenix Baker",
      username: "@phoenix",
      email: "phoenix@domain.com",
      joiningdate: "Jan 6, 2025",
      usertype: "Parents",
    },
    {
      name: "Olivia Rhye",
      username: "@olivia",
      email: "olivia@domain.com",
      joiningdate: "Jan 6, 2025",
      usertype: "Teacher",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      name: "Olivia Rhye",
      username: "@olivia",
      email: "olivia@domain.com",
      joiningdate: "Jan 6, 2025",
      usertype: "Teacher",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      name: "Phoenix Baker",
      username: "@phoenix",
      email: "phoenix@domain.com",
      joiningdate: "Jan 6, 2025",
      usertype: "Parents",
    },
  ];

  const getBadgeClasses = (type: string) => {
    switch (type) {
      case "Teacher":
        return "bg-purple-100 text-purple-800";
      case "Parents":
        return "bg-green-100 text-green-800";
      case "Students":
        return "bg-blue-100 text-blue-800";
      default:
        return "";
    }
  };

  const [meta, setMeta] = useState({
    totalItem: 120,
    totalPage: 12,
    limit: 10,
    page: 1,
  });

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setMeta((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  return (
    <div className="p-6 space-y-10">
      <div className="border rounded-md ">
        <div className="p-6 space-y-6">
          <div className=" text-[18px] font-[500px]">
            {selectedToogle === "All" ? "All Users" : selectedToogle}
          </div>
          <div className="flex items-center justify-between">
            <ToggleGroupButton
              options={[
                { label: "All User", value: "All" },
                { label: "Teachers", value: "Teachers" },
                { label: "Students", value: "Students" },
                { label: "Parents", value: "Parents" },
              ]}
              onChange={(val) => setToogle(val)}
            />

            <SearchCustom></SearchCustom>
          </div>
        </div>
        <div className="h-[calc(100vh-320px)] overflow-y-auto">
          <hr />
          <DynamicTable
            headers={headers}
            data={data}
            avatarField="image"
            badgeField="usertype"
            getBadgeClasses={getBadgeClasses}
          />
          <hr />
        </div>
        <div className="h-16 flex justify-center items-center">
          <PaginationCustom
            meta={meta}
            onPageChange={handlePageChange}
          ></PaginationCustom>
        </div>
      </div>
    </div>
  );
};

export default Page;
