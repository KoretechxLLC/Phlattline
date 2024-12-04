"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import CoursesTab from "@/app/components/CoursesTab";
import { Button } from "@/app/components/button-sidebar";
import {
  fetchcoursesCount,
  fetchusercourses,
} from "@/redux/slices/courses.slice";
import Spinner from "@/app/components/Spinner";
import { RootState } from "@/redux/store";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MyCourses = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [displayedCourses, setDisplayedCourses] = useState<any>([]);
  const [paginationEnabled, setPaginationEnabled] = useState(false); // Tracks whether pagination is active
  const coursesPerPage = 6; // Courses fetched per page
  const { userData } = useSelector((state: RootState) => state.auth);
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

  const userId: any = userData?.id;

  // Fetch the total count of courses once
  useEffect(() => {
    dispatch(fetchcoursesCount({}));
  }, [dispatch]);

  // Calculate total pages based on the courses count

  // Fetch courses for the current page
  useEffect(() => {
    if (userId) {
      const filter = { page: currentPage, size: coursesPerPage };
      dispatch(fetchusercourses({ userId, filter }));
    }
  }, [dispatch, userId, currentPage]);

  useEffect(() => {
    if (coursesCountSuccess) {
      const pages = Math.floor(count / coursesPerPage);
      setTotalPage(pages);
    }
  }, [coursesCountSuccess, count, coursesPerPage]);

  // Set displayed courses when usercourses changes
  useEffect(() => {
    setDisplayedCourses(usercourses);
  }, [usercourses]);

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

  const handleViewAll = () => {
    setPaginationEnabled(true);
  };

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
                <div className="text-center text-gray-300 h-full w-full flex justify-center items-center py-60">
                  No Courses Available!
                </div>
              </div>
            )}
          </div>

          <div>
            {!paginationEnabled && !loading && displayedCourses.length > 6 && (
              <Button
                className="text-white px-5 text-sm md:text-base lg:text-base flex w-full h-10 justify-center items-center rounded-3xl my-2"
                size="default"
                variant="default"
                color="primary"
                style={{ fontFamily: "Sansation" }}
                onClick={handleViewAll}
              >
                View All Courses
              </Button>
            )}
            {paginationEnabled && (
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
    </div>
  );
};

export default MyCourses;
