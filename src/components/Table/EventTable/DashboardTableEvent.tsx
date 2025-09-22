/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import EventModal from "./EventModal";
import { EventRow } from "@/app/(dashboard)/event/page";
import { DialogTitle } from "@radix-ui/react-dialog";

interface EventTableProps {
  headers: string[];
  data: EventRow[];
  eventImageField?: string;
  imageField?: string;
}

const getInitials = (text: string) =>
  text
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();

export const EventTable: React.FC<EventTableProps> = ({
  headers,
  data,
  eventImageField = "eventImage",
  imageField = "image",
}) => {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<EventRow | null>(null);

  const handleEventClick = (row: EventRow) => {
    setSelectedRow(row);
    setOpen(true);
  };

  return (
    <>
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
          {data.map((row, index) => {
            const rowId = row.id || index;
            return (
              <TableRow
                key={rowId}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                {headers.map((header) => {
                  const key = header.toLowerCase();
                  const value = (row as any)[key] || "";

                  // EVENT COLUMN
                  if (key === "event") {
                    return (
                      <TableCell key={header}>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            {(row as any)[eventImageField] ? (
                              <AvatarImage
                                src={(row as any)[eventImageField]}
                                alt={row.event || ""}
                                onError={(e) =>
                                  (e.currentTarget.style.display = "none")
                                }
                              />
                            ) : null}
                            <AvatarFallback className="bg-green-100 text-green-700">
                              {row.event ? getInitials(row.event) : "NA"}
                            </AvatarFallback>
                          </Avatar>

                          <span
                            onClick={() => handleEventClick(row)}
                            className="font-medium text-gray-900 hover:underline cursor-pointer"
                          >
                            {row.event}
                          </span>
                        </div>
                      </TableCell>
                    );
                  }

                  // USER COLUMN
                  if (key === "created by") {
                    return (
                      <TableCell key={header}>
                        <div className="flex gap-3 items-center ">
                          <Avatar className="h-8 w-8">
                            {(row as any)[imageField] ? (
                              <AvatarImage
                                src={(row as any)[imageField]}
                                alt={row.user || ""}
                                onError={(e) =>
                                  (e.currentTarget.style.display = "none")
                                }
                              />
                            ) : null}
                            <AvatarFallback className="bg-blue-100 text-blue-700">
                              {row.user ? getInitials(row.user) : "NA"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-[14px] text-gray-900">
                              {row.user}
                            </div>
                            <div className="text-gray-500 text-[14px]">
                              @{row.userName}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                    );
                  }

                  if (key === "start date") {
                    return (
                      <TableCell key={header} className="text-gray-500">
                        {row.start_date}
                      </TableCell>
                    );
                  }
                  if (key === "end date") {
                    return (
                      <TableCell key={header} className=" text-gray-500">
                        {row.end_date}
                      </TableCell>
                    );
                  }

                  return (
                    <TableCell key={header} className="text-gray-900">
                      {value}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* ShadCN Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTitle></DialogTitle>
        <DialogContent
          aria-describedby={undefined}
          className="max-w-md  overflow-hidden "
        >
          {selectedRow && <EventModal row={selectedRow} />}
        </DialogContent>
      </Dialog>
    </>
  );
};
