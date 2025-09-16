"use client";
import React from "react";

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-[80vh] bg-white">
      <div className="flex flex-col items-center gap-2 text-gray-900">
        <svg
          className="animate-spin h-6 w-6 text-gray-900"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          ></path>
        </svg>
        <span className="text-sm font-medium">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingPage;
