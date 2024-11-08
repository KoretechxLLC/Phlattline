"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { Card, CardContent, CardHeader } from "@/app/components/Card";
import CoursesTab from "@/app/components/CoursesTab";
import CoursesResults from "@/app/components/CoursesResults";
import { ChevronLeft, ChevronRight } from "lucide-react";

import TabButton from "@/app/components/TabButton";
import NotesCalendar from "@/app/components/NotesCalendar";
import { Button } from "@/app/components/button-sidebar";
import { fetchcourses, fetchcoursesCount } from "@/redux/slices/courses.slice";
import Spinner from "@/app/components/Spinner";

const Courses = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();

  const [coursesData, setCoursesData] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const coursesPerPage = 12;

  const {
    courses,
    loading,
    error,
    coursesSuccess,
    coursesCount,
    coursesCountLoading,
    coursesCountSuccess,
  } = useSelector((state: any) => state.courses);

  // Fetch total count of courses once
  useEffect(() => {
    dispatch(fetchcoursesCount({}));
  }, [dispatch]);

  // Calculate total pages after courses count is successfully fetched
  useEffect(() => {
    if (coursesCountSuccess) {
      const pages = Math.ceil(coursesCount / coursesPerPage);
      setTotalPage(pages);
    }
  }, [coursesCountSuccess, coursesCount]);

  // Fetch courses for the current page whenever `currentPage` changes
  useEffect(() => {
    dispatch(
      fetchcourses({
        filter: { page: currentPage, size: coursesPerPage },
      })
    );
  }, [dispatch, currentPage]);

  // Update `coursesData` when `coursesSuccess` changes
  useEffect(() => {
    if (coursesSuccess) {
      setCoursesData(courses);
    }
  }, [coursesSuccess, courses]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-full bg-black">
        <p className="text-red-700 p-4 rounded-lg border border-red-300 text-center">
          Error fetching courses: {error}
        </p>
      </div>
    );
  }

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

  const displayedCourses = showAll ? coursesData : coursesData.slice(0, 6);

  return (
    <div>
      <h1 className="text-3xl px-10">Recommended Courses</h1>
      <div className="p-3 grid grid-cols-1 md:grid-cols-[70%_30%] gap-4 w-full h-full space-y-3 md:space-y-0">
        {/* Left side: Courses List */}
        <div className="space-y-4 md:space-y-2 ml-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
              <div className="col-span-3 flex justify-center items-center">
                <Spinner height="20vh" />
              </div>
            ) : coursesData && coursesData.length > 0 ? (
              <>
                {displayedCourses.map((coursesData: any) => (
                  <CoursesTab
                    id={coursesData.id}
                    title={coursesData.course_name}
                    description={coursesData.description}
                    price={coursesData.price}
                    videos={coursesData.videos}
                    assessments={coursesData.assessments}
                    key={coursesData.id}
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
          {/* Show the button below the courses */}
          {!loading && !showAll && courses && courses.length > 0 && (
            <div className="mt-4">
              <Button
                className="text-white px-5 text-sm md:text-base lg:text-base flex w-full h-10 justify-center items-center rounded-3xl"
                size="default"
                variant="default"
                color="primary"
                style={{ fontFamily: "Sansation" }}
                onClick={() => setShowAll(true)}
              >
                View All Courses
              </Button>
            </div>
          )}
          {/* Conditional Pagination Buttons */}
          {showAll && (
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

        {/* Right side: Additional Content */}
        <div className="4xl:my-0 space-y-8 md:space-y-3">
          <div>
            <Card className="shadow-md rounded-3xl w-full h-full">
              <CardHeader>
                <div className="flex justify-between gap-3 items-center">
                  <h1 className="text-xs">Upcoming Videos and Blogs</h1>
                  <p
                    className="text-sm underline cursor-pointer"
                    onClick={() => router.push("/Portal/DailyDose")}
                  >
                    View
                  </p>
                </div>
              </CardHeader>
              <CardContent className="w-full bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] text-white rounded-3xl p-4 4xl:p-2">
                <NotesCalendar />
              </CardContent>
            </Card>
          </div>

          <div>
            <TabButton
              backgroundColor="#fff"
              text="Recommended Assessments"
              imageSrc="/assets/BlackAssessments.png"
              textColor="#000"
              arrowImageSrc="/assets/BlackArrowRU.png"
              showModalOnClick={false}
              isClickable={true}
              redirectTo={"/Portal/Assessments?view=recommended"}
            />
          </div>

          <div>
            <div className="border border-gray-500 rounded-3xl shadow-md w-full h-full">
              <h1 className="text-center text-3xl font-bold my-2">
                Course Results
              </h1>
              <CoursesResults />
            </div>
          </div>

          <div>
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
        </div>
      </div>
    </div>
  );
};

export default Courses;
