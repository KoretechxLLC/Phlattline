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
import AssessmentsReport from "@/app/components/InitialAssessmentsReport";

const AssessmentReport = () => {
  return (
    <div className="flex w-full gap-3 max-h-[120vh] min-h-[38vh]">
      {/* First component taking full width on small screens and half on medium screens */}
      <Card className="border-[1px] border-gray-500 rounded-3xl w-[60%]">
        <CardHeader className="h-30 rounded-3xl">
          <div className="text-sm my-1 flex justify-between">
            <CardTitle>Previous Results</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-2">
          <AssessmentsReport />
        </CardContent>
      </Card>

      {/* Second component taking full width on small screens and half on medium screens */}
      <Card className="border-[1px] border-gray-500 bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80] rounded-3xl h-full w-[40%]">
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

export default AssessmentReport;
