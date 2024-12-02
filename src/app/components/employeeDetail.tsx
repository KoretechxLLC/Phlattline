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
  departmentId?: number;
}

const EmployeeDetail: React.FC<PageProps> = ({
  employeeId = undefined,
  departmentId,
}) => {
  const [timeLogSpent, setTimeLogSpent] = useState(0);
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<any>();
  const [department, setDepartment] = useState<any>(null); // For department details
  const coursesPerPage = 3;
  const { departments, responseSuccess } = useSelector(
    (state: RootState) => state.organization
  );
  const [employee, setEmployee] = useState<any>(null);
  const [imgError, setImgError] = useState(false);
  const indexOfLastCourse = currentPage * coursesPerPage;
  const { usercourses } = useSelector((state: RootState) => state.courses);
  const { userData } = useSelector((state: RootState) => state.auth);
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = usercourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setLoading(true);

    // Find the relevant department
    const selectedDepartment = departments.find(
      (dept) => dept.id === departmentId
    );
    setDepartment(selectedDepartment || null);

    // Find the relevant employee
    const selectedEmployee = selectedDepartment
      ? selectedDepartment.employees.find((emp: any) => emp.id === employeeId)
      : null;
    setEmployee(selectedEmployee || null);

    setLoading(false);
  }, [employeeId, departmentId, departments, responseSuccess]);

  const handleError = () => {
    setImgError(true); // Set error flag when image fails to load
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!employeeId && employee.length < 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="text-gray-400">
          No employee selected or data not found
        </span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
      {/* First Row: Employee Info and Goals Achieved */}
      <div className="lg:col-span-1 flex items-center gap-6 border border-[#62626280] rounded-xl px-16 py-2">
        <div className="w-40 h-40 ring-4 ring-[#B50D34] flex items-center justify-center rounded-full overflow-hidden">
          {employee?.profile_image || imgError ? (
            <Image
              alt="User profile image"
              src={
                imgError
                  ? "/assets/DummyImg.png" // Show dummy image if there's an error or no image
                  : `/api/images?filename=${employee?.profile_image}&folder=profileImage`
              }
              layout="responsive"
              width={5000}
              height={5000}
              className="w-full h-full rounded-full"
              onError={handleError}
            />
          ) : (
            <div className="w-60 h-60 ring-4 ring-white md:mt-0 mt-3 flex items-center justify-center bg-gradient-to-b from-[#BAA716] to-[#B50D34] rounded-full">
              <span className="text-white text-2xl md:text-8xl font-bold pt-3">
                {employee?.first_name?.charAt(0).toUpperCase() +
                  employee?.last_name?.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <span className="block text-lg font-semibold text-white uppercase">
              {`${employee?.first_name}` + " " + `${employee?.last_name}`}
            </span>
            <span className="block text-sm text-gray-400">
              {employee?.designation}
            </span>
            <span className="block text-sm text-gray-400">
              {department?.name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Icon
                  key={index}
                  icon="ph:star-fill"
                  className={
                    index <
                    (employee.employee_review[0]?.no_of_stars
                      ? employee.employee_review[0]?.no_of_stars
                      : employee.employee_review?.no_of_stars || 0)
                      ? "text-white"
                      : "text-gray-400"
                  }
                />
              ))}
            </div>
            <span className="text-lg text-white">
              {employee.employee_review[0]?.no_of_stars
                ? employee.employee_review[0]?.no_of_stars
                : employee.employee_review?.no_of_stars || 0}
            </span>
          </div>
          <Button
            color="primary"
            className="rounded-3xl"
            onClick={() => setReviewModalOpen(true)}
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

      {/* Second Row: Other Components */}
      <div className="lg:col-span-full grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="border h-full border-[#62626280] rounded-3xl">
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
                className="px-4 py-2 text-white rounded-l-lg"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage * coursesPerPage >= usercourses.length}
                className="px-4 py-2 text-white rounded-r-lg"
              >
                <FaChevronRight />
              </button>
            </div>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Card className="border border-[#62626280] rounded-3xl p-0">
            <CardHeader className="flex-row gap-3">
              <CardTitle className="flex-1">Activity Hours</CardTitle>
            </CardHeader>
            <div className="flex space-x-2">
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
                  <span className="font-bold my-1 text-xl flex justify-center items-center gap-1">
                    <CiClock1 />
                    Time Spent
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <WriteReviewModal
        open={isReviewModalOpen}
        onClose={() => setReviewModalOpen(false)} // Close modal
        employeeName={employee?.name}
        employeeID={employeeId} // Pass employee name to modal
        organizationID={userData.organization_id}
        data={employee.employee_review[0]}
      />
    </div>
  );
};

export default EmployeeDetail;
