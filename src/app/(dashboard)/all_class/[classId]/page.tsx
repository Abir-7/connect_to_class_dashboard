/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { DynamicTable } from "@/components/Table/DashboardTableUser";
import React, { useState, useMemo } from "react";

import { PaginationCustom } from "@/components/Pagination/PaginationCustom";
import SearchCustom from "@/components/Search/SearchCustom";
import { ToggleGroupButton } from "@/components/Toogle/ToogleGroup/ToggleGroup";
import TeacherDetailsSection from "./_components/TeacherDetails";
import { useParams } from "next/navigation";

const Page = () => {
  const { classId } = useParams(); // dynamic class ID
  console.log("Class ID:", classId);

  const [selectedToggle, setToggle] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Example student/parent data for this class
  const allData = [
    {
      name: "Olivia Rhye",
      email: "olivia@domain.com",
      joiningdate: "Jan 6, 2025",
      usertype: "Teacher",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      name: "Phoenix Baker",
      email: "phoenix@domain.com",
      joiningdate: "Jan 6, 2025",
      usertype: "Parents",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      name: "James Smith",
      email: "james@domain.com",
      joiningdate: "Jan 7, 2025",
      usertype: "Students",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      name: "Emma Johnson",
      email: "emma@domain.com",
      joiningdate: "Jan 8, 2025",
      usertype: "Students",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      name: "Sophia Lee",
      email: "sophia@domain.com",
      joiningdate: "Jan 9, 2025",
      usertype: "Parents",
      image: "https://randomuser.me/api/portraits/women/5.jpg",
    },
    {
      name: "Liam Brown",
      email: "liam@domain.com",
      joiningdate: "Jan 10, 2025",
      usertype: "Students",
      image: "https://randomuser.me/api/portraits/men/6.jpg",
    },
    {
      name: "Mia Davis",
      email: "mia@domain.com",
      joiningdate: "Jan 11, 2025",
      usertype: "Students",
      image: "https://randomuser.me/api/portraits/women/7.jpg",
    },
    {
      name: "Noah Wilson",
      email: "noah@domain.com",
      joiningdate: "Jan 12, 2025",
      usertype: "Parents",
      image: "https://randomuser.me/api/portraits/men/8.jpg",
    },
    {
      name: "Ava Martinez",
      email: "ava@domain.com",
      joiningdate: "Jan 13, 2025",
      usertype: "Students",
      image: "https://randomuser.me/api/portraits/women/9.jpg",
    },
    {
      name: "Ethan Garcia",
      email: "ethan@domain.com",
      joiningdate: "Jan 14, 2025",
      usertype: "Parents",
      image: "https://randomuser.me/api/portraits/men/10.jpg",
    },
  ];

  const headers = ["Name", "Email", "JoiningDate", "UserType"];

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
    totalItem: allData.length,
    totalPage: Math.ceil(allData.length / 5),
    limit: 9,
    page: 1,
  });

  // Filter and paginate data
  const filteredData = useMemo(() => {
    let data = allData;

    // Toggle filter
    if (selectedToggle !== "All") {
      data = data.filter((d) => d.usertype === selectedToggle);
    }

    // Search filter
    if (searchTerm) {
      data = data.filter(
        (d) =>
          d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          d.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    const totalItem = data.length;
    const totalPage = Math.ceil(totalItem / meta.limit);
    setMeta((prev) => ({ ...prev, totalItem, totalPage }));

    const start = (meta.page - 1) * meta.limit;
    return data.slice(start, start + meta.limit);
  }, [selectedToggle, searchTerm, meta.page, meta.limit]);

  const handlePageChange = (newPage: number) => {
    setMeta((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <div className="p-6 space-y-10">
      <div className="border rounded-md">
        <div className="p-6 space-y-6">
          <div className="text-[18px] font-[500]">Class Details: {classId}</div>
          <hr />
          <TeacherDetailsSection />
          <hr />
          <div className="flex items-center justify-between">
            <ToggleGroupButton
              options={[
                { label: "All", value: "All" },
                { label: "Students", value: "Students" },
                { label: "Parents", value: "Parents" },
              ]}
              onChange={(val) => {
                setToggle(val);
                setMeta((prev) => ({ ...prev, page: 1 }));
              }}
            />

            <SearchCustom
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setMeta((prev) => ({ ...prev, page: 1 }));
              }}
            />
          </div>
        </div>

        <div className="h-[calc(100vh-434px)] overflow-y-auto">
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
