"use client";
import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/tooltip";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, SquarePen, Trash2 } from "lucide-react";

import { Button } from "@/app/components/button-sidebar";
import { Checkbox } from "@/app/components/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/avatar";

export type DataProps = {
  id: string | number;
  persons: {
    name: string; // Person's name
    image: string; // Person's image URL
  };
  logTitle: string; // Title of the log
  logTime: string; // Time of the log (e.g., "10:00 AM")
  date: string; // Date of the log (e.g., "2024-11-19")
};

export const columns: ColumnDef<DataProps>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <div className="xl:w-16">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "persons",
    header: "Persons",
    cell: ({ row }) => {
      const person = row.original.persons;
      return (
        <div className="flex gap-3 items-center">
          <span className="text-sm text-default-600 whitespace-nowrap">
            {person?.name ?? "Unknown"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "logTitle",
    header: "Log Title",
    cell: ({ row }) => <span>{row.getValue("logTitle")}</span>,
  },
  {
    accessorKey: "logTime",
    header: "Log Time",
    cell: ({ row }) => <span>{row.getValue("logTime")}</span>,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <span>{row.getValue("date")}</span>,
  },
];
