import { DynamicTable } from "@/components/Table/DashboardTableUser";
import React from "react";

const page = () => {
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
    <>
      {" "}
      <hr />
      <DynamicTable
        headers={headers}
        data={data}
        avatarField="image"
        badgeField="usertype"
        getBadgeClasses={getBadgeClasses}
      />
      <hr />
    </>
  );
};

export default page;
