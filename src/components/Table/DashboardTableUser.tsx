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
  avatarField?: string; // field in data for avatar image
  badgeField?: string; // field in data for badge
  getBadgeClasses?: (type: string) => string; // external badge function
}

// Example external badge function
export const getBadgeClasses = (type: string) => {
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

export const DynamicTable: React.FC<DynamicTableProps> = ({
  headers,
  data,
  avatarField,
  badgeField,
  getBadgeClasses,
}) => {
  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase();

  return (
    <Table>
      <TableHeader className="bg-gray-50">
        <TableRow>
          {headers.map((header) => (
            <TableHead key={header} className="font-medium text-gray-600">
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((row, index) => (
          <TableRow
            key={row.id || row.email || index}
            className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
          >
            {headers.map((header) => {
              const key = header.toLowerCase();
              const value = row[key] || "";

              // Name column with avatar + username
              if (key === "name") {
                return (
                  <TableCell key={header}>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        {row[avatarField || "image"] ? (
                          <AvatarImage
                            src={row[avatarField || "image"]}
                            alt={row.name || ""}
                          />
                        ) : (
                          <AvatarFallback className="bg-blue-100 text-blue-700">
                            {row.name ? getInitials(row.name) : "NA"}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <div className="font-medium text-gray-900">
                          {row.name}
                        </div>
                        {row.username && (
                          <div className="text-gray-500 text-xs">
                            {row.username}
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                );
              }

              // Badge column
              if (badgeField && key === badgeField.toLowerCase()) {
                return (
                  <TableCell key={header}>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        getBadgeClasses?.(row[badgeField]) || ""
                      }`}
                    >
                      {row[badgeField]}
                    </span>
                  </TableCell>
                );
              }

              // Default column
              return (
                <TableCell key={header} className="text-gray-900">
                  {value}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
