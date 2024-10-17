"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";
import Icon from "@/app/components/utility-icon";
import { Badge } from "@/app/components/badge";
import CommentSection from "@/app/components/CommentSection";
import ModuleList from "@/app/components/ModuleList";
import { useSearchParams } from "next/navigation";

interface CourseModuleProps {
  params: {
    id: string;
  };
}

const CourseModule: React.FC<CourseModuleProps> = ({ params: { id } }) => {
  // Sample module data with ids
  const [data, setData] = useState<any>();
  const modules = [
    { id: "1", title: "Introduction to Branding" },
    { id: "2", title: "Logo Design Basics" },
    { id: "3", title: "Branding Colors" },
    { id: "4", title: "Typography in Branding" },
    { id: "5", title: "Practical Branding Exercise" },
  ];

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
    // ... other courses
  ];

  // Author data
  const author = {
    name: "John Doe",
    image: "/assets/userProfile.png",
    rating: 4.9,
    designation: "Senior Designer",
  };

  // Dummy comment data
  const dummyComment = {
    userName: "Jane Smith",
    profileImage: "/assets/userProfile.png",
    time: "2 hours ago",
    text: "This course is amazing! I learned a lot.",
  };

  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");

  useEffect(() => {
    if (courseId) {
      const filteredCourseData = coursesData.find((e: any) => {
        return Number(e.id) === Number(courseId);
      });
      setData(filteredCourseData);
    }
  }, [courseId]);

  return (
    <div
      className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 bg-default-50 w-full h-full rounded-lg"
      style={{ fontFamily: "Sansation" }}
    >
      <div className="md:col-span-2">
        {/* Left Column: Course Details */}
        <div>
          {/* Title and Badge in one row */}
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold">{data && data?.title}</h1>
            <Badge className="font-bold rounded-2xl text-md bg-gradient-to-b from-[#B50D34] to-[#BAA716] text-white">
              <span className="px-5" style={{ fontFamily: "Sansation" }}>
                {data && data?.type}
              </span>
            </Badge>
          </div>

          <div className="relative w-full my-4">
            <Image
              src={data && data?.thumbnail}
              alt="Course Image"
              className="w-full h-full rounded-lg object-cover"
              width={1000}
              height={1000}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="backdrop-blur-md bg-opacity-50 p-3 rounded-full">
                <Icon
                  icon="ph:play"
                  className="text-white w-full h-full text-3xl"
                />
              </div>
            </div>
          </div>

          {/* Course Details Section */}
          <div className="space-y-5 my-5">
            <div className="w-full rounded-2xl">
              <Card className="bg-black p-2">
                <CardContent>
                  <div className="flex items-center justify-between text-default-900 text-sm lg:text-base font-normal">
                    <h1 className="text-3xl font-bold">About this course</h1>
                    <div className="flex items-center gap-1.5">
                      <Icon icon="ph:star-fill" className="text-red-600" />
                      <Icon icon="ph:star-fill" className="text-red-600" />
                      <Icon icon="ph:star-fill" className="text-red-600" />
                      <Icon icon="ph:star-fill" className="text-red-600" />
                      <Icon
                        icon="ph:star-fill"
                        className="text-default-300/80"
                      />
                      <span className="ltr:pl-2 rtl:pr-2 text-default-500">
                        {data && data?.rating}
                      </span>
                      <p className="text-gray-500 mx-5">|</p>
                      <Icon
                        icon="heroicons-solid:users"
                        className="text-yellow-600"
                      />
                      <span className="text-default-500">
                        {data && data?.subscribers}
                      </span>
                    </div>
                  </div>

                  {/* Course Description */}
                  <div className="text-default-600 text-sm lg:text-base font-normal my-4 text-gray-500">
                    <p>
                      Hello Members! Are you ready to embark on a comprehensive
                      journey into the realm of successful company management?
                      This course offers a deep dive into key strategies and
                      practical knowledge needed to excel in modern business
                      management...
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* About the Author Section */}
          <div className="my-5 p-4 bg-black rounded-lg">
            <h2 className="text-lg font-bold text-white">About the Author</h2>
            <div className="flex items-center mx-2 space-x-2">
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-white">{author.name}</h3>
                <div className="flex items-center space-x-1 my-1">
                  <Badge className="font-bold rounded-2xl text-md text-gray-400">
                    <Icon
                      icon="bitcoin-icons:verify-filled"
                      className="text-xl text-yellow-600"
                    />
                    Certified Instructor
                  </Badge>
                  <p className="text-gray-400">{author.designation}</p>
                  <div className="flex items-center space-x-1 text-yellow-400 mx-4">
                    <Icon
                      icon="ph:star-fill"
                      className="text-xl text-red-600"
                    />
                    <span className="text-lg text-white">{author.rating}</span>
                  </div>
                </div>
              </div>
              <div className="rounded-full overflow-hidden">
                <Image
                  src={author.image}
                  alt={author.name}
                  className="w-full h-full object-cover"
                  width={100}
                  height={100}
                />
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <CommentSection />
        </div>
      </div>

      {/* Right Column: Course Modules and Information */}
      <div className="md:col-span-1 my-16">
        <Card className="border border-gray-500 rounded-xl p-5">
          <CardHeader
            className="h-16 rounded-3xl bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80]"
            style={{ fontFamily: "Sansation" }}
          >
            <div className="text-sm flex justify-center items-center">
              <CardTitle>Course Modules</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ModuleList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CourseModule;
