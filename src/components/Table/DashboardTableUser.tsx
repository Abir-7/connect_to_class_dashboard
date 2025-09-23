/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DynamicTableProps {
  headers: string[];
  data: Record<string, any>[];
  avatarField?: string;
  badgeField?: string;
  getBadgeClasses?: (type: string) => string;
}

export const DynamicTable: React.FC<DynamicTableProps> = ({
  headers,
  data,
  avatarField,
  badgeField,
  getBadgeClasses,
}) => {
  // Improved getInitials function
  const getInitials = (name: string) => {
    if (!name) return "NA";

    // Split on spaces, ignore empty strings
    const words = name.split(" ").filter((w) => w.trim());

    // Take first letter of each word, remove dot if present
    const initials = words
      .map((w) => w[0].replace(/\./g, "")) // remove any dots
      .slice(0, 2) // take first 2 letters (you can remove slice to take all)
      .join("")
      .toUpperCase();

    return initials || "NA";
  };
  return (
    <Table>
      <TableHeader className="bg-gray-50">
        <TableRow>
          {headers.map((header, colIndex) => (
            <TableHead
              key={`header-${colIndex}`}
              className="font-medium text-gray-600"
            >
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {data && data.length > 0 ? (
          data.map((row, rowIndex) => (
            <TableRow
              key={`row-${rowIndex}`} // safe, unique
              className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              {headers.map((header, colIndex) => {
                const key = header.toLowerCase();

                // Name column with avatar
                if (key === "name") {
                  return (
                    <TableCell key={`cell-${rowIndex}-${colIndex}`}>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          {row[avatarField || "image"] ? (
                            <AvatarImage
                              crossOrigin="anonymous"
                              src={row[avatarField || "image"]}
                              alt={row.full_name || ""}
                              onError={(e) => {
                                // When image fails, replace with fallback
                                (e.target as HTMLImageElement).style.display =
                                  "none";
                              }}
                            />
                          ) : null}

                          <AvatarFallback className="bg-blue-100 text-blue-700">
                            {getInitials(row.full_name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-gray-900">
                            {row.full_name || "N/A"}
                          </div>
                          {row.nick_name && (
                            <div className="text-gray-500 text-xs">
                              {row.nick_name}
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                  );
                }

                // Badge column (role / user type)
                if (
                  badgeField &&
                  (key === badgeField.toLowerCase() || key === "user type")
                ) {
                  return (
                    <TableCell key={`cell-${rowIndex}-${colIndex}`}>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          getBadgeClasses?.(row[badgeField]) ||
                          "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {row[badgeField]?.toUpperCase() ?? "N/A"}
                      </span>
                    </TableCell>
                  );
                }

                // Joining Date
                if (key === "joining date") {
                  return (
                    <TableCell
                      key={`cell-${rowIndex}-${colIndex}`}
                      className="text-gray-500"
                    >
                      {row.joiningdate
                        ? new Date(row.joiningdate).toLocaleDateString()
                        : "N/A"}
                    </TableCell>
                  );
                }

                // Default column
                return (
                  <TableCell
                    key={`cell-${rowIndex}-${colIndex}`}
                    className="text-gray-500"
                  >
                    {row[key] ?? "N/A"}
                  </TableCell>
                );
              })}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={headers.length}
              className="text-center text-gray-500"
            >
              No users found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
