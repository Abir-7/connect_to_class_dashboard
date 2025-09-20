import Image from "next/image";
import React from "react";
import { poppins } from "@/lib/font";
import green_line from "@/assets/line_graps/_Chart.svg";

interface OverviewCardProps {
  title: string;
  value?: number; // optional for loading
  percentage?: number | "N/A";
  isLoading?: boolean; // new prop
}

const OverviewCard: React.FC<OverviewCardProps> = ({
  title,
  value,
  percentage,
  isLoading = false,
}) => {
  const isPositive = typeof percentage === "number" && percentage >= 0;

  return (
    <div
      className={`${
        poppins.className
      } w-full h-44 relative shadow p-6 rounded-md flex-1 min-w-[300px] ${
        isLoading ? "bg-gray-200 animate-pulse" : "bg-white"
      }`}
    >
      <div className="flex flex-col justify-between h-full">
        {/* Title */}
        <h1
          className={`font-semibold text-[16px] ${
            isLoading ? "bg-gray-300 h-5 w-24" : ""
          }`}
        >
          {!isLoading && title}
        </h1>

        {/* Value */}
        <h2
          className={`font-semibold text-[36px] leading-[44px] tracking-[-0.02em] ${
            isLoading ? "bg-gray-300 h-10 w-20" : ""
          }`}
        >
          {!isLoading && value?.toLocaleString()}
        </h2>

        {/* Percentage */}
        <p className="flex items-center">
          {!isLoading ? (
            <>
              <span
                className={`font-medium text-sm leading-5 ${
                  percentage === "N/A"
                    ? "text-gray-400"
                    : isPositive
                    ? "text-[#287961]"
                    : "text-red-500"
                }`}
              >
                {percentage === "N/A" ? "N/A" : `${percentage}%`}
              </span>
              <span className="font-medium text-sm leading-5 ml-1">
                vs last month
              </span>
            </>
          ) : (
            <span className="bg-gray-300 h-4 w-16 block rounded" />
          )}
        </p>
      </div>

      {/* Static Graph */}
      {!isLoading && (
        <div className="absolute bottom-6 right-6">
          <Image
            src={green_line}
            alt="Graph"
            width={1000}
            height={1000}
            className="w-32"
          />
        </div>
      )}
    </div>
  );
};

export default OverviewCard;
