"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";
import { Progress } from "./progress";

const EmployeeDataTab = () => {
  return (
    <div>
      <Card className="border border-[#62626280] rounded-3xl">
        <CardHeader className="mb-2 rounded-3xl bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80]">
          <CardTitle>Employee Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 4xl:p-2">
            {/* First Row */}
            <Card className="border border-[#62626280] 4xl:w-44 w-52 rounded-xl">
              <CardHeader className="rounded-xl bg-gradient-to-b from-[#B50D34] to-[#BAA716] text-white">
                <CardTitle className="justify-center mx-4 items-center">
                  Employees
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h1 className="text-3xl font-bold mx-14 4xl:mx-16 my-5">115</h1>
              </CardContent>
            </Card>

            <div className="border border-[#62626280] rounded-lg p-8">
              <h2 className="font-semibold mb-2">Gender Ratio</h2>
              <ul className="w-full">
                <li className="flex-1 items-center justify-between">
                  <span>
                    Male <Progress value={100} color={"warning"} size="md" />
                  </span>
                </li>
                <li className="flex-1 items-center justify-between mt-2">
                  <span>
                    Female
                    <Progress value={12} color={"info"} size="md" />
                  </span>
                </li>
              </ul>
            </div>

            {/* Second Row */}
            <div className="md:col-span-2 border border-[#62626280] rounded-lg p-2 mb-2 ">
              <h2 className="font-semibold mb-1">Age Groups</h2>
              <ul>
                <li className="flex-1 items-center justify-between">
                  <span>
                    20-30
                    <Progress value={45} color={"success"} size="sm" />
                  </span>
                </li>
                <li className="flex-1 items-center justify-between mt-2">
                  <span>
                    31-40
                    <Progress value={30} color={"info"} size="sm" />
                  </span>
                </li>
                <li className="flex-1 items-center justify-between mt-2">
                  <span>
                    41-60
                    <Progress value={10} color={"warning"} size="sm" />
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeDataTab;
