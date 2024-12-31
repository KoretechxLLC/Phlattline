"use client";
import React from "react";
import AssessmentResultPie from "@/app/components/AssessmentsResultPie";
import IssuesTracker from "@/app/components/IssuesTracker";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";

import InitialAssessmentsReport from "@/app/components/InitialAssessmentsReport";
import AssessmentsReport from "@/app/components/InitialAssessmentsReport";
import PreviousResultsTracker from "@/app/components/PreviousResultsTracker";

const AssessmentReport = () => {
  const { userData } = useSelector((state: RootState) => state.auth);
  const userType = userData?.user_type_id;
  return (
    <div>
      <div style={{ display: userType === 2 ? "block" : "none" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-h-[120vh] min-h-[38vh]">
          <Card className="border-[1px] border-[#62626280] rounded-3xl ">
            <CardHeader className="h-30 rounded-3xl">
              <div className="text-sm my-1 flex justify-between">
                <CardTitle>Open Issues by Organization</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-2">
              <AssessmentsReport />
            </CardContent>
          </Card>

          <Card className="border-[1px] border-[#62626280] rounded-3xl  bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80] h-full">
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

          <Card className="border-[1px] border-[#62626280] bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80] rounded-3xl ">
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
      </div>
      <div style={{ display: userType === 3 ? "block" : "none" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-h-[120vh] min-h-[38vh]">
          <Card className="border-[1px] border-[#62626280] rounded-3xl ">
            <CardHeader className="h-30 rounded-3xl">
              <div className="text-sm my-1 flex justify-between">
                <CardTitle>Previous Results</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-2">
              <AssessmentsReport />
            </CardContent>
          </Card>

          <Card className="border-[1px] border-[#62626280] bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80] rounded-3xl col-span-1 sm:col-span-2 lg:col-span-1 h-full">
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
      </div>

      <div style={{ display: userType === 1 ? "block" : "none" }}>
        <div className="flex w-full gap-3 max-h-[120vh] min-h-[38vh]">
          {/* First component taking full width on small screens and half on medium screens */}
          <Card className="border-[1px] border-gray-500 rounded-3xl w-[65%]">
            <CardHeader className="h-30 rounded-3xl">
              <div className="text-sm my-1 flex justify-between">
                <CardTitle>Previous Results</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-2">
              {/* <InitialAssessmentsReport /> */}
              <PreviousResultsTracker />
            </CardContent>
          </Card>
          {/* Second component taking full width on small screens and half on medium screens */}
          <Card className="border-[1px] border-gray-500 bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80] rounded-3xl h-full w-[35%]">
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
      </div>
    </div>
  );
};

export default AssessmentReport;
