"use client";

import React, { useState } from "react";

import { PaginationCustom } from "@/components/Pagination/PaginationCustom";
import SearchCustom from "@/components/Search/SearchCustom";

import { ToggleGroupButton } from "@/components/Toogle/ToogleGroup/ToggleGroup";
import { EventTable } from "@/components/Table/EventTable/DashboardTableEvent";

export interface EventRow {
  id: number;
  event: string;
  description: string;
  eventImage?: string;
  user: string;
  userName: string;
  image?: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  category?: string;
  days_remaining?: number;
  location?: string;
}

const Page = () => {
  const [selectedToogle, setToogle] = useState("All");
  const headers = ["Event", "Created by", "Start date", "End date"];
  const data = [
    {
      id: 1,
      event: "Conference 2025",
      description:
        "An annual conference discussing the latest in technology, startups, and innovation.",
      eventImage:
        "https://static.vecteezy.com/system/resources/thumbnails/036/397/588/small_2x/ai-generated-concert-crowd-in-front-of-a-big-stage-with-lights-and-smoke-photo.jpeg",

      // User Info
      user: "Charlie",
      userName: "dasd",
      image: "/charlie.png",

      // Dates
      start_date: "2025-09-01",
      end_date: "2025-09-03",

      // Time
      start_time: "10:30 AM",
      end_time: "6:30 PM",

      // Class / Category
      category: "Dancing Star-A",

      // Extra
      days_remaining: 10,
      location: "New York City",
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
