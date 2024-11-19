"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import CoursesTab from "@/app/components/CoursesTab";
import { Button } from "@/app/components/button-sidebar";
import { fetchcourses, fetchcoursesCount, fetchusercourses } from "@/redux/slices/courses.slice";
import Spinner from "@/app/components/Spinner";
import { RootState } from "@/redux/store";

const MyCourses = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();

  const [coursesData, setCoursesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [showAll, setShowAll] = useState(false);  // State to toggle between showing all courses or just 6
  const coursesPerPage = showAll ? 9 : 6;  // When showAll is true, show all courses, otherwise 6 per page

  const {
    courses,
    loading,
    error,
    count,
    coursesSuccess,
    usercourses,
    coursesCount,
    coursesCountLoading,
    coursesCountSuccess,
  } = useSelector((state: any) => state.courses);

  const { userData } = useSelector((state: RootState) => state.auth);
  const userId: any = userData?.id;

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
  if (usercourses && usercourses.length > 0) {
    displayedCourses = showAll ? [...usercourses] : usercourses.slice(0, 6); // Show first 6 if not "showAll", otherwise show all
  }

  return (
    <div>
      <div className="p-3 grid grid-cols-1 md:grid-cols-[70%_30%] gap-4 w-full h-full space-y-3 md:space-y-0">
        {/* Left side: Courses List */}
        <div className="space-y-4 md:space-y-2 ml-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
              <div className="col-span-3 flex justify-center items-center">
                <Spinner height="20vh" />
              </div>
            ) : displayedCourses && displayedCourses.length > 0 ? (
              <>
                {displayedCourses.map((usercourse: any) => (
                  <CoursesTab
                    id={usercourse.course_id}
                    title={usercourse.courses.course_name}
                    description={usercourse.courses.description}
                    price={usercourse.courses.price}
                    videos={usercourse.courses.videos}
                    assessments={usercourse.courses.assessments}
                    key={usercourse.courses.course_id}
                  />
                ))}
              </>
            ) : (
              <div className="flex items-center justify-center col-span-3">
                <p className="text-red-700 p-4 rounded-lg border border-red-300 text-center">
                  No courses available.
                </p>
              </div>
            )}
          </div>

          <div className="mt-6">
            {!showAll && (
              <Button
                className="text-white px-5 text-sm md:text-base lg:text-base flex w-full h-10 justify-center items-center rounded-3xl mt-6"
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

export default MyCourses;
