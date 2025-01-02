"use client";
import React, { useEffect, useState } from "react";
import { Card, CardTitle } from "@/app/components/Card";
import { HoverEffect } from "@/app/components/card-hover-effect";
import CoursesTab from "@/app/components/CoursesTab";
import TabButton from "@/app/components/TabButton";
import AssignmentTabs from "@/app/components/AssignmentTabs";
import InpersonCoachingTab from "@/app/components/inPersonCoachingTab";
import { userData } from "three/webgpu";
import EmployeeModal from "@/app/components/employeeModal";
import { fetchusercourses } from "@/redux/slices/courses.slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { fetchAssessments } from "@/redux/slices/individualassessment.slice";
import Spinner from "@/app/components/Spinner";

const DesigningInterventions = () => {
  const courses = [
    {
      id: 1,
      course_name: "Effective Communications",
      description: "Learn effective communication strategies.",
      price: 99,
      videos: 10,
      assessments: 2,
    },
    {
      id: 2,
      course_name: "Leadership Skills",
      description: "Develop your leadership skills.",
      price: 149,
      videos: 15,
      assessments: 3,
    },
  ];



  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch: any = useDispatch();
  const { userData } = useSelector((state: RootState) => state.auth);
  const { usercourses } = useSelector((state: RootState) => state.courses);
  const {
    assessments,
    loading,
    error,
    assessmentsSuccess,
    assessmentsCount,
    assessmentsCountLoading,
    assessmentsCountSuccess,
  }: any = useSelector((state: RootState) => state.assessment);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [assessmentData, setAssessmentData] = useState([]); // New state for assessments

  const userId: any = userData?.id;
  const assessmentCatalogueData = [
    {
      image: "/assets/assessment1.png",
      id: 1,
      title: "Team Assessment",
      price: 49,
    },
    {
      image: "/assets/assessment2.png",
      id: 2,
      title: "Self Assessment",
      price: 29,
    },
  ];


  useEffect(() => {
    dispatch(
      fetchAssessments({
        filter: {
          userId: userId,
          assessmentFor: "individual",
        },
      })
    );
  }, [dispatch, userData]);

  useEffect(() => {
    if (assessments && assessments.length > 0) {
      // Set only the first two assessments
      setAssessmentData(assessments.slice(0, 2));
    }
  }, [assessments]);



  useEffect(() => {
    // Filter courses with status "notStarted"
    const notStartedCourses = usercourses.filter(
      (course: any) => course.status === "notStarted"
    );

    const limitedCourses = notStartedCourses.slice(0, 2).map((item: any) => item.courses);

    setFilteredCourses(limitedCourses);
  }, [usercourses]);



  const handleViewAllClick = () => {
    setIsModalOpen(true);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (userId) {
      dispatch(fetchusercourses({ userId }));
    }
  }, [dispatch, userId]);


  return (
    <div className="grid grid-cols-1 gap-2">
      {/* Assignment Tabs Section */}
      <div className="my-2 flex flex-col col-span-1">
        <CardTitle>
          Your Organizations need these actions to reach your goals
        </CardTitle>
        <div className="flex space-x-2 my-1 mt-3">
          <AssignmentTabs />
        </div>
      </div>

      {/* Second Row: Assessments and Courses Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {/* Courses Section */}
        {loading ? (
          <div className="flex justify-center items-center w-full h-full border-[1px] rounded-3xl border-slate-800 mr-[1em] pt-[3em] pb-[3em]">
            <Spinner height="30px" width="30px" />
          </div>
        ) : (
        <div className="flex flex-col space-y-2  rounded-3xl p-3">
          <CardTitle className="text-xl">Courses</CardTitle>
          <div className="flex justify-between items-stretch gap-4">
            {filteredCourses.map((course: any) => (
              <div
                key={course.id}
                className="flex flex-col justify-between w-[24em] h-80  rounded-lg shadow-md"
              >
                <CoursesTab
                  id={course.id}
                  title={course.course_name}
                  videos={course.videos}
                  description={course.description}
                  price={course.price}
                />
              </div>
            ))}
          </div>
      
        </div>
          )}
        {/* Individual Assessments Section */}

        {loading ? (
          <div className="flex justify-center items-center w-full h-full border-[1px] rounded-3xl border-slate-800 mr-[1em]">
            <Spinner height="30px" width="30px" />
          </div>
        ) : (
          <div className="rounded-xl 4xl:p-3 p-5 w-full">
            <CardTitle className="text-xl">Take Assessments</CardTitle>
            <div className="overflow-x-auto h-[23em]">
              <HoverEffect
                items={assessmentData}
                className="grid grid-cols-2 md:grid-cols-2 mb-0 gap-1 p-3"
              />
            </div>
          </div>
        )}


      </div>

      {/* Third Row: Full Width Coaching Tab and Tab Button */}
      <div className="mt-4 grid grid-cols-2 space-x-4 w-full ">
        <div className="col-span-1">
          <InpersonCoachingTab />
        </div>
        <div className="col-span-1">
          <TabButton
            backgroundColor="#FF0000"
            text="Group Session"
            imageSrc="/assets/LiveIcon.png"
            textColor="#FFFFFF"
            arrowImageSrc="/assets/ArrowRightUp.png"
            showModalOnClick={true}
            isClickable={true}
            modalType="employee"
          />
        </div>
      </div>
      <EmployeeModal open={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default DesigningInterventions;
