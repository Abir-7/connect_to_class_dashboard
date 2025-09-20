import React from "react";

const LoadingTable = () => {
  const rows = 7; // now 7 rows
  const columns = 5; // adjust as needed

  return (
    <div className="overflow-x-auto bg-white shadow rounded-md p-4">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {Array.from({ length: columns }).map((_, idx) => (
              <th
                key={idx}
                className="p-2 bg-gray-200 rounded text-left animate-pulse"
              >
                <div className="h-4 w-20 bg-gray-300 rounded"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIdx) => (
            <tr key={rowIdx} className="border-b last:border-b-0">
              {Array.from({ length: columns }).map((_, colIdx) => (
                <td key={colIdx} className="p-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoadingTable;
