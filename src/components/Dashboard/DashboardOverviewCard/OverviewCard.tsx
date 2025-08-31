import Image from "next/image";
import React from "react";
import { poppins } from "@/lib/font";
import green_line from "@/assets/line_graps/_Chart.svg";

interface OverviewCardProps {
  title: string;
  value: number;
  percentage: number; // positive or negative
}

const OverviewCard: React.FC<OverviewCardProps> = ({
  title,
  value,
  percentage,
}) => {
  const isPositive = percentage >= 0;

  return (
    <div
      className={`${poppins.className} w-full h-44 relative shadow p-6 rounded-md flex-1 min-w-[300px]`}
    >
      <div className="flex flex-col justify-between h-full">
        {/* Title */}
        <h1 className="font-semibold text-[16px]">{title}</h1>

        {/* Value */}
        <h2 className="font-semibold text-[36px] leading-[44px] tracking-[-0.02em]">
          {value.toLocaleString()}
        </h2>

        {/* Percentage */}
        <p>
          <span
            className={`font-medium text-sm leading-5 ${
              isPositive ? "text-[#287961]" : "text-red-500"
            }`}
          >
            {percentage}%
          </span>
          <span className="font-medium text-sm leading-5 ml-1">
            vs last month
          </span>
        </p>
      </div>

      {/* Static Graph */}
      <div className="absolute bottom-6 right-6">
        <Image
          src={green_line}
          alt="Graph"
          width={1000}
          height={1000}
          className="w-32"
        />
      </div>
    </div>
  );
};

export default OverviewCard;
