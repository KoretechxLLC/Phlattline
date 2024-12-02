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

const AssessmentResults = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[120vh] min-h-[40vh]">
      {/* First component taking full width on small screens and half on medium screens */}
      <Card className="border-[1px] border-[#62626280] rounded-3xl h-full">
        <CardHeader className="h-16 rounded-3xl">
          <div className="text-sm my-1 flex justify-between">
            <CardTitle>Previous Results</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-2 pt-10">
          <PreviousResultsTracker />
        </CardContent>
      </Card>

      {/* Second component taking full width on small screens and half on medium screens */}
      <Card className="border-[1px] border-[#62626280] bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80] rounded-3xl h-full">
        <CardHeader className="h-16 rounded-3xl">
          <div className="text-sm flex justify-between">
            <CardTitle>Assessment Results</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-2">
          <AssessmentResultPie />
        </CardContent>
      </Card>
    </div>
  );
};

export default AssessmentResults;
