"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";
import { Avatar, AvatarImage } from "@/app/components/avatar";

type SuccessionPlanningTabProps = {
  maxEmployeesToShow?: number; // New prop to control the number of employees to show
};

const SuccessionPlanningTab: React.FC<SuccessionPlanningTabProps> = ({
  maxEmployeesToShow = 5, // Default to showing all employees if not specified
}) => {
  // Static array of employees with their succession planning percentage
  const employeesData = [
    {
      image: "/assets/UserProfile.png",
      name: "John Doe",
      designation: "Software Engineer",
      completion: 15,
    },
    {
      image: "/assets/UserProfile.png",
      name: "Jane Smith",
      designation: "Product Manager",
      completion: 35,
    },
    {
      image: "/assets/UserProfile.png",
      name: "Alice Johnson",
      designation: "Team Lead",
      completion: 55,
    },
    {
      image: "/assets/UserProfile.png",
      name: "Bob Brown",
      designation: "Senior Developer",
      completion: 75,
    },
    {
      image: "/assets/UserProfile.png",
      name: "Carol White",
      designation: "Head of Product",
      completion: 90,
    },
  ];

  // Function to determine the color based on completion percentage
  const getCompletionColor = (completion: number) => {
    if (completion >= 0 && completion <= 20)
      return "text-red-500 border-red-500";
    if (completion > 20 && completion <= 40)
      return "text-orange-500 border-orange-500";
    if (completion > 40 && completion <= 60)
      return "text-yellow-400 border-yellow-400";
    if (completion > 60 && completion <= 80)
      return "text-green-400 border-green-400";
    if (completion > 80 && completion <= 100)
      return "text-green-600 border-green-600";
    return "";
  };

  // Limit the number of employees displayed based on the prop
  const displayedEmployees = employeesData.slice(0, maxEmployeesToShow);

  return (
    <div>
      <Card className="border w-full border-[#62626280] rounded-xl">
        <CardHeader className="mb-2 bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80] rounded-xl">
          <CardTitle>Succession Planning</CardTitle>
        </CardHeader>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 p-2">
          {displayedEmployees.map((employee, index) => (
            <li
              key={index}
              className="border border-[#62626280] rounded-lg p-4"
            >
              <CardContent className="flex justify-between items-center space-x-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src={employee.image}
                    alt={`${employee.name}-avatar`}
                    className="w-10 h-10"
                  />
                </Avatar>
                <div>
                  <span className="font-semibold">{employee.name}</span>
                  <span className="text-gray-400 block">
                    {employee.designation}
                  </span>
                </div>
                {/* Circular percentage display with color-coordinated border */}
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border font-semibold ${getCompletionColor(
                    employee.completion
                  )}`}
                >
                  {employee.completion}%
                </div>
              </CardContent>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default SuccessionPlanningTab;
