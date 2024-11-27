"use client";
import React, { useState } from "react";
import { Card, CardTitle } from "@/app/components/Card";
import { HoverEffect } from "@/app/components/card-hover-effect";
import CoursesTab from "@/app/components/CoursesTab";
import TabButton from "@/app/components/TabButton";
import AssignmentTabs from "@/app/components/AssignmentTabs";
import InpersonCoachingTab from "@/app/components/inPersonCoachingTab";
import { userData } from "three/webgpu";
import EmployeeModal from "@/app/components/employeeModal";

const DesigningInterventions = () => {
  const courses = [
    {
      id: 1,
      course_name: "Effective Communication",
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

  const handleViewAllClick = () => {
    setIsModalOpen(true);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="grid grid-cols-1 gap-4">
      {/* Assignment Tabs Section */}
      <div className="my-2 flex flex-col col-span-1">
        <CardTitle>
          Your Organizations need these actions to reach your goals
        </CardTitle>
        <div className="flex space-x-2 my-1">
          <AssignmentTabs />
        </div>
      </div>

      {/* Second Row: Assessments and Courses Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {/* Courses Section */}
        <div className="flex flex-col space-y-4 border-[1px] border-gray-500 rounded-lg p-8">
          <CardTitle className="text-xl">Courses</CardTitle>
          <div className="flex space-x-4 overflow-x-auto">
            {courses.map((course) => (
              <CoursesTab
                id={course.id}
                title={course.course_name}
                description={course.description}
                price={course.price}
                key={course.id}
              />
            ))}
          </div>
        </div>
        {/* Individual Assessments Section */}
        <Card className="border-[1px] border-gray-500 rounded-lg p-4">
          <CardTitle className="text-xl">Individual Assessments</CardTitle>
          <HoverEffect
            items={assessmentCatalogueData}
            className="grid grid-cols-1 md:grid-cols-2 mb-0 gap-1 p-5"
          />
        </Card>
      </div>

      {/* Third Row: Full Width Coaching Tab and Tab Button */}
      <div className="mt-4 flex space-x-4 w-full col-span-full">
        <InpersonCoachingTab />
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
      <EmployeeModal open={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default DesigningInterventions;
