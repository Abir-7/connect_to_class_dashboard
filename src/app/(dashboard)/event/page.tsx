/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useMemo } from "react";
import { PaginationCustom } from "@/components/Pagination/PaginationCustom";
import SearchCustom from "@/components/Search/SearchCustom";
import { ToggleGroupButton } from "@/components/Toogle/ToogleGroup/ToggleGroup";
import { EventTable } from "@/components/Table/EventTable/DashboardTableEvent";
import { useGetAllEventQuery } from "@/redux/api/classApi/classApi";
import { useDebounce } from "@/utils/helper/debounce";
import LoadingTable from "@/components/loadingScreen/loadingTable";
import LoadingPage from "@/components/loadingScreen/LoadingPage";

export interface EventRow {
  createdBy: string;
  className: string;
  id: string;
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
  days_remaining?: number;
}
const formatTimestampDate = (ms: number) => {
  const d = new Date(ms);
  const day = String(d.getUTCDate()).padStart(2, "0");
  const month = String(d.getUTCMonth() + 1).padStart(2, "0");
  const year = d.getUTCFullYear();
  return `${day}/${month}/${year}`;
};

const Page = () => {
  const [selectedToggle, setToggle] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const searchText = useDebounce(searchTerm, 500);
  // Fetch events using RTK Query
  const { data, isLoading, isError, isFetching } = useGetAllEventQuery({
    type: selectedToggle.toLowerCase(),
    search_term: searchText,
    page,
  });

  // Map API data to EventRow format
  const events: EventRow[] = useMemo(() => {
    if (!data?.data) return [];
    return data.data.map((e: any) => ({
      createdBy: e.profile_full_name,
      id: e._id,
      className: e.class_name,
      event: e.event_name,
      description: e.description,
      eventImage: e.image,
      user: e.profile_full_name,
      userName: e.user_email.split("@")[0],
      image: e.profile_image,
      start_date: formatTimestampDate(e.start_date),
      end_date: formatTimestampDate(e.end_date),
      start_time: e.start_time,
      end_time: e.end_time,
      days_remaining: Math.ceil(
        (e.end_date - Date.now()) / (1000 * 60 * 60 * 24)
      ),
    }));
  }, [data]);

  const meta = {
    totalItem: data?.meta?.total_item || 0,
    totalPage: data?.meta?.total_page || 1,
    limit: data?.meta?.limit || 10,
    page,
  };

  const headers = ["Event", "Created by", "Start date", "End date"];

  return (
    <>
      {isLoading ? (
        <LoadingPage></LoadingPage>
      ) : (
        <div className="p-6 space-y-10">
          <div className="border rounded-md">
            <div className="p-6 space-y-6">
              <div className="text-[18px] font-[500]">
                {selectedToggle === "All" ? "All Events" : selectedToggle}
              </div>
              <div className="flex items-center justify-between">
                <ToggleGroupButton
                  defaultValue="All"
                  options={[
                    { label: "All Events", value: "All" },
                    { label: "Upcoming", value: "Upcoming" },
                    { label: "Completed", value: "Completed" },
                  ]}
                  onChange={(val) => {
                    setToggle(val);
                    setPage(1);
                  }}
                />
                <SearchCustom
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPage(1);
                  }}
                />
              </div>
            </div>

            <div className="h-[calc(100vh-320px)] overflow-y-auto">
              <hr />
              {isFetching ? (
                <LoadingTable></LoadingTable>
              ) : isError ? (
                <div className="text-center text-red-500 py-4">
                  Failed to load events
                </div>
              ) : events.length === 0 ? (
                <div className="text-center text-gray-500 py-4">
                  No events found
                </div>
              ) : (
                <EventTable headers={headers} data={events} />
              )}
              <hr />
            </div>

            <div className="h-16 flex justify-center items-center">
              <PaginationCustom meta={meta} onPageChange={setPage} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
