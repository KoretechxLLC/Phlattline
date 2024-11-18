"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/app/components/Card";
import { Avatar, AvatarImage } from "@/app/components/avatar";
import { Button } from "./button-sidebar";

const EmployeeCourseInfo: React.FC = () => {
  // Static array of employee data
  const employeeData = [
    {
      image: "/assets/UserProfile.png",
      name: "John Doe",
      course: "React Basics",
      accuracy: "85%",
    },
    {
      image: "/assets/UserProfile.png",
      name: "Jane Smith",
      course: "Advanced CSS",
      accuracy: "92%",
    },
    {
      image: "/assets/UserProfile.png",
      name: "Alice Johnson",
      course: "UI/UX Design",
      accuracy: "78%",
    },
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Centered Heading */}
      <Card className="border border-gray-500 rounded-xl w-full max-w-3xl">
        <CardHeader>
          <h2 className="text-2xl items-center font-semibold mb-3">
            Employee Performance
          </h2>
          {/* Label Bar for Columns */}
          <div className="flex justify-between px-8 py-3 text-white bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80] text-sm font-medium">
            <span>Employees</span>
            <span>Courses</span>
            <span>Accuracy</span>
            <span>Action</span>
          </div>
        </CardHeader>
        <ul>
          {employeeData.map((employee, index) => (
            <li
              key={index}
              className={`${
                index < employeeData.length - 1
                  ? "border-b border-gray-300"
                  : ""
              }`}
            >
              <CardContent className="flex items-center justify-between px-8 py-8 space-x-2">
                {/* Employees (Name and Avatar) */}
                <div className="flex items-center space-x-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={employee.image}
                      alt={`${employee.name}-avatar`}
                      className="w-10 h-10"
                    />
                  </Avatar>
                  <span className="font-semibold text-sm">{employee.name}</span>
                </div>

                {/* Courses */}
                <div className="text-center text-sm text-yellow-400">
                  {employee.course}
                </div>

                {/* Accuracy */}
                <div className="text-center text-sm text-green-500">
                  {employee.accuracy}
                </div>

                {/* Action */}
                <div>
                  <Button
                    color="primary"
                    className="rounded-3xl"
                    onClick={() => alert(`Details for ${employee.name}`)}
                  >
                    View
                  </Button>
                </div>
              </CardContent>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default EmployeeCourseInfo;
