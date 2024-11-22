import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/app/components/Card";
import Spinner from "@/app/components/Spinner"; // Assuming you have a Spinner component

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

  const [loading, setLoading] = useState(true);

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Adjust loading time as necessary
    return () => clearTimeout(timer);
  }, []);

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

        <CardContent>
          {/* Loader or Job List */}
          {loading ? (
            <div className="flex justify-center items-center py-6">
              <Spinner height="30px" width="30px" />
            </div>
          ) : jobData.length === 0 ? (
            <div className="text-center py-6 text-gray-500">
              No Desired Jobs Found
            </div>
          ) : (
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
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeesDesiredJobTab;
