import React from "react";
import { Card, CardContent, CardHeader } from "@/app/components/Card";

const EmployeesDesiredJobTab: React.FC = () => {
  // Static array of job data
  const jobData = [
    {
      jobTitle: "Software Engineer",
      employeeCount: 45,
    },
    {
      jobTitle: "Product Manager",
      employeeCount: 30,
    },
    {
      jobTitle: "UI/UX Designer",
      employeeCount: 25,
    },
    {
      jobTitle: "Data Scientist",
      employeeCount: 15,
    },
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Centered Heading */}
      <Card className="border border-gray-500 rounded-xl w-full max-w-3xl">
        <CardHeader>
          <h2 className="text-2xl items-center font-semibold mb-3">
            Employees Desired Jobs
          </h2>
          {/* Label Bar for Columns */}
          <div className="flex justify-between px-8 py-3 text-white bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80] text-sm font-medium">
            <span className="w-1/2 text-left">Job Title</span>
            <span className="w-1/2 text-right">No. of Employees</span>
          </div>
        </CardHeader>
        <ul>
          {jobData.map((job, index) => (
            <li
              key={index}
              className={`${
                index < jobData.length - 1 ? "border-b border-gray-500" : ""
              }`}
            >
              <CardContent className="flex items-center justify-between px-8 py-5">
                {/* Job Title */}
                <div className="w-1/2 text-left text-sm font-semibold">
                  {job.jobTitle}
                </div>

                {/* Employee Count */}
                <div className="w-1/2 text-right text-sm">
                  {job.employeeCount}
                </div>
              </CardContent>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default EmployeesDesiredJobTab;
