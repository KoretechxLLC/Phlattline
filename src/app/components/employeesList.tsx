"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";
import { Avatar, AvatarImage } from "@/app/components/avatar";
import { Button } from "./button-sidebar";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

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

  const handleNextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  

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
              <CardContent className="flex items-center 4xl:text-xs justify-between space-x-4 4xl:p-2 p-4 my-0.5">
                <div className="flex items-center space-x-4">
                  <Avatar className="4xl:w-8 4xl:h-8 w-10 h-10">
                    <AvatarImage
                      src={employee.image}
                      alt={`${employee.name}-avatar`}
                      className="4xl:w-8 4xl:h-8 w-10 h-10"
                    />
                  </Avatar>
                  <span className="font-semibold">{employee.name}</span>
                </div>

                <span className="text-yellow-400">{employee.designation}</span>

                <span className="text-gray-500 4xl:text-xs">
                  {activeTab === "current" ? (
                    `Joined: ${employee.hireDate}`
                  ) : (
                    <>{employee.leaveDate && ` Left: ${employee.leaveDate}`}</>
                  )}
                </span>
              </CardContent>
            </li>
          ))}
          <div className="flex items-center justify-center gap-2 py-4">
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8 border-transparent hover:bg-transparent"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-5 h-5 text-default-900" />
            </Button>
            <span className="text-sm font-medium text-default-900">
              Page {currentPage} of {totalPage}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8 border-transparent hover:bg-transparent"
              onClick={handleNextPage}
              disabled={currentPage >= totalPage}
            >
              <ChevronRight className="w-5 h-5 text-default-900" />
            </Button>
          </div>
        </ul>
      </Card>
    </div>
  );
};

export default EmployeesListTab;
