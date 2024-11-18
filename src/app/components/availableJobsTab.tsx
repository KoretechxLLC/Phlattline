"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";

import { Button } from "./button-sidebar";

const AvailableJobsTab: React.FC = () => {
  // Static array of coaching session data
  const coachingData = [
    {
      job_title: "Finance Officer",
    },
    {
      job_title: "Software Enginner",
    },
  ];

  return (
    <div>
      <Card className="border w-full border-gray-500 rounded-xl ">
        <CardHeader className="mb-1 bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80] rounded-xl">
          <CardTitle>Available Jobs</CardTitle>
        </CardHeader>
        <ul>
          {coachingData.map((coach, index) => (
            <li
              key={index}
              className={`${
                index < coachingData.length - 1
                  ? "border-b border-gray-300"
                  : ""
              }`}
            >
              <CardContent className="flex items-center my-1.5 space-x-4 p-5">
                <span className="font-semibold text-xl">{coach.job_title}</span>
              </CardContent>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default AvailableJobsTab;
