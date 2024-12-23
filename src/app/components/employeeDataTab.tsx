"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";
import ProgressBar from "@ramonak/react-progress-bar";
import Icon from "./utility-icon";

const EmployeeDataTab = () => {
  return (
    <div>
      <Card className="border border-[#62626280] rounded-3xl">
        <CardHeader className="mb-2 rounded-3xl bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80]">
          <CardTitle>Employee Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
            {/* First Row */}
            <div className="mx-24">
              <Card className="border border-[#62626280] 4xl:w-44 w-52 rounded-xl">
                <CardHeader className="rounded-xl bg-gradient-to-b from-[#B50D34] to-[#BAA716] text-white">
                  <CardTitle className="justify-center mx-4 items-center">
                    Employees
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <h1 className="text-3xl font-bold mx-14 4xl:mx-16 my-10">
                    115
                  </h1>
                </CardContent>
              </Card>
            </div>

            {/* Gender Ratio */}
            <div className="border border-[#62626280] rounded-lg p-8">
              <h2 className="font-semibold mb-2">Gender Ratio</h2>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 w-full">
                  <Icon
                    icon="ic:round-male"
                    className="text-3xl text-blue-600"
                  />
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
            </div>

            {/* Age Groups */}
            <div className="md:col-span-2 border border-[#62626280] rounded-lg p-2 mb-2">
              <h2 className="font-semibold mb-1">Age Groups</h2>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 w-full">
                  <span>20-30</span>
                  <div className="flex-grow">
                    <ProgressBar
                      completed={80}
                      bgColor="#33FF00"
                      baseBgColor="#e0e0e0"
                      isLabelVisible={false}
                      height="10px"
                      width="100%"
                    />
                  </div>
                  <span className="text-[#33FF00]">100%</span>
                </div>
                <div className="flex items-center gap-4 w-full">
                  <span>31-40</span>
                  <div className="flex-grow">
                    <ProgressBar
                      completed={30}
                      bgColor="#FDF53F"
                      baseBgColor="#e0e0e0"
                      isLabelVisible={false}
                      height="10px"
                      width="100%"
                    />
                  </div>
                  <span className="text-[#FDF53F]">30%</span>
                </div>
                <div className="flex items-center gap-4 w-full">
                  <span>41-60</span>
                  <div className="flex-grow">
                    <ProgressBar
                      completed={30}
                      bgColor="#FF0700"
                      baseBgColor="#e0e0e0"
                      isLabelVisible={false}
                      height="10px"
                      width="100%"
                    />
                  </div>
                  <span className="text-[#FF0700]">30%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeDataTab;
