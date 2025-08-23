"use client";

import React, { useState } from "react";

import { PaginationCustom } from "@/components/Pagination/PaginationCustom";
import SearchCustom from "@/components/Search/SearchCustom";

import { ToggleGroupButton } from "@/components/Toogle/ToogleGroup/ToggleGroup";
import { EventTable } from "@/components/Table/DashboardTableEvent";
const Page = () => {
  const [selectedToogle, setToogle] = useState("All");
  const headers = ["Event", "Created by", "Date"];
  const data = [
    {
      event: "Conference 2025",
      eventImage: "/conf.png",
      user: "Charlie",
      userName: "dasd",
      image: "/charlie.png",
      date: "2025-09-01",
    },
    {
      event: "Workshop",
      eventImage: "/workshop.png",
      user: "Dana",
      userName: "dasd",
      image: "/dana.png",
      date: "2025-09-10",
    },
    {
      event: "Conference 2025",
      eventImage: "/conf.png",
      user: "Charlie",
      userName: "dasd",
      image: "/charlie.png",
      date: "2025-09-01",
    },
    {
      event: "Workshop",
      eventImage: "/workshop.png",
      user: "Dana",
      userName: "dasd",
      image: "/dana.png",
      date: "2025-09-10",
    },
    {
      event: "Conference 2025",
      eventImage: "/conf.png",
      user: "Charlie",
      userName: "dasd",
      image: "/charlie.png",
      date: "2025-09-01",
    },
    {
      event: "Workshop",
      eventImage: "/workshop.png",
      user: "Dana",
      userName: "dasd",
      image: "/dana.png",
      date: "2025-09-10",
    },
    {
      event: "Conference 2025",
      eventImage: "/conf.png",
      user: "Charlie",
      userName: "dasd",
      image: "/charlie.png",
      date: "2025-09-01",
    },
    {
      event: "Workshop",
      eventImage: "/workshop.png",
      user: "Dana",
      userName: "dasd",
      image: "/dana.png",
      date: "2025-09-10",
    },
    {
      event: "Conference 2025",
      eventImage: "/conf.png",
      user: "Charlie",
      userName: "dasd",
      image: "/charlie.png",
      date: "2025-09-01",
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
          <div className=" text-[18px] font-[500px]">
            {selectedToogle === "All" ? "All Events" : selectedToogle}
          </div>
          <div className="flex items-center justify-between">
            <ToggleGroupButton
              options={[
                { label: "All Events", value: "All" },
                { label: "Upcoming", value: "Teachers" },
                { label: "Completed", value: "Students" },
              ]}
              onChange={(val) => setToogle(val)}
            />
            <SearchCustom></SearchCustom>{" "}
          </div>
        </div>
        <div className="h-[calc(100vh-308px)]  overflow-y-auto">
          <hr />
          <EventTable headers={headers} data={data} />
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
