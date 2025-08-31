/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { DynamicTable } from "@/components/Table/DashboardTableUser";
import React, { useState, useMemo } from "react";

import { PaginationCustom } from "@/components/Pagination/PaginationCustom";
import SearchCustom from "@/components/Search/SearchCustom";
import { ToggleGroupButton } from "@/components/Toogle/ToogleGroup/ToggleGroup";

const Page = () => {
  const [selectedToggle, setToggle] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [meta, setMeta] = useState({
    totalItem: 0,
    totalPage: 1,
    limit: 10,
    page: 1,
  });

  const headers = ["Name", "Email", "JoiningDate", "UserType"];
  const allData = [
    {
      name: "Olivia Rhye",
      username: "@olivia",
      email: "olivia@domain.com",
      joiningdate: "2025-01-06",
      usertype: "Teacher",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      name: "Phoenix Baker",
      username: "@phoenix",
      email: "phoenix@domain.com",
      joiningdate: "2025-01-06",
      usertype: "Parents",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      name: "John Doe",
      username: "@john",
      email: "john@domain.com",
      joiningdate: "2025-01-05",
      usertype: "Students",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      name: "Emma Watson",
      username: "@emma",
      email: "emma@domain.com",
      joiningdate: "2025-01-04",
      usertype: "Teacher",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      name: "Liam Smith",
      username: "@liam",
      email: "liam@domain.com",
      joiningdate: "2025-01-03",
      usertype: "Students",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      name: "Ava Johnson",
      username: "@ava",
      email: "ava@domain.com",
      joiningdate: "2025-01-02",
      usertype: "Parents",
      image: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
      name: "Noah Brown",
      username: "@noah",
      email: "noah@domain.com",
      joiningdate: "2025-01-01",
      usertype: "Teacher",
      image: "https://randomuser.me/api/portraits/men/7.jpg",
    },
    {
      name: "Sophia Lee",
      username: "@sophia",
      email: "sophia@domain.com",
      joiningdate: "2025-01-01",
      usertype: "Students",
      image: "https://randomuser.me/api/portraits/women/8.jpg",
    },
    {
      name: "Mason Davis",
      username: "@mason",
      email: "mason@domain.com",
      joiningdate: "2024-12-31",
      usertype: "Parents",
      image: "https://randomuser.me/api/portraits/men/9.jpg",
    },
    {
      name: "Isabella Martinez",
      username: "@isabella",
      email: "isabella@domain.com",
      joiningdate: "2024-12-30",
      usertype: "Teacher",
      image: "https://randomuser.me/api/portraits/women/10.jpg",
    },
    {
      name: "Ethan Wilson",
      username: "@ethan",
      email: "ethan@domain.com",
      joiningdate: "2024-12-29",
      usertype: "Students",
      image: "https://randomuser.me/api/portraits/men/11.jpg",
    },
    {
      name: "Mia Anderson",
      username: "@mia",
      email: "mia@domain.com",
      joiningdate: "2024-12-28",
      usertype: "Parents",
      image: "https://randomuser.me/api/portraits/women/12.jpg",
    },
    {
      name: "Lucas Thomas",
      username: "@lucas",
      email: "lucas@domain.com",
      joiningdate: "2024-12-27",
      usertype: "Teacher",
      image: "https://randomuser.me/api/portraits/men/13.jpg",
    },
    {
      name: "Charlotte Harris",
      username: "@charlotte",
      email: "charlotte@domain.com",
      joiningdate: "2024-12-26",
      usertype: "Students",
      image: "https://randomuser.me/api/portraits/women/14.jpg",
    },
    {
      name: "James Clark",
      username: "@james",
      email: "james@domain.com",
      joiningdate: "2024-12-25",
      usertype: "Parents",
      image: "https://randomuser.me/api/portraits/men/15.jpg",
    },
  ];

  // Function to determine badge classes
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

  // Filtered and paginated data
  const filteredData = useMemo(() => {
    let data = allData;

    // Filter by toggle selection
    if (selectedToggle !== "All") {
      data = data.filter((d) => d.usertype === selectedToggle);
    }

    // Filter by search term
    if (searchTerm) {
      data = data.filter(
        (d) =>
          d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          d.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Update pagination meta
    const totalItem = data.length;
    const totalPage = Math.ceil(totalItem / meta.limit);
    setMeta((prev) => ({ ...prev, totalItem, totalPage }));

    // Paginate
    const start = (meta.page - 1) * meta.limit;
    return data.slice(start, start + meta.limit);
  }, [selectedToggle, searchTerm, meta.page, meta.limit]);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setMeta((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <div className="p-6 space-y-10">
      <div className="border rounded-md">
        <div className="p-6 space-y-6">
          <div className="text-[18px] font-[500px]">
            {selectedToggle === "All" ? "All Users" : selectedToggle}
          </div>
          <div className="flex items-center justify-between">
            <ToggleGroupButton
              options={[
                { label: "All User", value: "All" },
                { label: "Teachers", value: "Teacher" },
                { label: "Students", value: "Students" },
                { label: "Parents", value: "Parents" },
              ]}
              onChange={(val) => {
                setToggle(val);
                setMeta((prev) => ({ ...prev, page: 1 })); // reset page
              }}
            />

            <SearchCustom
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setMeta((prev) => ({ ...prev, page: 1 })); // reset page
              }}
            />
          </div>
        </div>

        <div className="h-[calc(100vh-320px)] overflow-y-auto">
          <hr />
          <DynamicTable
            headers={headers}
            data={filteredData}
            avatarField="image"
            badgeField="usertype"
            getBadgeClasses={getBadgeClasses}
          />
          <hr />
        </div>

        <div className="h-16 flex justify-center items-center">
          <PaginationCustom meta={meta} onPageChange={handlePageChange} />
        </div>
      </div>
    </div>
  );
};

export default Page;
