"use client";
import React from "react";
import AssessmentResultPie from "@/app/components/AssessmentsResultPie";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";

import InterviewTab from "@/app/components/interviewsTab";
import PerformanceReviews from "@/app/components/performanceReviewsTab";

const DataCollection = () => {
  // Static array of interview data
  const interviewData = [
    {
      image: "/images/avatar1.jpg",
      name: "John Doe",
      designation: "Software Engineer",
      interviewStatus: "Pending",
    },
    {
      image: "/images/avatar2.jpg",
      name: "Jane Smith",
      designation: "Product Manager",
      interviewStatus: "Completed",
    },
    {
      image: "/images/avatar3.jpg",
      name: "Alice Johnson",
      designation: "UI/UX Designer",
      interviewStatus: "Scheduled",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div>
        <Card className="border-[1px] border-[#62626280] bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80] rounded-3xl h-full">
          <CardHeader className="h-16 rounded-3xl">
            <CardTitle>Assessment Results</CardTitle>
            <CardTitle>115 Total</CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <AssessmentResultPie />
          </CardContent>
        </Card>
      </div>

      <div>
        <InterviewTab />
      </div>

      <Card className="col-span-1 md:col-span-2 border-[1px] border-[#62626280] rounded-3xl  h-full">
        <CardHeader className="h-16 rounded-3xl bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80] ">
          <CardTitle>Performance Reviews</CardTitle>
        </CardHeader>
        <PerformanceReviews />
      </Card>
    </div>
  );
};

export default DataCollection;
