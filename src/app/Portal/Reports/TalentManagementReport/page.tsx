"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";

const riskEmployees = [
  {
    image: "/assets/DummyImg.png",
    name: "John Doe",
    designation: "Software Engineer",
  },
  {
    image: "/assets/DummyImg.png",
    name: "Jane Smith",
    designation: "Product Manager",
  },
  {
    image: "/assets/DummyImg.png",
    name: "Alice Johnson",
    designation: "Team Lead",
  },
];

import SuccessionPlanningTab from "@/app/components/successionPlanning";
import EmployeesTab from "@/app/components/employeesTab";
import EmployeesCountChart from "@/app/components/employeesCountChart";
import Icon from "@/app/components/utility-icon";
import ProgressBar from "@ramonak/react-progress-bar";

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
        <div className="border border-[#62626280] rounded-3xl">
          <CardHeader className="rounded-3xl bg-gradient-to-b from-[#62626280] to-[#2D2C2C80]">
            <CardTitle>Gender Ratio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 p-2">
              <div className="flex items-center gap-4 w-full">
                <Icon icon="ic:round-male" className="text-3xl text-blue-600" />
                <span>Male</span>
                <div className="flex-grow">
                  <ProgressBar
                    completed={50}
                    bgColor="#FDF53F"
                    baseBgColor="#e0e0e0"
                    isLabelVisible={false}
                    height="10px"
                    width="100%"
                  />
                </div>
                <span>86</span>
              </div>
              <div className="flex items-center gap-4 w-full">
                <Icon
                  icon="mingcute:female-line"
                  className="text-3xl text-pink-500"
                />
                <span>Female</span>
                <div className="flex-grow">
                  <ProgressBar
                    completed={50}
                    bgColor="#FF0700"
                    baseBgColor="#e0e0e0"
                    isLabelVisible={false}
                    height="10px"
                    width="100%"
                  />
                </div>
                <span>56</span>
              </div>
            </div>
          </CardContent>
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
