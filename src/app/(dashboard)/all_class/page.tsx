"use client";

import React, { useState } from "react";

import { PaginationCustom } from "@/components/Pagination/PaginationCustom";
import SearchCustom from "@/components/Search/SearchCustom";

import { ClassTable } from "@/components/Table/DashboardTableClass";
const Page = () => {
  const headers = ["Class", "User", "Class Created"];
  const data = [
    {
      id: 1,
      class: "Math 101",
      classImage: "/images/class-math.png",
      user: "John Doe",
      userName: "dasdasda",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
      subject: "Mathematics",
      section: "A",
      createdAt: "12/3/25",
    },
    {
      id: 1,
      class: "Math 101",
      classImage: "/images/class-math.png",
      user: "John Doe2",
      userName: "dasdasa",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
      subject: "Mathematics",
      section: "A",
      createdAt: "12/3/25",
    },
    {
      id: 1,
      class: "Math 101",
      classImage: "/images/class-math.png",
      user: "John Doe",
      userName: "dasdasda",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
      subject: "Mathematics",
      section: "A",
      createdAt: "12/3/25",
    },
    {
      id: 1,
      class: "Math 101",
      classImage: "/images/class-math.png",
      user: "John Doe2",
      userName: "dasdasa",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
      subject: "Mathematics",
      section: "A",
      createdAt: "12/3/25",
    },
    {
      id: 1,
      class: "Math 101",
      classImage: "/images/class-math.png",
      user: "John Doe",
      userName: "dasdasda",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
      subject: "Mathematics",
      section: "A",
      createdAt: "12/3/25",
    },
    {
      id: 1,
      class: "Math 101",
      classImage: "/images/class-math.png",
      user: "John Doe2",
      userName: "dasdasa",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
      subject: "Mathematics",
      section: "A",
      createdAt: "12/3/25",
    },
    {
      id: 1,
      class: "Math 101",
      classImage: "/images/class-math.png",
      user: "John Doe",
      userName: "dasdasda",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
      subject: "Mathematics",
      section: "A",
      createdAt: "12/3/25",
    },
    {
      id: 1,
      class: "Math 101",
      classImage: "/images/class-math.png",
      user: "John Doe2",
      userName: "dasdasa",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
      subject: "Mathematics",
      section: "A",
      createdAt: "12/3/25",
    },
  ];

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
          <div className=" text-[18px] font-[500px]">All Class</div>
          <div className="flex items-center justify-between">
            <SearchCustom></SearchCustom>
          </div>
        </div>
        <div className="h-[calc(100vh-318px)] overflow-y-auto">
          <hr />
          <ClassTable
            headers={headers}
            data={data}
            getClassLink={(row) => `/all_class/${row.id}`}
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
