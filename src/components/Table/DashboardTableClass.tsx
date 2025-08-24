/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ClassTableProps {
  headers: string[];
  data: Record<string, any>[];
  classImageField?: string; // field for class image
  imageField?: string; // field for user image
  getClassLink?: (row: Record<string, any>) => string; // function to generate link
}

// Generate initials (for fallback avatar)
const getInitials = (text: string) =>
  text
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();

export const ClassTable: React.FC<ClassTableProps> = ({
  headers,
  data,
  classImageField = "classImage",
  imageField = "image",
  getClassLink,
}) => {
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
            key={row.id || index}
            className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
          >
            {headers.map((header) => {
              const key = header.toLowerCase();
              const value = row[key] || "";

              // ---------- CLASS COLUMN ----------
              if (key === "class") {
                return (
                  <TableCell key={header}>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        {row[classImageField] ? (
                          <AvatarImage
                            src={row[classImageField]}
                            alt={row.class || ""}
                            onError={(e) =>
                              (e.currentTarget.style.display = "none")
                            }
                          />
                        ) : null}
                        <AvatarFallback className="bg-purple-100 text-purple-700">
                          {row.class ? getInitials(row.class) : "NA"}
                        </AvatarFallback>
                      </Avatar>

                      {getClassLink ? (
                        <Link
                          href={getClassLink(row)}
                          className="font-medium text-gray-900 hover:underline"
                        >
                          {row.class}
                        </Link>
                      ) : (
                        <span className="font-medium text-gray-900">
                          {row.class}
                        </span>
                      )}
                    </div>
                  </TableCell>
                );
              }

              // ---------- USER COLUMN ----------
              if (key === "user") {
                return (
                  <TableCell key={header}>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        {row[imageField] ? (
                          <AvatarImage
                            src={row[imageField]}
                            alt={row.user || ""}
                            onError={(e) =>
                              (e.currentTarget.style.display = "none")
                            }
                          />
                        ) : null}
                        <AvatarFallback className="bg-blue-100 text-blue-700 ">
                          {row.user ? getInitials(row.user) : "NA"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium  text-[14px] text-gray-900">
                          {row.user}
                        </div>
                        {row.userName && (
                          <div className="text-gray-500 text-[14px]">
                            @{row.userName}
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                );
              }

              if (key === "class created") {
                return (
                  <TableCell key={header} className="text-gray-500 text-[14px]">
                    {row.createdAt}
                  </TableCell>
                );
              }
              // ---------- DEFAULT ----------
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
