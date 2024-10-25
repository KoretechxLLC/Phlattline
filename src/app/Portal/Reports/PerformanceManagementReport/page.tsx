"use client";
import React from "react";
import TasksTracker from "@/app/components/TasksTracker";
import IssuesTracker from "@/app/components/IssuesTracker";
import PersonalGoals from "@/app/components/PersonalGoalsTracker";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";
const PerformanceManagementReport = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <TasksTracker
        showPending={true}
        showCompleted={false}
        showSaved={false}
        showTooltip={false}
        label={"Goals"}
        isClickable={false}
      />

      <TasksTracker
        showPending={false}
        showCompleted={true}
        showSaved={false}
        showTooltip={false}
        label={"Goals"}
        isClickable={false}
      />

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

      <Card
        className="border border-gray-500 rounded-3xl shadow-md w-full h-full"
        style={{ fontFamily: "Sansation" }}
      >
        <CardHeader className="bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80] rounded-3xl">
          <CardTitle>Your Desired Job</CardTitle>
        </CardHeader>
        <CardContent className="my-16">
          <PersonalGoals
            goals={[
              { id: 1, goal: "Finance Officer" },
              { id: 2, goal: "Taxation" },
            ]}
            showAvatar={false}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceManagementReport;
