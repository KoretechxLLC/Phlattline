"use client";
import React from "react";
import TasksTracker from "@/app/components/TasksTracker";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import EmpRating from "@/app/components/emprating";
import VacantJobs from "../../../components/VacantJobs";
import PerformanceReviews from "@/app/components/performanceReviewsTab";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";
import IssuesTracker from "@/app/components/IssuesTracker";
import PerformanceDeptsChart from "@/app/components/performanceDeptCharts";

const PerformanceManagementReport = () => {
  const { userData } = useSelector((state: RootState) => state.auth);
  const userType = userData?.user_type_id;

  const jobs = [
    { id: 1, title: "Finance Officer" },
    { id: 2, title: "Taxation" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {(userType === 1 || userType === 3) && (
        <>
          <div className="flex-1">
            <TasksTracker
              showPending={true}
              showCompleted={false}
              showSaved={false}
              showTooltip={false}
              label={"Goals"}
              isClickable={false}
            />
          </div>

          {/* Completed Goals */}
          <div className="flex-1">
            <TasksTracker
              showPending={false}
              showCompleted={true}
              showSaved={false}
              showTooltip={false}
              label={"Goals"}
              isClickable={false}
            />
          </div>

          {userType === 3 && (
            <div className="flex-1">
              <EmpRating />
            </div>
          )}

          <div className="md:col-span-1">
            <VacantJobs jobs={jobs} />
          </div>
        </>
      )}

      {userType === 2 && (
        <>
          <div className="col-span-1 md:col-span-2 border border-[#62626280] rounded-3xl">
            <CardHeader className="h-16 rounded-3xl bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80] ">
              <CardTitle>Performance Reviews</CardTitle>
            </CardHeader>
            <PerformanceReviews />
          </div>

          <div>
            <Card className="border-[1px] border-[#62626280] rounded-3xl h-full bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80]">
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
          </div>

          <div>
            <PerformanceDeptsChart />
          </div>
        </>
      )}
    </div>
  );
};

export default PerformanceManagementReport;
