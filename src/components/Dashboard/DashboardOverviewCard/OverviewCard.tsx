import Image from "next/image";
import green_line from "@/assets/line_graps/_Chart.svg";
import React from "react";
import { poppins } from "@/lib/font";

const OverviewCard = () => {
  return (
    <div
      className={`${poppins.className} w-full h-44 relative  shadow p-6 rounded-md flex-1 min-w-[250px]`}
    >
      <div className="flex flex-col justify-between h-full ">
        <h1 className="font-semibold text-[16px]  ">Total Customers</h1>
        <h2 className="font-semibold text-[36px] leading-[44px] tracking-[-0.02em]">
          {Number(2000).toLocaleString()}
        </h2>
        <p>
          <span className="text-[#287961]  font-medium text-sm leading-5 text-center">
            40%
          </span>
          <span className=" font-medium text-sm leading-5">vs last month</span>
        </p>
      </div>
      <div className="absolute bottom-6 right-6">
        <Image
          src={green_line}
          alt="Green line graph"
          width={1000} // set width
          height={1000} // set height
          priority // optional: loads faster
          className="w-32"
        />
      </div>
    </div>
  );
};

export default OverviewCard;
