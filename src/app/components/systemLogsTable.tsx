"use client";

import React from "react";
import Image from "next/image";
import DateRangeToolbar from "./DateRangeToolbar";

const logsData = [
  {
    id: 1,
    employee: {
      name: "John Doe",
      image: "/assets/DummyImg.png",
    },
    logTitle: "Logged into the system",
    logTime: "10:15 AM",
    date: "2024-11-20",
  },
  {
    id: 2,
    employee: {
      name: "Jane Smith",
      image: "/assets/DummyImg.png",
    },
    logTitle: "Updated project details",
    logTime: "2:45 PM",
    date: "2024-11-20",
  },
  {
    id: 3,
    employee: {
      name: "Alice Johnson",
      image: "/assets/DummyImg.png",
    },
    logTitle: "Created a new report",
    logTime: "11:30 AM",
    date: "2024-11-19",
  },
];

const SystemLogsTable = () => {
  return (
    <div className="overflow-auto w-full">
      <DateRangeToolbar />
      <div className="w-full text-center justify-center text-sm">
        {/* Header */}
        <div className="text-lg bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] text-white flex">
          <div className="flex-1 px-4 py-3 whitespace-nowrap">Employees</div>
          <div className="flex-1 px-4 py-3 whitespace-nowrap">Log Title</div>
          <div className="flex-1 px-4 py-3 whitespace-nowrap">Log Time</div>
          <div className="flex-1 px-4 py-3 whitespace-nowrap">Date</div>
        </div>
        {/* Logs Data */}
        <React.Fragment>
          {logsData.map((log) => (
            <div
              key={log.id}
              className="flex items-center text-center px-4 py-3 hover:bg-gray-100"
            >
              {/* Employee Column */}
              <div className="flex-1 flex items-center justify-center space-x-2">
                <Image
                  src={log.employee.image}
                  alt={log.employee.name}
                  width={1000}
                  height={1000}
                  className="w-10 h-10 rounded-full"
                />
                <span>{log.employee.name}</span>
              </div>
              {/* Log Title Column */}
              <div className="flex-1">{log.logTitle}</div>
              {/* Log Time Column */}
              <div className="flex-1">{log.logTime}</div>
              {/* Date Column */}
              <div className="flex-1">{log.date}</div>
            </div>
          ))}
        </React.Fragment>
      </div>
    </div>
  );
};

export default SystemLogsTable;
