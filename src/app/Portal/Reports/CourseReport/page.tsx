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
import { fetchcourses, fetchusercourses } from "@/redux/slices/courses.slice";
import Spinner from "@/app/components/Spinner";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
  const { courses, videoProgress, usercourses } = useSelector(
    (state: RootState) => state.courses
  );
  const [coursesList, setcoursesList] = useState<any>([]);
  const { userData } = useSelector((state: RootState) => state.auth);
  const [loadings, setLoadings] = useState(true);
  const { loading, error, success, logSuccess, goals, timeLogs }: any =
    useSelector((state: RootState) => state.performance);
  const [timelogsData, setTimeLogsData] = useState<any>([]);
  const [timeLogSpent, setTimeLogSpent] = useState(0);

  const userId: any = userData?.id;

  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 3;

  // Fetch the courses for the current page
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = usercourses?.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // useEffect(() => {
  //   if (userId) {
  //     dispatch(fetchtimelog({userId:userId,duration:""}));
  //   }
  // }, [dispatch, userId]);

  useEffect(() => {
    if (logSuccess) {
      setTimeLogsData(timeLogs?.timelogs);
      setTimeLogSpent(timeLogs?.totalTimeSpent);
    }
  }, [timeLogs?.timelogs, logSuccess, timeLogs?.totalTimeSpent]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchusercourses(userId));
    }
  }, [dispatch, userId]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <Card className="border border-[#62626280] rounded-3xl p-1">
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

      <Card className="border border-[#62626280] rounded-3xl shadow-md w-full">
        <CardContent>
          <h1 className="text-center text-3xl font-bold my-1">
            Course Results
          </h1>
          <CoursesResults />
        </CardContent>
      </Card>

      <div style={{ display: userData?.user_type_id === 3 ? "none" : "block" }}>
        <TabButton
          backgroundColor="#FF0000"
          text="Training-On Demand"
          imageSrc="/assets/LiveIcon.png"
          textColor="#FFFFFF"
          arrowImageSrc="/assets/ArrowRightUp.png"
          showModalOnClick={true}
          isClickable={true}
        />
      </div>

      <Card className="border h-full border-[#62626280] rounded-3xl">
        <CardHeader className="flex-row gap-3">
          <CardTitle className="flex-1 ml-6">Courses Completion</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="pb-3 pt-1">
            {loading ? (
              <Spinner height="30px" width="30px" />
            ) : (
              <ul>
                {currentCourses?.map((course: any) => (
                  <li
                    key={course.id}
                    className="text-lg text-default-600 py-2 px-2"
                  >
                    <div className="flex items-center">
                      <div
                        className={`h-12 w-1 mr-4 ${
                          course.status === "completed"
                            ? "bg-green-500"
                            : course.status === "inprogress"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      ></div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span>{course.courses.course_name}</span>
                          <span
                            className={`${
                              course.status === "completed"
                                ? "text-green-500 capitalize"
                                : course.status === "inprogress"
                                ? "text-yellow-500 capitalize"
                                : "text-red-500 capitalize"
                            }`}
                          >
                            {course.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </CardContent>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2  text-white rounded-l-lg"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage * coursesPerPage >= usercourses?.length}
            className="px-4 py-2  text-white rounded-r-lg"
          >
            <FaChevronRight />
          </button>
        </div>
      </Card>
    </div>
  );
};

export default CourseReport;
