"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import CoursesTab from "@/app/components/CoursesTab";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/app/components/button-sidebar";
import {
  fetchcourses,
  fetchcoursesCount,
  getRecommendedCourses,
} from "@/redux/slices/courses.slice";
import Spinner from "@/app/components/Spinner";
import { RootState } from "@/redux/store";

const RecommendedCourses = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();

  const [coursesData, setCoursesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const [displayedCourses, setDisplayedCourses] = useState<any>([]);

  const coursesPerPage = 6;

  const {
    courses,
    loading,
    error,
    count,
    coursesSuccess,
    recommendedCourses,
    coursesCount,
    usercourses,
    coursesCountLoading,
    coursesCountSuccess,
    recomendedSuccess,
  } = useSelector((state: any) => state.courses);

  const { userData } = useSelector((state: RootState) => state.auth);

  // Fetch the total count of courses once
  useEffect(() => {
    dispatch(fetchcoursesCount({}));
  }, [dispatch]);

  useEffect(() => {
    if (userData?.id) {
      dispatch(getRecommendedCourses({ userId: userData.id }));
    }
  }, [dispatch, userData]);

  // Calculate total pages based on the courses count
  useEffect(() => {
    if (coursesCountSuccess) {
      const pages = Math.ceil(count / coursesPerPage);
      setTotalPage(pages);
    }
  }, [coursesCountSuccess, count, coursesPerPage]);

  // Fetch courses for the current page whenever `currentPage` changes
  useEffect(() => {
    const filter = { page: currentPage, size: coursesPerPage };
    dispatch(fetchcourses(filter));
  }, [dispatch, currentPage]);

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

  // Calculate the courses to display based on pagination

  useEffect(() => {
    if (
      (coursesData && coursesData.length > 0) ||
      (recommendedCourses && recommendedCourses.length > 0)
    ) {
      // Extract purchased course IDs
      const purchasedCourseIds = new Set(
        userData?.user_courses?.map((course: any) => course.course_id) || [] // Map to IDs
      );

      // Combine coursesData and recommendedCourses
      const combinedCourses = [
        ...(recommendedCourses || []),
        ...(coursesData || []),
      ];

      const startIndex = (currentPage - 1) * coursesPerPage;
      const endIndex = startIndex + coursesPerPage;
      // Filter out duplicates and purchased courses
      const uniqueCourses = combinedCourses.filter(
        (course, index, self) =>
          index === self.findIndex((t) => t.id === course.id) && // Ensure uniqueness
          !purchasedCourseIds.has(course.id) // Exclude purchased courses
      );

      const finalCourses = uniqueCourses.filter((course) => {
        return !purchasedCourseIds.has(Number(course.id)); // Check if course.id is NOT in the Set
      });

      // Update displayed courses
      setDisplayedCourses(finalCourses);
    }
  }, [coursesData, recommendedCourses, currentPage, userData]);

  return (
    <div>
      <div className="p-3 grid grid-cols-1 md:grid-cols-[70%_30%] gap-4 w-full h-full space-y-3 md:space-y-0">
        {/* Left side: Courses List */}
        <div className="space-y-4 md:space-y-2 ml-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
              <div className="col-span-3 flex justify-center items-center w-full h-full py-60">
                <Spinner height="30px" width="30px" />
              </div>
            ) : displayedCourses && displayedCourses.length > 0 ? (
              <>
                {displayedCourses
                  .filter(
                    (value: any, index: any, self: any) =>
                      index === self.findIndex((t: any) => t.id === value.id)
                  )
                  .map((course: any) => (
                    <CoursesTab
                      id={course.id}
                      title={course.course_name}
                      description={course.description}
                      price={course.price}
                      videos={course.videos}
                      assessments={course.assessments}
                      key={course.id}
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
          {/* Conditional Pagination Buttons */}
          {displayedCourses && displayedCourses.length > 0 && (
            <div className="flex items-center justify-center gap-2 py-4">
              <Button
                variant="outline"
                size="icon"
                className="w-8 h-8 border-transparent hover:bg-transparent"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-5 h-5 text-default-900" />
              </Button>
              <span className="text-sm font-medium text-default-900">
                Page {currentPage} of {totalPage}
              </span>
              <Button
                variant="outline"
                size="icon"
                className="w-8 h-8 border-transparent hover:bg-transparent"
                onClick={handleNextPage}
                disabled={currentPage >= totalPage}
              >
                <ChevronRight className="w-5 h-5 text-default-900" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendedCourses;
