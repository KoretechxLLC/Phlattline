"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";
import { Avatar, AvatarImage } from "@/app/components/avatar";
import { Button } from "./button-sidebar";

// Define a type that includes both current and left employee properties
type Employee = {
  image: string;
  name: string;
  designation: string;
  hireDate: string;
  leaveDate?: string; // Optional property
};

const EmployeesListTab: React.FC = () => {
  // State to track which tab is active
  const [activeTab, setActiveTab] = useState<"current" | "left">("current");

  // Static arrays for current and left employees
  const currentEmployees: Employee[] = [
    {
      image: "/assets/DummyImg.png",
      name: "John Doe",
      designation: "Software Engineer",
      hireDate: "2021-03-15",
    },
    {
      image: "/assets/DummyImg.png",
      name: "Jane Smith",
      designation: "Product Manager",
      hireDate: "2022-01-20",
    },
    {
      image: "/assets/DummyImg.png",
      name: "John Doe",
      designation: "Software Engineer",
      hireDate: "2021-03-15",
    },
    {
      image: "/assets/DummyImg.png",
      name: "Jane Smith",
      designation: "Product Manager",
      hireDate: "2022-01-20",
    },
  ];

  const leftEmployees: Employee[] = [
    {
      image: "/assets/DummyImg.png",
      name: "Alice Johnson",
      designation: "UI/UX Designer",
      hireDate: "2019-06-10",
      leaveDate: "2023-07-15",
    },
    {
      image: "/assets/DummyImg.png",
      name: "Bob Brown",
      designation: "Data Analyst",
      hireDate: "2020-05-25",
      leaveDate: "2022-11-30",
    },
    {
      image: "/assets/DummyImg.png",
      name: "Bob Brown",
      designation: "Data Analyst",
      hireDate: "2020-05-25",
      leaveDate: "2022-11-30",
    },
    {
      image: "/assets/DummyImg.png",
      name: "Bob Brown",
      designation: "Data Analyst",
      hireDate: "2020-05-25",
      leaveDate: "2022-11-30",
    },
  ];

  // Toggle data based on the active tab
  const displayedEmployees =
    activeTab === "current" ? currentEmployees : leftEmployees;

  return (
    <div>
      {/* Tab Buttons */}
      <div className="flex gap-4 md:gap-4 justify-start md:justify-start w-full mb-1">
        <button
          className={`text-xs sm:text-xs w-full h-12 rounded-tl-3xl rounded-tr-3xl ${
            activeTab === "current"
              ? "bg-gradient-to-b from-[#B50D34] to-[#BAA716] text-white"
              : "text-default-600"
          }`}
          onClick={() => setActiveTab("current")}
        >
          Current Employees
        </button>
        <button
          className={`text-xs sm:text-xs w-full h-12 rounded-tl-3xl rounded-tr-3xl ${
            activeTab === "left"
              ? "bg-gradient-to-b from-[#B50D34] to-[#BAA716] text-white"
              : "text-default-600"
          }`}
          onClick={() => setActiveTab("left")}
        >
          Left Employees
        </button>
      </div>

      {/* Card Displaying Employee Data */}
      <Card className="border border-[#62626280] bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80] rounded-b-3xl w-full">
        <CardHeader className="mb-2">
          <CardTitle>
            {activeTab === "current" ? "Current Employees" : "Left Employees"}
          </CardTitle>
        </CardHeader>
        <ul>
          {displayedEmployees.map((employee, index) => (
            <li
              key={index}
              className={`${
                index < displayedEmployees.length - 1
                  ? "border-b border-gray-500"
                  : ""
              }`}
            >
              <CardContent className="flex items-center justify-between space-x-4 p-4 my-0.5">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={employee.image}
                      alt={`${employee.name}-avatar`}
                      className="w-10 h-10"
                    />
                  </Avatar>
                  <span className="font-semibold">{employee.name}</span>
                </div>

                <span className="text-yellow-400">{employee.designation}</span>

                <span className="text-gray-500 text-sm">
                  {activeTab === "current" ? (
                    `Joined: ${employee.hireDate}`
                  ) : (
                    <>{employee.leaveDate && ` Left: ${employee.leaveDate}`}</>
                  )}
                </span>
              </CardContent>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default EmployeesListTab;
