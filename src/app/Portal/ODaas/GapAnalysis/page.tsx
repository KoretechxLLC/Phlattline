"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";
import AsessmentTracker from "@/app/components/AssesmentsTracker";
import CoursesTab from "@/app/components/CoursesTab";
import WorkLoadBar from "@/app/components/workLoadCharts";

const GapAnalysis = () => {
  // Static array for CoursesTab data with numeric price
  const courses = [
    {
      id: 1,
      course_name: "Data Analysis Basics",
      description: "Learn the fundamentals of data analysis.",
      price: 99,
    },
    {
      id: 2,
      course_name: "Advanced Leadership",
      description: "Develop leadership skills for team management.",
      price: 149,
    },
    {
      id: 3,
      course_name: "Effective Communication",
      description: "Improve communication within your organization.",
      price: 89,
    },
  ];

  return (
    <div className="max-h-[120vh] min-h-[40vh]">
      {/* First row with Assessment Tracker and Work Load Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <Card className="border-[1px] border-[#62626280] rounded-3xl h-auto">
            <CardHeader className="h-16 rounded-3xl bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80]">
              <div className="text-sm 4xl:mb-12 mb-16 flex justify-between">
                <CardTitle>Operational Gaps</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="4xl:p-1 p-5">
              <AsessmentTracker />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="border-[1px] border-[#62626280] rounded-3xl h-auto">
            <CardHeader className="h-16 rounded-3xl bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80]">
              <div className="text-sm 4xl:mb-12 mb-16 flex justify-between">
                <CardTitle>Work Load</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="4xl:p-1 p-4">
              <WorkLoadBar />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Second row for Courses, displayed below the Workload Bar */}
      <div className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>
              Your Organization needs these actions to reach your goals.
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Container for the courses in a horizontal row */}
            <div className="flex space-x-2 ">
              {courses.map((course) => (
                <CoursesTab
                  key={course.id}
                  id={course.id}
                  title={course.course_name}
                  description={course.description}
                  price={course.price}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GapAnalysis;
