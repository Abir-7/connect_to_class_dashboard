import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const TeacherDetailsSection = () => {
  const user = {
    name: "John Doe",
    email: "john@example.com",
    mobile: "+880 1234-567890",
    role: "Teacher",
    image: "/images/john.png", // leave empty string to test fallback
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase();

  return (
    <div className=" rounded-md  ">
      {/* Title */}

      <div className="flex justify-between">
        {/* Avatar + Name */}
        <div className="flex items-center gap-4 ">
          <Avatar className="h-10 w-10">
            {user.image ? (
              <AvatarImage
                src={user.image}
                alt={user.name}
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            ) : null}
            <AvatarFallback className="bg-blue-100 text-blue-700 text-lg font-semibold">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className=" font-medium text-gray-900">{user.name}</div>
            <div className="text-xs text-gray-600">{user.role}</div>
          </div>
        </div>

        {/* User Info */}
        <div className=" text-[13px]">
          <div className="flex ">
            <span className="text-gray-900"> {user.email}</span>
          </div>
          <div className="flex ">
            <span className="text-gray-900">{user.mobile}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetailsSection;
