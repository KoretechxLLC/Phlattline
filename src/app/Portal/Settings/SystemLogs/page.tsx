"use client";

import * as React from "react";
import Image from "next/image";
import DateRangeToolbar from "@/app/components/DateRangeToolbar";

const logsData = [
  {
    id: 1,
    employee: {
      name: "John Doe",
      image: "/assets/UserProfile.png",
    },
    logTitle: "Logged into the system",
    logTime: "10:15 AM",
    date: "2024-11-20",
  },
  {
    id: 2,
    employee: {
      name: "Jane Smith",
      image: "/assets/UserProfile.png",
    },
    logTitle: "Updated project details",
    logTime: "2:45 PM",
    date: "2024-11-20",
  },
  {
    id: 3,
    employee: {
      name: "Alice Johnson",
      image: "/assets/UserProfile.png",
    },
    logTitle: "Created a new report",
    logTime: "11:30 AM",
    date: "2024-11-19",
  },
];

const SystemLogs = () => {
  return (
    <div className="overflow-auto w-full space-y-3 border border-gray-500 p-3 ">
      <DateRangeToolbar />
      <table className="table-auto w-full text-center text-lg ">
        <thead>
          <tr className="bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80] text-white">
            <th className="px-4 py-2  ">Employees</th>
            <th className="px-4 py-2  ">Log Title</th>
            <th className="px-4 py-2  ">Log Time</th>
            <th className="px-4 py-2 ">Date</th>
          </tr>
        </thead>
        <tbody>
          {logsData.map((log) => (
            <tr key={log.id}>
              <td className="px-4 py-2 border border-gray-500">
                <div className="flex items-center space-x-2">
                  <Image
                    src={log.employee.image}
                    alt={log.employee.name}
                    width={1000}
                    height={1000}
                    className="w-10 h-10 rounded-full"
                  />
                  <span>{log.employee.name}</span>
                </div>
              </td>
              <td className="px-4 py-2 border border-gray-500">
                {log.logTitle}
              </td>
              <td className="px-4 py-2 border border-gray-500">
                {log.logTime}
              </td>
              <td className="px-4 py-2 border border-gray-500">{log.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SystemLogs;
