"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock } from "lucide-react";
import React from "react";
import Image from "next/image";
import { EventRow } from "@/app/(dashboard)/event/page";

export interface EventModalProps {
  row: EventRow;
}

const getInitials = (text: string) =>
  text
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();

const EventModal: React.FC<EventModalProps> = ({ row }) => {
  return (
    <>
      {/* Header Section */}
      <div className="p-4 pb-2">
        <div className="flex items-center justify-between ">
          <span className="text-xs text-muted-foreground">Created By</span>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Class:</div>
            <div className="font-semibold text-base">{row.event}</div>
          </div>
        </div>

        <div className="flex items-center gap-2 ">
          <Avatar className="h-8 w-8">
            {row.image ? (
              <AvatarImage
                src={row.image}
                alt={row.user}
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            ) : null}
            <AvatarFallback>{getInitials(row.user)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-sm">{row.user}</div>
            <div className="text-xs text-muted-foreground">@{row.userName}</div>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="px-4 ">
        <div className="relative h-28 bg-gradient-to-r from-cyan-200 to-blue-200 rounded-md overflow-hidden">
          {row.eventImage ? (
            <Image
              width={400}
              height={200}
              src={row.eventImage}
              alt={row.event}
              className="w-full h-full object-cover"
            />
          ) : null}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-4">
        <h2 className="text-lg font-semibold mb-2">{row.event}</h2>

        <p className="text-xs text-muted-foreground mb-4 leading-snug">
          {row.description}
        </p>

        {/* Event Date */}
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-3.5 w-3.5 text-cyan-500" />
            <span className="font-medium text-cyan-500 text-sm">
              Event Date
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="text-[11px] text-muted-foreground mb-1">
                Starting
              </div>
              <div className="bg-muted rounded-md p-2 text-center text-[#3F5972] font-medium">
                {row.start_date}
              </div>
            </div>
            <div>
              <div className="text-[11px] text-muted-foreground mb-1">
                Ending
              </div>
              <div className="bg-muted rounded-md p-2 text-center text-[#3F5972]  font-medium">
                {row.end_date}
              </div>
            </div>
          </div>
        </div>

        {/* Event Time */}
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-3.5 w-3.5 text-cyan-500" />
            <span className="font-medium text-cyan-500 text-sm">
              Event Time
            </span>
          </div>
          <div>
            <div className="text-[11px] text-muted-foreground mb-1">
              Starting-Ending
            </div>
            <div className="bg-muted text-[#3F5972] rounded-md p-2 text-center font-medium">
              {row.start_time} - {row.end_time}
            </div>
          </div>
        </div>

        {/* Days Remaining */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-muted-foreground">Days Remaining</span>
          <span className="text-red-500 text-sm font-medium">
            {row.days_remaining ?? "N/A"} Days left
          </span>
        </div>

        {/* Add to Calendar Button */}
        <Button className="w-full h-9 bg-cyan-400 hover:bg-cyan-500 text-white text-sm">
          <Calendar className="h-3.5 w-3.5 mr-1.5" />
          Add to calendar
        </Button>
      </div>
    </>
  );
};

export default EventModal;
