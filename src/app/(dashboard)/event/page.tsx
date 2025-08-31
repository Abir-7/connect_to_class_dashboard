/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useMemo } from "react";

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
  const [selectedToggle, setToggle] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const headers = ["Event", "Created by", "Start date", "End date"];

  const allData: EventRow[] = [
    {
      id: 1,
      event: "Conference 2025",
      description:
        "An annual conference discussing the latest in technology, startups, and innovation.",
      eventImage:
        "https://static.vecteezy.com/system/resources/thumbnails/036/397/588/small_2x/ai-generated-concert-crowd-in-front-of-a-big-stage-with-lights-and-smoke-photo.jpeg",
      user: "Charlie",
      userName: "dasd",
      image: "/charlie.png",
      start_date: "2025-09-01",
      end_date: "2025-09-03",
      start_time: "10:30 AM",
      end_time: "6:30 PM",
      category: "Dancing Star-A",
      days_remaining: 10,
      location: "New York City",
    },
    {
      id: 2,
      event: "Tech Meetup",
      description: "A meetup for local developers.",
      user: "Alice",
      userName: "alice",
      start_date: "2025-08-01",
      end_date: "2025-08-01",
      start_time: "2:00 PM",
      end_time: "5:00 PM",
      category: "Developers",
      days_remaining: -5,
      location: "San Francisco",
    },
    {
      id: 3,
      event: "Dance Workshop",
      description: "Learn the latest dance moves.",
      user: "Bob",
      userName: "bob",
      start_date: "2025-10-05",
      end_date: "2025-10-07",
      start_time: "1:00 PM",
      end_time: "4:00 PM",
      category: "Dancing",
      days_remaining: 40,
      location: "Los Angeles",
    },
  ];

  const [meta, setMeta] = useState({
    totalItem: allData.length,
    totalPage: Math.ceil(allData.length / 5),
    limit: 5,
    page: 1,
  });

  // Filter and paginate data
  const filteredData = useMemo(() => {
    let data = allData;

    // Toggle filter
    const today = new Date();
    if (selectedToggle === "Upcoming") {
      data = data.filter((d) => new Date(d.start_date) >= today);
    } else if (selectedToggle === "Completed") {
      data = data.filter((d) => new Date(d.end_date) < today);
    }

    // Search filter
    if (searchTerm) {
      data = data.filter(
        (d) =>
          d.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
          d.description.toLowerCase().includes(searchTerm.toLowerCase())
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
          <div className="text-[18px] font-[500]">
            {selectedToggle === "All" ? "All Events" : selectedToggle}
          </div>
          <div className="flex items-center justify-between">
            <ToggleGroupButton
              options={[
                { label: "All Events", value: "All" },
                { label: "Upcoming", value: "Upcoming" },
                { label: "Completed", value: "Completed" },
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

        <div className="h-[calc(100vh-320px)] overflow-y-auto">
          <hr />
          <EventTable headers={headers} data={filteredData} />
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
