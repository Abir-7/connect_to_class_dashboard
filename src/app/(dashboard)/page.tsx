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
import DashboardTableUser from "@/components/Table/DashboardTableUser";
import { ToggleGroupButton } from "@/components/Toogle/ToogleGroup/ToggleGroup";
import React from "react";

const Page = () => {
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
          <ToggleGroupButton></ToggleGroupButton>
        </div>
        <div>
          <hr />
          <DashboardTableUser></DashboardTableUser>
        </div>
      </div>
    </div>
  );
};

export default Page;
