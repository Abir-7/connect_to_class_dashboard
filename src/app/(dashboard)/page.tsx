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
import React from "react";

const Page = () => {
  return (
    <div className="flex-1 p-4 flex flex-wrap gap-4">
      <OverviewCard />
      <OverviewCard />
      <OverviewCard />
    </div>
  );
};

export default Page;
