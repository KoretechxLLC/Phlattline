"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";
import AssessmentResultPie from "@/app/components/AssessmentsResultPie";
import GoalsAchievedTracker from "@/app/components/goalsAchievedTracker";
import AsessmentTracker from "@/app/components/AssesmentsTracker";

const ODaasReport = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div>
        <Card className="border-[1px] border-gray-500 bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] rounded-3xl h-full">
          <CardHeader className="h-16 rounded-3xl">
            <CardTitle>Assessment Results</CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <AssessmentResultPie />
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="border border-[#62626280] rounded-3xl shadow-md w-full h-full">
          <CardHeader className="bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80] h-16 rounded-3xl">
            <CardTitle>Goals Achieved</CardTitle>
          </CardHeader>
          <CardContent>
            <GoalsAchievedTracker />
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="border-[1px] border-gray-500 rounded-3xl h-auto">
          <CardHeader className="h-16 rounded-3xl bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80]">
            <div className="text-sm 4xl:mb-12 mb-16 flex justify-between">
              <CardTitle>Open Issues</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="4xl:p-1 p-4">
            <AsessmentTracker />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ODaasReport;
