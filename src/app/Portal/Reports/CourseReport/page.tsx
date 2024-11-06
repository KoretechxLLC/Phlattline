"use client";
import React, { useEffect, useState } from "react";
import CoursesResults from "@/app/components/CoursesResults";
import TabButton from "@/app/components/TabButton";
import HoursDropdown from "@/app/components/HoursDropdown";
import ActivityHours from "@/app/components/ActivityHours";
import { CiClock1 } from "react-icons/ci";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchtimelog } from "@/redux/slices/performanceManagement.slice";
import { RootState } from "@/redux/store";

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
  },
];

const formatTimeSpent = (seconds: any) => {
  if (seconds < 60) {
    return (
      <span>
        {seconds} <span style={{ fontSize: "0.8em" }}>SEC</span>
      </span>
    );
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <span>
      <span>
        {minutes}
        <span style={{ fontSize: "0.6em", color: "#FF0000" }}> MIN</span>
      </span>
      {remainingSeconds > 0 && (
        <span style={{ marginLeft: "0.2em" }}>
          {remainingSeconds}
          <span style={{ fontSize: "0.6em", color: "#FF0000" }}> SEC</span>
        </span>
      )}
    </span>
  );
};

const CourseReport = () => {
  const dispatch: any = useDispatch();
  const { userData } = useSelector((state: RootState) => state.auth);
  const { loading, error, success, logSuccess, goals, timeLogs }: any =
    useSelector((state: RootState) => state.performance);
  const [timelogsData, setTimeLogsData] = useState<any>([]);
  const [timeLogSpent, setTimeLogSpent] = useState(0);

  const userId: any = userData?.id;

  useEffect(() => {
    if (userId) {
      dispatch(fetchtimelog(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (logSuccess) {
      setTimeLogsData(timeLogs?.timelogs);
      setTimeLogSpent(timeLogs?.totalTimeSpent);
    }
  }, [logSuccess, timeLogs?.timelogs, timeLogs?.totalTimeSpent]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <Card className="border border-gray-500 rounded-3xl p-1">
        <CardHeader className="flex-row gap-3">
          <CardTitle className="flex-1">Activity Hours</CardTitle>
        </CardHeader>

        <div className="flex space-x-4">
          <div className="w-full">
            <ActivityHours />
          </div>

          <div className="w-1/4 flex flex-col">
            <div className="flex flex-col w-fit mb-3"></div>
            <div className="flex flex-col mt-[8em]">
              <span className="space-x-8 items-center flex justify-center">
                <span className="text-2xl">
                  {timeLogSpent ? formatTimeSpent(timeLogSpent) : "0 secs"}
                </span>
              </span>
              <span className="font-bold my-1 text-lg flex justify-center items-center gap-1">
                <CiClock1 />
                Time Spent
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
                className="text-lg text-default-600 py-2 px-2"
              >
                <div className="flex items-center">
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
