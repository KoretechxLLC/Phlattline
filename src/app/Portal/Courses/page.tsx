"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader } from "@/app/components/Card";
import CoursesResults from "@/app/components/CoursesResults";
import TabButton from "@/app/components/TabButton";
import NotesCalendar from "@/app/components/NotesCalendar";
import { Button } from "@/app/components/button-sidebar";
import Spinner from "@/app/components/Spinner";
import RecommendedCourses from "./RecommendedCourses/page";
import MyCourses from "./MyCourse/page";
import { RootState } from "@/redux/store";
import EmployeeCourses from "./EmployeeCourses/page";
import { fetchcourses, fetchcoursesCount, getRecommendedCourses } from "@/redux/slices/courses.slice";

const Courses = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const { userData } = useSelector((state: RootState) => state.auth);
  const [activeTab, setActiveTab] = useState<string>("RecommendedCourses");
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    coursesCount,
    coursesCountLoading,
    coursesCountSuccess,
    recommendedCourses,
    usercourses,
  } = useSelector((state: any) => state.courses);

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
      <div className="px-1 grid grid-cols-1 md:grid-cols-[70%_30%] gap-2 w-full h-full space-y-3 md:space-y-0">
        {/* Left side: Courses List */}
        <div
          className="space-y-2 md:space-y-1 ml-4 w-full"
          style={{ display: userData?.user_type_id === 3 ? "none" : "block" }}
        >
          {isLoading ? (
            <div className="col-span-2 flex justify-center items-center w-full h-full py-52">
              <Spinner height="30px" width="30px" />
            </div>
          ) : (
            <>
              {/* Tab Buttons */}
              <div className="p-8">
                <div className="flex justify-between items-center">
                  <h1 className="text-xl font-bold">Recommended Courses</h1>
                  <Button
                    color="primary"
                    className="rounded-3xl"
                    onClick={() => router.push("/Portal/RecommendedCourses")}
                  >
                    View All
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {/* Add your RecommendedCourses component here */}
                  <div>{/* Placeholder for Recommended Courses */}</div>
                </div>
              </div>

              {/* My Courses */}
              <div className="p-8">
                <div className="flex justify-between items-center">
                  <h1 className="text-xl font-bold">My Courses</h1>
                  <Button
                    color="primary"
                    className="rounded-3xl"
                    onClick={() => router.push("/Portal/MyCourses")}
                  >
                    View All
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {/* Add your MyCourses component here */}
                  <div>{/* Placeholder for My Courses */}</div>
                </div>
              </div>
            </>
          )}
        </div>
        <div
          className="4xl:w-[78em] w-[100em]"
          style={{ display: userData?.user_type_id === 3 ? "block" : "none" }}
        >
          <EmployeeCourses />
        </div>
        {/* Right side: Additional Content */}
        <div className="4xl:my-0 space-y-8 md:space-y-3">
          <div>
            <Card className="shadow-md rounded-3xl w-full h-full">
              <CardHeader>
                <div className="flex justify-between gap-3 items-center">
                  <h1 className="text-lg">Upcoming Videos and Blogs</h1>
                  <p
                    className="text-lg underline cursor-pointer"
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
            <div className="border border-[#62626280] rounded-3xl shadow-md w-full h-full">
              <h1 className="text-center text-3xl font-bold my-2">
                Course Results
              </h1>
              <CoursesResults />
            </div>
          </div>

          <div
            style={{ display: userData?.user_type_id === 3 ? "none" : "block" }}
          >
            <TabButton
              backgroundColor="#FF0000"
              text="Training-On Demand"
              imageSrc="/assets/LiveIcon.png"
              textColor="#FFFFFF"
              arrowImageSrc="/assets/ArrowRightUp.png"
              showModalOnClick={true}
              isClickable={true}
              modalType="spring"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
