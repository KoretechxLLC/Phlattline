"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import CoursesTab from "@/app/components/CoursesTab";
import { Button } from "@/app/components/button-sidebar";
import {
  fetchcourses,
  fetchCoursesAssign,
  fetchcoursesCount,
  fetchusercourses,
} from "@/redux/slices/courses.slice";
import Spinner from "@/app/components/Spinner";
import { RootState } from "@/redux/store";

const EmployeeCourses = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();

  const [coursesData, setCoursesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [showAll, setShowAll] = useState(false); // State to toggle between showing all courses or just 6
  const coursesPerPage = showAll ? 9 : 6; // When showAll is true, show all courses, otherwise 6 per page

  const {
    courses,
    loading,
    error,
    count,
    coursesSuccess,
    usercourses,
    coursesAssign,
    coursesCount,
    coursesCountLoading,
    coursesCountSuccess,
  } = useSelector((state: any) => state.courses);

  const { userData } = useSelector((state: RootState) => state.auth);
  const userId: any = userData?.id;
  const employee_id = userData?.employee_id;

  // Fetch the total count of courses once
  useEffect(() => {
    dispatch(fetchcoursesCount({}));
  }, [dispatch]);

  // Calculate total pages based on the courses count
  useEffect(() => {
    if (coursesCountSuccess) {
      const pages = Math.ceil(count / coursesPerPage);
      setTotalPage(pages);
    }
  }, [coursesCountSuccess, count, coursesPerPage]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchusercourses(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (employee_id) {
      dispatch(fetchCoursesAssign(employee_id));
    }
  }, [employee_id, dispatch]);

  // Update `coursesData` when `coursesSuccess` changes
  useEffect(() => {
    if (coursesSuccess) {
      const categoryCourses =
        courses &&
        courses.length > 0 &&
        courses.filter(
          (course: any) => course.categoryId === userData?.categoryId
        );
      setCoursesData(categoryCourses);
    }
  }, [coursesSuccess, courses, userData]);

  const handleNextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Display only a subset of the courses based on the current state
  let displayedCourses: any = [];
  if (coursesAssign && coursesAssign.length > 0) {
    displayedCourses = showAll ? [...coursesAssign] : coursesAssign.slice(0, 6); // Show first 6 if not "showAll", otherwise show all
  }

  return (
    <div>
      <div className="p-3 grid grid-cols-1 md:grid-cols-[70%_30%] gap-4 w-full h-full space-y-3 md:space-y-0">
        {/* Left side: Courses List */}
        <div className="space-y-4 md:space-y-2 ml-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
              <div className="text-center text-gray-300 py-20">
                <Spinner height="30px" width="30px" />
              </div>
            ) : displayedCourses && displayedCourses.length > 0 ? (
              <>
                {displayedCourses.map((coursesAssign: any) => (
                  <CoursesTab
                    id={coursesAssign.course_id}
                    title={coursesAssign.courses.course_name}
                    description={coursesAssign.courses.description}
                    price={coursesAssign.courses.price}
                    videos={coursesAssign.courses.videos}
                    assessments={coursesAssign.courses.assessments}
                    key={coursesAssign.courses.course_id}
                  />
                ))}
              </>
            ) : (
              <div className="flex items-center justify-center col-span-3">
                <div className="text-center text-gray-300 h-full w-full flex justify-center items-center py-60">
                  No Courses Available!
                </div>
              </div>
            )}
          </div>

          <div>
            {!showAll && !loading && courses.length === 0 && (
              <Button
                className="text-white px-5 text-sm md:text-base lg:text-base flex w-full h-10 justify-center items-center rounded-3xl my-2"
                size="default"
                variant="default"
                color="primary"
                style={{ fontFamily: "Sansation" }}
                onClick={() => setShowAll(true)} // Toggles the showAll state
              >
                View All Courses
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCourses;
