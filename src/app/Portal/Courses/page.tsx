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

const Courses = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const { userData } = useSelector((state: RootState) => state.auth);
  const [activeTab, setActiveTab] = useState<string>("RecommendedCourses"); 
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const handleTabChange = (tab: string) => {
    setIsLoading(true); 
    setActiveTab(tab);

    setTimeout(() => {
      setIsLoading(false); 
    }, 500); 
  };

  const renderContent = () => {
    switch (activeTab) {
      case "RecommendedCourses":
        return <RecommendedCourses />;
      case "MyCourses":
        return <MyCourses />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="p-3 grid grid-cols-1 md:grid-cols-[70%_30%] gap-4 w-full h-full space-y-3 md:space-y-0"  >
        {/* Left side: Courses List */}
        <div className="space-y-4 md:space-y-2 ml-4 w-full" style={{ display: userData?.user_type_id === 3 ? "none" : "block" }} >
          {isLoading ? (
            <div className="text-center text-gray-300 py-5">
              <Spinner height="30px" width="30px" />
            </div>
          ) : (
            <>
              {/* Tab Buttons */}
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 justify-start items-start my-2 ">
                <Button
                  className="text-md md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6"
                  color={
                    activeTab === "RecommendedCourses" ? "primary" : "default"
                  }
                  onClick={() => handleTabChange("RecommendedCourses")}
                >
                  Recommended Courses
                </Button>

                <Button
                  className="text-md md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6"
                  color={activeTab === "MyCourses" ? "primary" : "default"}
                  onClick={() => handleTabChange("MyCourses")}
                >
                  My Courses
                </Button>
              </div>

              {/* Render Tab Content */}
              <div className="mt-4 w-[100em] -ml-6">{renderContent()}</div>
            </>
          )}
        </div>
        <div className="w-[100em]" style={{ display: userData?.user_type_id === 3 ? "block" : "none" }}>
        <EmployeeCourses />
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

          <div style={{ display: userData?.user_type_id === 3 ? "none" : "block" }} >
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
