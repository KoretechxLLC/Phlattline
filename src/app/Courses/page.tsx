"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";
import CoursesTab from "@/app/components/CoursesTab";
import CoursesResults from "@/app/components/CoursesResults";

import TabButton from "@/app/components/TabButton";
import NotesCalendar from "@/app/components/NotesCalendar";
import { Button } from "@/app/components/button-sidebar";

const Courses = () => {
  const router = useRouter();
  const [showAll, setShowAll] = useState(false);
  const coursesData = [
    {
      id: 1,
      thumbnail: "/assets/framepic2.png",
      title: "AI and Virtual",
      type: "Basic",
      subscribers: 1014,
      rating: 3.4,
      instructorname: "Jack Edwards",
      instructorimage: "/assets/userProfile.png",
      Lessons: 14,
      Hours: 12,
      Price: 40,
    },
    {
      id: 2,
      thumbnail: "/assets/framepic2.png",
      title: "Data Science Fundamentals",
      type: "Premium",
      subscribers: 850,
      rating: 4.2,
      instructorname: "Sarah Johnson",
      instructorimage: "/assets/userProfile.png",
      Lessons: 20,
      Hours: 25,
      Price: 60,
    },
    {
      id: 3,
      thumbnail: "/assets/framepic2.png",
      title: "Learn Development and Grow",
      type: "Basic",
      subscribers: 700,
      rating: 4.5,
      instructorname: "Michael Smith",
      instructorimage: "/assets/userProfile.png",
      Lessons: 16,
      Hours: 18,
      Price: 45,
    },
    {
      id: 4,
      thumbnail: "/assets/framepic2.png",
      title: "Budgeting and Finance",
      type: "Basic",
      subscribers: 1014,
      rating: 3.4,
      instructorname: "Jack Edwards",
      instructorimage: "/assets/userProfile.png",
      Lessons: 14,
      Hours: 12,
      Price: 40,
    },
    {
      id: 5,
      thumbnail: "/assets/framepic2.png",
      title: "Business and Ecosystem",
      type: "Premium",
      subscribers: 850,
      rating: 4.2,
      instructorname: "Sarah Johnson",
      instructorimage: "/assets/userProfile.png",
      Lessons: 20,
      Hours: 25,
      Price: 60,
    },
    {
      id: 6,
      thumbnail: "/assets/framepic2.png",
      title: "Documentation and Reporting",
      type: "Basic",
      subscribers: 700,
      rating: 4.5,
      instructorname: "Michael Smith",
      instructorimage: "/assets/userProfile.png",
      Lessons: 16,
      Hours: 18,
      Price: 45,
    },
    {
      id: 7,
      thumbnail: "/assets/framepic2.png",
      title: "Introduction to AI Ethics",
      type: "Basic",
      subscribers: 900,
      rating: 4.1,
      instructorname: "Jane Doe",
      instructorimage: "/assets/userProfile.png",
      Lessons: 12,
      Hours: 15,
      Price: 50,
    },
    {
      id: 8,
      thumbnail: "/assets/framepic2.png",
      title: "Project Management",
      type: "Premium",
      subscribers: 1200,
      rating: 4.8,
      instructorname: "Chris Lee",
      instructorimage: "/assets/userProfile.png",
      Lessons: 18,
      Hours: 20,
      Price: 70,
    },
    {
      id: 9,
      thumbnail: "/assets/framepic2.png",
      title: "Advanced JavaScript",
      type: "Basic",
      subscribers: 1100,
      rating: 4.6,
      instructorname: "Paul Wilson",
      instructorimage: "/assets/userProfile.png",
      Lessons: 15,
      Hours: 17,
      Price: 55,
    },
  ];

  const displayedCourses = showAll ? coursesData : coursesData.slice(0, 6);
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-[70%_30%] gap-5 w-full h-full space-y-5 md:space-y-0">
      {/* Left side: Courses List */}
      <div className="space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedCourses.map((course) => (
            <CoursesTab
              key={course.id}
              thumbnail={course.thumbnail}
              title={course.title}
              type={course.type}
              subscribers={course.subscribers}
              rating={course.rating}
              instructorname={course.instructorname}
              instructorimage={course.instructorimage}
              Lessons={course.Lessons}
              Hours={course.Hours}
              Price={course.Price}
              id={course.id}
            />
          ))}
        </div>

        {/* Conditionally render the button only when showAll is false */}
        {!showAll && (
          <div className="mt-5 md:mt-10">
            <Button
              className="text-white px-5 text-sm md:text-base lg:text-base flex w-full h-12 justify-center items-center rounded-3xl "
              size="default"
              variant="default"
              color="primary"
              style={{ fontFamily: "Sansation" }}
              onClick={() => setShowAll(true)} // Set showAll to true when button is clicked
            >
              View All Courses
            </Button>
          </div>
        )}
      </div>

      {/* Right side: Additional Content */}
      <div className="space-y-8 md:space-y-3">
        <div>
          <Card
            className="shadow-md rounded-3xl h-full"
            style={{ fontFamily: "Sansation" }}
          >
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-sm">
                  Upcoming Videos and Blogs
                </CardTitle>
                <p
                  className="text-xs underline cursor-pointer"
                  onClick={() => router.push("/videos")}
                >
                  View all
                </p>
              </div>
            </CardHeader>
            <CardContent className="w-full sm:w-full bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] text-white rounded-2xl p-4">
              <NotesCalendar />
            </CardContent>
          </Card>
        </div>

        <div className="w-full" style={{ fontFamily: "Sansation" }}>
          <TabButton
            backgroundColor="#fff" // Set your desired color
            text="Recommended Assessments" // Set the desired button text
            imageSrc="/assets/BlackAssessments.png"
            textColor="#000"
            arrowImageSrc="/assets/BlackArrowRU.png"
          />
        </div>

        <div>
          <div
            className="border border-gray-500 rounded-3xl shadow-md w-full h-full"
            style={{ fontFamily: "Sansation" }}
          >
            <h1 className="text-center text-3xl font-bold mb-4">
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
          />
        </div>
      </div>
    </div>
  );
};

export default Courses;
