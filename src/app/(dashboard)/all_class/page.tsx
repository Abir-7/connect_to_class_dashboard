"use client";

import React, { useState, useMemo } from "react";

import { PaginationCustom } from "@/components/Pagination/PaginationCustom";
import SearchCustom from "@/components/Search/SearchCustom";
import { ClassTable } from "@/components/Table/DashboardTableClass";

const Page = () => {
  const headers = ["Class", "User", "Class Created"];

  // Sample 15-class data
  const allData = [
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
      createdAt: "2025-01-12",
    },
    {
      id: 2,
      class: "Science 101",
      classImage: "/images/class-science.png",
      user: "Jane Smith",
      userName: "janesmith",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
      subject: "Science",
      section: "B",
      createdAt: "2025-01-11",
    },
    {
      id: 3,
      class: "History 101",
      classImage: "/images/class-history.png",
      user: "Michael Johnson",
      userName: "mjohnson",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
      subject: "History",
      section: "C",
      createdAt: "2025-01-10",
    },
    {
      id: 4,
      class: "Math 102",
      classImage: "/images/class-math.png",
      user: "Emily Davis",
      userName: "edavis",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
      subject: "Mathematics",
      section: "A",
      createdAt: "2025-01-09",
    },
    {
      id: 5,
      class: "English 101",
      classImage: "/images/class-english.png",
      user: "Daniel Wilson",
      userName: "dwilson",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
      subject: "English",
      section: "B",
      createdAt: "2025-01-08",
    },
    {
      id: 6,
      class: "Science 102",
      classImage: "/images/class-science.png",
      user: "Sophia Martinez",
      userName: "smartinez",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
      subject: "Science",
      section: "B",
      createdAt: "2025-01-07",
    },
    {
      id: 7,
      class: "Math 103",
      classImage: "/images/class-math.png",
      user: "James Anderson",
      userName: "janderson",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
      subject: "Mathematics",
      section: "C",
      createdAt: "2025-01-06",
    },
    {
      id: 8,
      class: "History 102",
      classImage: "/images/class-history.png",
      user: "Olivia Thomas",
      userName: "othomas",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
      subject: "History",
      section: "C",
      createdAt: "2025-01-05",
    },
    {
      id: 9,
      class: "English 102",
      classImage: "/images/class-english.png",
      user: "William Lee",
      userName: "wlee",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
      subject: "English",
      section: "A",
      createdAt: "2025-01-04",
    },
    {
      id: 10,
      class: "Science 103",
      classImage: "/images/class-science.png",
      user: "Emma White",
      userName: "ewhite",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
      subject: "Science",
      section: "A",
      createdAt: "2025-01-03",
    },
    {
      id: 11,
      class: "Math 104",
      classImage: "/images/class-math.png",
      user: "Liam Harris",
      userName: "lharris",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
      subject: "Mathematics",
      section: "B",
      createdAt: "2025-01-02",
    },
    {
      id: 12,
      class: "History 103",
      classImage: "/images/class-history.png",
      user: "Mia Clark",
      userName: "mclark",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
      subject: "History",
      section: "B",
      createdAt: "2025-01-01",
    },
    {
      id: 13,
      class: "English 103",
      classImage: "/images/class-english.png",
      user: "Noah Lewis",
      userName: "nlewis",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
      subject: "English",
      section: "C",
      createdAt: "2024-12-31",
    },
    {
      id: 14,
      class: "Science 104",
      classImage: "/images/class-science.png",
      user: "Ava Walker",
      userName: "awalker",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
      subject: "Science",
      section: "C",
      createdAt: "2024-12-30",
    },
    {
      id: 15,
      class: "Math 105",
      classImage: "/images/class-math.png",
      user: "Ethan Hall",
      userName: "ehall",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
      subject: "Mathematics",
      section: "A",
      createdAt: "2024-12-29",
    },
  ];

  const [meta, setMeta] = useState({
    totalItem: 0,
    totalPage: 1,
    limit: 10,
    page: 1,
  });

  const [searchTerm, setSearchTerm] = useState("");

  // Filtered and paginated data
  const filteredData = useMemo(() => {
    let data = allData;

    if (searchTerm) {
      data = data.filter(
        (d) =>
          d.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
          d.user.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    const totalItem = data.length;
    const totalPage = Math.ceil(totalItem / meta.limit);
    setMeta((prev) => ({ ...prev, totalItem, totalPage }));

    const start = (meta.page - 1) * meta.limit;
    return data.slice(start, start + meta.limit);
  }, [searchTerm, meta.page, meta.limit]);

  const handlePageChange = (newPage: number) => {
    setMeta((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <div className="p-6 space-y-10">
      <div className="border rounded-md">
        <div className="p-6 space-y-6">
          <div className="text-[18px] font-[500px]">All Classes</div>
          <div className="flex items-center justify-between">
            <SearchCustom
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setMeta((prev) => ({ ...prev, page: 1 }));
              }}
            />
          </div>
        </div>

        <div className="h-[calc(100vh-318px)] overflow-y-auto">
          <hr />
          <ClassTable
            headers={headers}
            data={filteredData}
            getClassLink={(row) => `/all_class/${row.id}`}
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
