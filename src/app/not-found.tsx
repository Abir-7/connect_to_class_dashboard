import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white px-4">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Page Not Found</p>
      <Link
        href="/"
        className="px-6 py-2 bg-white text-gray-900 font-semibold rounded-lg shadow hover:bg-gray-200 transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
