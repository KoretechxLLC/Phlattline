"use client";
import React from "react";
import { Card, CardTitle } from "@/app/components/Card";
import { HoverEffect } from "@/app/components/card-hover-effect";
import CoursesTab from "@/app/components/CoursesTab";
import TabButton from "@/app/components/TabButton";
import AssignmentTabs from "@/app/components/AssignmentTabs";
import InpersonCoachingTab from "@/app/components/inPersonCoachingTab";

const DesigningInterventions = () => {
  // Static array for AssignmentTabs data
  const assignments = [
    { title: "Goal 1", description: "Define objectives for team alignment" },
    { title: "Goal 2", description: "Set measurable KPIs" },
    { title: "Goal 3", description: "Assign accountability roles" },
  ];

  // Static array for CoursesTab data
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

  // Static array for HoverEffect data
  const assessmentCatalogueData = [
    {
      image: "/assets/assessment1.png",
      title: "Team Assessment",
      price: 49,
    },
    {
      image: "/assets/assessment2.png",
      title: "Self Assessment",
      price: 29,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4">
      {/* Assignment Tabs Section */}
      <div className="my-2 flex flex-col col-span-1">
        <CardTitle>
          Your Organizations need these actions to reach your goals
        </CardTitle>
        <div className="flex space-x-2 my-1">
          {assignments.map((assignment, index) => (
            <AssignmentTabs
              key={index}
              title={assignment.title}
              description={assignment.description}
            />
          ))}
        </div>
      </div>

      {/* Second Row: Assessments and Courses Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {/* Individual Assessments */}
        <div className="border-[1px] border-gray-500 rounded-lg p-5">
          <CardTitle className="text-xl">Individual Assessments</CardTitle>
          <HoverEffect
            items={assessmentCatalogueData} // Use static array
            className="grid grid-cols-1 md:grid-cols-2 gap-2"
          />
        </div>

        {/* Courses Section */}
        <div className="flex flex-col space-y-4 border-[1px] border-gray-500 rounded-lg p-5">
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
      </div>

      {/* Third Row: Coaching Tab and Tab Button in One Row */}
      <div className="mt-4 flex space-x-4 w-full">
        <InpersonCoachingTab />
        <TabButton
          backgroundColor="#FF0000"
          text="Group Session"
          imageSrc="/assets/LiveIcon.png"
          textColor="#FFFFFF"
          arrowImageSrc="/assets/ArrowRightUp.png"
          showModalOnClick={true}
          isClickable={true}
        />
      </div>
    </div>
  );
};

export default DesigningInterventions;
