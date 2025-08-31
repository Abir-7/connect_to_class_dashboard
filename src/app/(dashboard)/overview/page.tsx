// "use client";

// import OverviewCard from "@/components/Dashboard/DashboardOverviewCard/OverviewCard";
// import { PaginationCustom } from "@/components/Pagination/PaginationCustom";
// import SearchCustom from "@/components/Search/SearchCustom";
// import { DynamicTable } from "@/components/Table/DashboardTableUser";
// import { ToggleGroupButton } from "@/components/Toogle/ToogleGroup/ToggleGroup";
// import React, { useState } from "react";

// const Page = () => {
//   //meta
//   const [meta, setMeta] = useState({
//     totalItem: 120,
//     totalPage: 12,
//     limit: 10,
//     page: 1,
//   });

//   // Handle page change
//   const handlePageChange = (newPage: number) => {
//     setMeta((prev) => ({
//       ...prev,
//       page: newPage,
//     }));
//   };
//   //table-------
//   const headers = ["Name", "Email", "JoiningDate", "UserType"];
//   const data = [
//     {
//       name: "Olivia Rhye",
//       username: "@olivia",
//       email: "olivia@domain.com",
//       joiningdate: "Jan 6, 2025",
//       usertype: "Teacher",
//       image: "https://randomuser.me/api/portraits/women/1.jpg",
//     },
//     {
//       name: "Phoenix Baker",
//       username: "@phoenix",
//       email: "phoenix@domain.com",
//       joiningdate: "Jan 6, 2025",
//       usertype: "Parents",
//     },
//   ];

//   const getBadgeClasses = (type: string) => {
//     switch (type) {
//       case "Teacher":
//         return "bg-purple-100 text-purple-800";
//       case "Parents":
//         return "bg-green-100 text-green-800";
//       case "Students":
//         return "bg-blue-100 text-blue-800";
//       default:
//         return "";
//     }
//   };

//   return (
//     <div className="p-6 space-y-10">
//       <div className="flex-1  flex flex-wrap gap-4">
//         <OverviewCard title="Total Teachers" value={2000} percentage={40} />
//         <OverviewCard title="Student" value={120} percentage={-10} />
//         <OverviewCard title="Parents" value={120} percentage={-15} />
//       </div>
//       <div className="border rounded-md ">
//         <div className="p-6 space-y-6">
//           <div className=" text-[18px] font-[500px]">Recently Joined Users</div>
//           <div className="flex items-center justify-between">
//             <ToggleGroupButton
//               options={[
//                 { label: "View All", value: "all" },
//                 { label: "Last 7 Days", value: "last7" },
//               ]}
//               defaultValue="all"
//               onChange={(val) => console.log("Selected:", val)}
//             />

//             <SearchCustom></SearchCustom>
//           </div>
//         </div>
//         <div className="h-[calc(100vh-536px)] overflow-y-auto">
//           <hr />
//           <DynamicTable
//             headers={headers}
//             data={data}
//             avatarField="image"
//             badgeField="usertype"
//             getBadgeClasses={getBadgeClasses}
//           />

//           <hr />
//         </div>
//         <div className="h-16 flex justify-center items-center">
//           <PaginationCustom
//             meta={meta}
//             onPageChange={handlePageChange}
//           ></PaginationCustom>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;

"use client";

import OverviewCard from "@/components/Dashboard/DashboardOverviewCard/OverviewCard";
import { PaginationCustom } from "@/components/Pagination/PaginationCustom";
import SearchCustom from "@/components/Search/SearchCustom";
import { DynamicTable } from "@/components/Table/DashboardTableUser";
import { ToggleGroupButton } from "@/components/Toogle/ToogleGroup/ToggleGroup";
import React, { useState, useMemo } from "react";

const Page = () => {
  // meta
  const [meta, setMeta] = useState({
    totalItem: 0,
    totalPage: 1,
    limit: 10,
    page: 1,
  });

  const [filter, setFilter] = useState<"all" | "last7">("all");
  const [searchTerm, setSearchTerm] = useState("");

  // table data
  const allData = [
    {
      name: "Olivia Rhye",
      username: "@olivia",
      email: "olivia@domain.com",
      joiningdate: "2025-08-28",
      usertype: "Teacher",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      name: "Phoenix Baker",
      username: "@phoenix",
      email: "phoenix@domain.com",
      joiningdate: "2025-08-25",
      usertype: "Parents",
    },
    {
      name: "John Doe",
      username: "@john",
      email: "john@domain.com",
      joiningdate: "2025-08-20",
      usertype: "Students",
    },
  ];

  // handle page change
  const handlePageChange = (newPage: number) => {
    setMeta((prev) => ({ ...prev, page: newPage }));
  };

  // badge classes
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

  // filter data based on toggle and search
  const filteredData = useMemo(() => {
    const now = new Date();
    let data = allData;

    // filter by toggle
    if (filter === "last7") {
      data = data.filter((d) => {
        const joinDate = new Date(d.joiningdate);
        const diffDays =
          (now.getTime() - joinDate.getTime()) / (1000 * 3600 * 24);
        return diffDays <= 7;
      });
    }

    // filter by search
    if (searchTerm) {
      data = data.filter(
        (d) =>
          d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          d.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // update pagination meta
    const totalItem = data.length;
    const totalPage = Math.ceil(totalItem / meta.limit);
    setMeta((prev) => ({ ...prev, totalItem, totalPage }));

    // slice by page
    const start = (meta.page - 1) * meta.limit;
    return data.slice(start, start + meta.limit);
  }, [filter, searchTerm, meta.page, meta.limit]);

  return (
    <div className="p-6 space-y-10">
      <div className="flex-1 flex flex-wrap gap-4">
        <OverviewCard title="Total Teachers" value={2000} percentage={40} />
        <OverviewCard title="Students" value={120} percentage={-10} />
        <OverviewCard title="Parents" value={120} percentage={-15} />
      </div>

      <div className="border rounded-md">
        <div className="p-6 space-y-6">
          <div className="text-[18px] font-[500px]">Recently Joined Users</div>
          <div className="flex items-center justify-between">
            <ToggleGroupButton
              options={[
                { label: "View All", value: "all" },
                { label: "Last 7 Days", value: "last7" },
              ]}
              defaultValue="all"
              onChange={(val) => {
                setFilter(val as "all" | "last7");
                setMeta((prev) => ({ ...prev, page: 1 })); // reset page
              }}
            />

            <SearchCustom
              onChange={(e: {
                target: { value: React.SetStateAction<string> };
              }) => {
                setSearchTerm(e.target.value);
                setMeta((prev) => ({ ...prev, page: 1 }));
              }}
            />
          </div>
        </div>

        <div className="h-[calc(100vh-536px)] overflow-y-auto">
          <hr />
          <DynamicTable
            headers={["Name", "Email", "JoiningDate", "UserType"]}
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
