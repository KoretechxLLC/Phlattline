"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";
import IssuesTracker from "@/app/components/IssuesTracker";
import GoalsAchievedTracker from "@/app/components/goalsAchievedTracker";
import LeadersFeedback from "@/app/components/leadersFeedback";

const ProgramEvolutions = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[120vh] min-h-[40vh]">
      <Card className="border-[1px] border-gray-500 rounded-3xl h-full bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80]">
        <CardHeader className="h-16 rounded-3xl">
          <div className="text-sm flex justify-between">
            <CardTitle>Issues Reported</CardTitle>
            <CardTitle>124 Open Issues</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-2">
          <IssuesTracker />
        </CardContent>
      </Card>
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
        <LeadersFeedback />
      </div>
    </div>
  );
};

export default ProgramEvolutions;
