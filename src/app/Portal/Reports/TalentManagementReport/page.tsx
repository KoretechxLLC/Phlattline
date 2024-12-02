"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";
import { Progress } from "@/app/components/progress";

const riskEmployees = [
  {
    image: "/assets/UserProfile.png",
    name: "John Doe",
    designation: "Software Engineer",
  },
  {
    image: "/assets/UserProfile.png",
    name: "Jane Smith",
    designation: "Product Manager",
  },
  {
    image: "/assets/UserProfile.png",
    name: "Alice Johnson",
    designation: "Team Lead",
  },
];
import SuccessionPlanningTab from "@/app/components/successionPlanning";

import EmployeesTab from "@/app/components/employeesTab";
import EmployeesCountChart from "@/app/components/employeesCountChart";

const TalentManagementReport = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Row for Employees and Gender Ratio */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Employees Card */}
        <Card className="border border-[#62626280] w-full rounded-xl">
          <CardHeader className="rounded-xl bg-gradient-to-b from-[#B50D34] to-[#BAA716] text-white">
            <CardTitle className="justify-center mx-4 items-center">
              Employees
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h1 className="text-3xl font-bold text-center my-5">115</h1>
          </CardContent>
        </Card>

        {/* Gender Ratio Card */}
        <div className="border border-[#62626280] rounded-3xl ">
          <CardHeader className="rounded-3xl bg-gradient-to-b from-[#62626280] to-[#2D2C2C80]">
            <CardTitle>Performance Reviews</CardTitle>
          </CardHeader>
          <ul className="space-y-2 p-5">
            <li className="flex items-center justify-between">
              <span>Male</span>
              <Progress
                value={100}
                color="warning"
                size="md"
                className="flex-1 ml-4"
              />
            </li>
            <li className="flex items-center justify-between">
              <span>Female</span>
              <Progress
                value={12}
                color="info"
                size="md"
                className="flex-1 ml-4"
              />
            </li>
          </ul>
        </div>
      </div>

      {/* Open Position Chart */}
      <div>
        <EmployeesCountChart />
      </div>

      {/* Succession Planning Tab */}
      <div>
        <SuccessionPlanningTab maxEmployeesToShow={3} />
      </div>

      {/* High Potential Tab */}
      <div>
        <EmployeesTab title="Employees At Risk" employees={riskEmployees} />
      </div>
    </div>
  );
};

export default TalentManagementReport;
