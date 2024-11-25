"use client";
import React, { useEffect, useState } from "react";
import GoalsAchievedTracker from "@/app/components/goalsAchievedTracker";
import CoursesResults from "@/app/components/CoursesResults";
import ActivityHours from "@/app/components/ActivityHours";
import PerformanceChart from "@/app/components/performanceChart";
import Image from "next/image";
import Icon from "@/app/components/utility-icon";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";
import { Button } from "@/app/components/button-sidebar";
import { CiClock1 } from "react-icons/ci";
import Spinner from "@/app/components/Spinner";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useSearchParams } from "next/navigation";
import WriteReviewModal from "./writeReview";

interface Employee {
  id: number;
  name: string;
  department: string;
  image: string;
  designation?: string; // Optional field if not always present
}

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

interface PageProps {
  employeeId?: number;
}

const EmployeeDetail: React.FC<PageProps> = ({ employeeId }) => {
  const [timeLogSpent, setTimeLogSpent] = useState(0);
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<any>();
  const coursesPerPage = 3;
  const { courses, videoProgress, usercourses } = useSelector(
    (state: RootState) => state.courses
  );
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = usercourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  const employees: Employee[] = [
    // Operations Department
    {
      id: 1,
      name: "John Doe",
      department: "Operations",
      image: "/assets/UserProfileLg.png",
    },
    {
      id: 2,
      name: "Michael White",
      department: "Operations",
      image: "/assets/UserProfileLg.png",
    },
    {
      id: 3,
      name: "Sophia Taylor",
      department: "Operations",
      image: "/assets/UserProfileLg.png",
    },
    {
      id: 4,
      name: "Lucas Martinez",
      department: "Operations",
      image: "/assets/UserProfileLg.png",
    },
    {
      id: 5,
      name: "Emma Johnson",
      department: "Operations",
      image: "/assets/UserProfileLg.png",
    },
    {
      id: 6,
      name: "Liam Smith",
      department: "Operations",
      image: "/assets/UserProfileLg.png",
    },

    // Sales Department
    {
      id: 7,
      name: "Jane Smith",
      department: "Sales",
      image: "/assets/UserProfileLg.png",
    },
    {
      id: 8,
      name: "Sarah Lee",
      department: "Sales",
      image: "/assets/UserProfileLg.png",
    },
    {
      id: 9,
      name: "Noah Brown",
      department: "Sales",
      image: "/assets/UserProfileLg.png",
    },
    {
      id: 10,
      name: "Ella Walker",
      department: "Sales",
      image: "/assets/UserProfileLg.png",
    },
    {
      id: 11,
      name: "Jack Wilson",
      department: "Sales",
      image: "/assets/UserProfileLg.png",
    },
    {
      id: 12,
      name: "Mia Davis",
      department: "Sales",
      image: "/assets/UserProfileLg.png",
    },

    // Finance Department
    {
      id: 13,
      name: "James Brown",
      department: "Finance",
      image: "/assets/UserProfileLg.png",
    },
    {
      id: 14,
      name: "Ethan Clark",
      department: "Finance",
      image: "/assets/UserProfileLg.png",
    },
    {
      id: 15,
      name: "Olivia Harris",
      department: "Finance",
      image: "/assets/UserProfileLg.png",
    },
    {
      id: 16,
      name: "Benjamin Moore",
      department: "Finance",
      image: "/assets/UserProfileLg.png",
    },
    {
      id: 17,
      name: "Ava Martinez",
      department: "Finance",
      image: "/assets/UserProfileLg.png",
    },
    {
      id: 18,
      name: "Charlotte Young",
      department: "Finance",
      image: "/assets/UserProfileLg.png",
    },

    // IT Department
    {
      id: 19,
      name: "Emily Clark",
      department: "IT",
      image: "/assets/UserProfileLg.png",
    },
    {
      id: 20,
      name: "Jacob Taylor",
      department: "IT",
      image: "/assets/UserProfileLg.png",
    },
    {
      id: 21,
      name: "William Evans",
      department: "IT",
      image: "/assets/UserProfileLg.png",
    },
    {
      id: 22,
      name: "Amelia Johnson",
      department: "IT",
      image: "/assets/UserProfileLg.png",
    },
    {
      id: 23,
      name: "Henry Thomas",
      department: "IT",
      image: "/assets/UserProfileLg.png",
    },
    {
      id: 24,
      name: "Isabella Lopez",
      department: "IT",
      image: "/assets/UserProfileLg.png",
    },
  ];

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (employeeId) {
      setLoading(true);
      const filteredEmployeeData = employees.find((e) => e.id === employeeId);
      setTimeout(() => {
        setData(filteredEmployeeData);
        setLoading(false);
      }, 500);
    } else {
      setData(null);
      setLoading(false);
    }
  }, [employees, employeeId]);

  if (!employeeId || !data) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="text-gray-400">
          No employee selected or data not found
        </span>
      </div>
    );
  } // Only include dynamic dependencies

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
      {/* First Row: Employee Info and Goals Achieved */}
      <div className="lg:col-span-1 flex items-center gap-6 border border-gray-500 rounded-xl p-4">
        <div className="w-40 h-40 ring-4 ring-[#B50D34] flex items-center justify-center rounded-full overflow-hidden">
          <Image
            alt="User profile image"
            src={data?.image}
            layout="responsive"
            width={5000}
            height={5000}
            className="w-full h-full rounded-full"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <span className="block text-lg font-semibold text-white">
              {data?.name}
            </span>
            <span className="block text-sm text-gray-400">
              {data?.designation}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Icon icon="ph:star-fill" className="text-white" />
              <Icon icon="ph:star-fill" className="text-white" />
              <Icon icon="ph:star-fill" className="text-white" />
              <Icon icon="ph:star-fill" className="text-white" />
              <Icon icon="ph:star-fill" className="text-gray-400" />
            </div>
            <span className="text-lg text-white">4.8</span>
          </div>
          <Button
            color="primary"
            onClick={() => setReviewModalOpen(true)} // Open modal
          >
            Write Review
          </Button>
        </div>
      </div>
      <div className="lg:col-span-1">
        <Card className="border border-[#62626280] rounded-3xl shadow-md w-full h-full">
          <CardHeader className="bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80] h-16 rounded-3xl">
            <CardTitle>Goals Achieved</CardTitle>
          </CardHeader>
          <CardContent>
            <GoalsAchievedTracker showTargetImage={false} />
          </CardContent>
        </Card>
      </div>

      {/* Second Row: Other Components */}
      <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="border h-full border-gray-500 rounded-3xl">
            <CardHeader className="flex-row gap-3">
              <CardTitle className="flex-1 ml-6">Courses Completion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="pb-3 pt-1">
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
                disabled={currentPage * coursesPerPage >= usercourses.length}
                className="px-4 py-2  text-white rounded-r-lg"
              >
                <FaChevronRight />
              </button>
            </div>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <Card className="border border-gray-500 rounded-3xl p-5">
            <CardHeader className="flex-row gap-3">
              <CardTitle className="flex-1">Activity Hours</CardTitle>
            </CardHeader>
            <div className="flex p-5">
              <div className="w-full">
                <ActivityHours />
              </div>
              <div className="w-20 flex flex-col">
                <div className="flex flex-col mt-[7em]">
                  <span className="space-x-4 items-center flex justify-center">
                    <span className="text-lg">
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
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Performance</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <PerformanceChart />
            </CardContent>
          </Card>
        </div>
      </div>
      <WriteReviewModal
        open={isReviewModalOpen}
        onClose={() => setReviewModalOpen(false)} // Close modal
        employeeName={data.name} // Pass employee name to modal
      />
    </div>
  );
};

export default EmployeeDetail;
