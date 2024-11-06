"use client";
import React from "react";
import AssessmentResultPie from "@/app/components/AssessmentsResultPie";
import IssuesTracker from "@/app/components/IssuesTracker";
import PreviousResultsTracker from "@/app/components/PreviousResultsTracker";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";

const AssessmentReport = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[120vh] min-h-[40vh]">
      {/* First two components in one row */}
      <Card className="border-[1px] border-gray-500 bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80] rounded-3xl h-full">
        <CardHeader className="h-16 rounded-3xl">
          <CardTitle>Assessment Results</CardTitle>
          <CardTitle>115 Total</CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <AssessmentResultPie />
        </CardContent>
      </Card>

      {/* <Card className="border-[1px] border-gray-500 rounded-3xl h-full bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80]">
        <CardHeader className="h-16 rounded-3xl">
          <div className="text-sm flex justify-between">
            <CardTitle>Issues Reported</CardTitle>
            <CardTitle>124 Open Issues</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-2">
          <IssuesTracker />
        </CardContent>
      </Card> */}

      {/* The third component in the next row */}
      <div className="md:col-span-2">
        <Card className="border-[1px] border-gray-500 rounded-3xl h-full">
          <CardHeader className="h-16 rounded-3xl">
            <div className="text-sm my-1 flex justify-between">
              <CardTitle>Previous Results</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-2">
            <PreviousResultsTracker />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AssessmentReport;
