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
import { RootState } from "@/redux/store";
import { FaExclamationCircle } from "react-icons/fa";

const Courses = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();

  const [coursesData, setCoursesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const coursesPerPage = showAll ? 9 : 6;

  const {
    courses,
    loading,
    error,
    count,
    coursesSuccess,
    coursesCount,
    coursesCountLoading,
    coursesCountSuccess,
  } = useSelector((state: any) => state.courses);

  const { userData } = useSelector((state: RootState) => state.auth);

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
  const startIndex = (currentPage - 1) * coursesPerPage;
  const endIndex = startIndex + coursesPerPage;
  const displayedCourses = coursesData.slice(startIndex, endIndex);


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
            ) : displayedCourses  && displayedCourses .length > 0 ? (
              <>
                {displayedCourses.map((course: any) => (
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
                  onClick={() => setShowAll(true)}
                >
                  View All Courses
                </Button>
              )}
            </div>

          {/* Conditional Pagination Buttons */}
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
