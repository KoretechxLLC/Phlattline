"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";
import IssuesTracker from "@/app/components/IssuesTracker";
import TaskMonitoring from "@/app/components/taskMonitoring";
import IndividualReportChecker from "@/app/components/individualReportChecker";
import CoursesAssigner from "@/app/components/coursesAssigner";
import Workshops from "@/app/components/workshops";

const ManagingChange = () => {
  return (
    <div className="grid grid-cols-1 gap-3 max-h-[120vh] min-h-[40vh]">
      {/* Top Row: Individual Report Checker and Courses Assigner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <IndividualReportChecker />
        </div>
        <div>
          <CoursesAssigner />
        </div>
      </div>

      {/* Second Row: Task Monitoring */}
      <div className="flex space-x-2">
        <TaskMonitoring />
      </div>

      {/* Third Row: Issues Reported and Workshops */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
          <Workshops />
        </div>
      </div>
    </div>
  );
};

export default ManagingChange;
