"use client";
import { PaginationCustom } from "@/components/Pagination/PaginationCustom";
import SearchCustom from "@/components/Search/SearchCustom";

import { ToggleGroupButton } from "@/components/Toogle/ToogleGroup/ToggleGroup";
import React, { ReactNode, useState } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  //meta
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
          <div className=" text-[18px] font-[500px]">Recently Joined Users</div>
          <div className="flex items-center justify-between">
            <ToggleGroupButton
              options={[
                { label: "View All", value: "all" },
                { label: "Last 7 Days", value: "last7" },
              ]}
              defaultValue="all"
              onChange={(val) => console.log("Selected:", val)}
            />

            <SearchCustom></SearchCustom>
          </div>
        </div>
        <div>{children}</div>
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

export default Layout;
