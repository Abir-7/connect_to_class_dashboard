// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// const DashboardRedirect = () => {
//   const router = useRouter();

//   useEffect(() => {
//     const redirectUser = async () => {
//       try {
//         const res = await fetch("/api/auth-data", {
//           credentials: "include", // <== THIS IS KEY
//         });
//         const data = await res.json();

//         if (!data?.role) {
//           router.replace("/unauthorized");
//           return;
//         }

//         switch (data.role) {
//           case "ADMIN":
//             router.replace("/admin");
//             break;
//           case "EMPLOYEE":
//             router.replace("/employee");
//             break;
//           case "LEADER":
//             router.replace("/leader");
//             break;
//           case "SUPERVISOR":
//             router.replace("/supervisor");
//             break;
//           default:
//             router.replace("/unauthorized");
//         }
//       } catch (error) {
//         console.error("Redirect error:", error);
//         router.replace("/unauthorized");
//       }
//     };

//     redirectUser();
//   }, [router]);

//   return (
//     <div className="p-4 text-center">Redirecting to your dashboard...</div>
//   );
// };

// export default DashboardRedirect;

"use client";

import OverviewCard from "@/components/Dashboard/DashboardOverviewCard/OverviewCard";
import { PaginationCustom } from "@/components/Pagination/PaginationCustom";
import SearchCustom from "@/components/Search/SearchCustom";
import { DynamicTable } from "@/components/Table/DashboardTableUser";
import { ToggleGroupButton } from "@/components/Toogle/ToogleGroup/ToggleGroup";
import React, { useState } from "react";

const Page = () => {
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
  //table-------
  const headers = ["Name", "Email", "JoiningDate", "UserType"];
  const data = [
    {
      name: "Olivia Rhye",
      username: "@olivia",
      email: "olivia@domain.com",
      joiningdate: "Jan 6, 2025",
      usertype: "Teacher",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      name: "Phoenix Baker",
      username: "@phoenix",
      email: "phoenix@domain.com",
      joiningdate: "Jan 6, 2025",
      usertype: "Parents",
    },
  ];

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

  return (
    <div className="p-6 space-y-10">
      <div className="flex-1  flex flex-wrap gap-4">
        <OverviewCard />
        <OverviewCard />
        <OverviewCard />
      </div>
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
        <div className="h-[calc(100vh-524px)] overflow-y-auto">
          <hr />
          <DynamicTable
            headers={headers}
            data={data}
            avatarField="image"
            badgeField="usertype"
            getBadgeClasses={getBadgeClasses}
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
