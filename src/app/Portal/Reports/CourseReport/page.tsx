"use client";
import React from "react";
import CoursesResults from "@/app/components/CoursesResults";
import TabButton from "@/app/components/TabButton";
import HoursDropdown from "@/app/components/HoursDropdown";
import ActivityHours from "@/app/components/ActivityHours";
import { Badge } from "@/app/components/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";

const coursesData = [
  {
    id: 1,
    thumbnail: "/assets/framepic2.png",
    title: "AI and Virtual",
    type: "Basic",
    subscribers: 1014,
    rating: 3.4,
    instructorname: "Jack Edwards",
    instructorimage: "/assets/userProfile.png",
    Lessons: 14,
    Hours: 12,
    Price: 40,
    completion: "not started", // Options: "not started", "ongoing", "completed"
    progress: 0, // Progress percentage
    startTime: "10:00",
    endTime: "12:00",
  },
  {
    id: 2,
    thumbnail: "/assets/framepic2.png",
    title: "Data Science Fundamentals",
    type: "Premium",
    subscribers: 850,
    rating: 4.2,
    instructorname: "Sarah Johnson",
    instructorimage: "/assets/userProfile.png",
    Lessons: 20,
    Hours: 25,
    Price: 60,
    completion: "ongoing",
    progress: 60, // Progress percentage
    startTime: "9:30",
    endTime: "10:30",
  },
  {
    id: 3,
    thumbnail: "/assets/framepic2.png",
    title: "Learn Development and Grow",
    type: "Basic",
    subscribers: 700,
    rating: 4.5,
    instructorname: "Michael Smith",
    instructorimage: "/assets/userProfile.png",
    Lessons: 16,
    Hours: 18,
    Price: 45,
    completion: "completed",
    progress: 100, // Progress percentage
    startTime: "7:00",
    endTime: "9:00",
  },
];

const CourseReport = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <Card className="border border-gray-500 rounded-3xl p-1">
        <CardHeader className="flex-row gap-3">
          <CardTitle className="flex-1">Activity Hours</CardTitle>
        </CardHeader>

        <div className="flex space-x-4 ">
          {/* Left Column: Activity Hours */}
          <div className="w-full">
            <ActivityHours />
          </div>

          {/* Right Column: Additional Stats */}
          <div className="w-1/4 flex flex-col">
            <div className="flex flex-col w-fit  mb-3">
              <HoursDropdown />
            </div>
            <div className="flex flex-col">
              <span className="font-bold my-1 text-lg">Time Spent</span>
              <span className="flex items-center space-x-8">
                <span className="text-2xl">28</span>
                <Badge className="bg-[#BAA71640] text-[#BAA716] text-md rounded-3xl">
                  43%
                </Badge>
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-bold my-1 text-lg">Lessons Taken</span>
              <span className="flex items-center space-x-8">
                <span className="text-2xl">50</span>
                <Badge className="bg-[#BAA71640] text-[#BAA716] text-md rounded-3xl">
                  84%
                </Badge>
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-bold my-1 text-lg">Exams Passed</span>
              <span className="flex items-center space-x-8">
                <span className="text-2xl">50</span>
                <Badge className="bg-[#BAA71640] text-[#BAA716] text-md rounded-3xl">
                  83%
                </Badge>
              </span>
            </div>
          </div>
        </div>
      </Card>

      <Card className="border border-gray-500 rounded-3xl shadow-md w-full">
        <CardContent>
          <h1 className="text-center text-3xl font-bold my-1">
            Course Results
          </h1>
          <CoursesResults />
        </CardContent>
      </Card>

      <TabButton
        backgroundColor="#FF0000"
        text="Training-On Demand"
        imageSrc="/assets/LiveIcon.png"
        textColor="#FFFFFF"
        arrowImageSrc="/assets/ArrowRightUp.png"
        showModalOnClick={true}
        isClickable={true}
      />

      <Card className="border h-full border-gray-500 rounded-3xl">
        <CardHeader className="flex-row gap-3">
          <CardTitle className="flex-1">Courses Completion</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {coursesData.map((course, i) => (
              <li
                key={`course-${i}`}
                className="text-lg text-default-600 py-2 px-2 "
              >
                <div className="flex items-center">
                  {/* Left border single colored line */}
                  <div
                    className={`h-12 w-1 mr-4 ${
                      course.progress === 100
                        ? "bg-green-500"
                        : course.progress > 0
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  ></div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span>{course.title}</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div>
                      <span>
                        {course.startTime} - {course.endTime}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseReport;
