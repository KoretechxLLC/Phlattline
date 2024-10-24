"use client";
import React from "react";
import Image from "next/image";
import { Card } from "@/app/components/Card";
import Icon from "@/app/components/utility-icon";
import { Button } from "@/app/components/button-sidebar";
import RedBadge from "@/app/components/RedBadge";
import { useRouter } from "next/navigation";

interface CourseTabProps {
  thumbnail: string;
  title: string;
  type: string;
  subscribers: number;
  rating: number;
  instructorname: string;
  instructorimage: string;
  Lessons: number;
  Hours: number;
  Price: number;
  id: number;
}

const CoursesTab: React.FC<CourseTabProps> = ({
  thumbnail,
  title,
  type,
  subscribers,
  rating,
  instructorname,
  instructorimage,
  Lessons,
  Hours,
  Price,
  id,
}) => {
  const router = useRouter();

  return (
    <Card
      className="p-4 w-full border-[1px] rounded-3xl hover:bg-red-700 transition-colors duration-500 cursor-pointer group"
      onClick={() => router.push(`/Portal/Courses/CourseDetail?courseId=${id}`)}
    >
      {/* Thumbnail container */}
      <div className="relative bg-default-200 dark:bg-default-900 h-48 flex flex-col justify-center items-center mb-3 rounded-md">
        <div className="h-full">
          <Image
            width={1000}
            height={1000}
            className="rounded-2xl h-full w-full object-contain"
            src={thumbnail}
            alt={title}
          />
        </div>

        {/* Play button overlay with blur background, always visible */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="backdrop-blur-md bg-opacity-50 p-3 rounded-full">
            <Icon icon="ph:play" className="text-white text-3xl" />
          </div>
        </div>

        {/* Like button (Heart) at the top-right corner, always visible */}
        <div className="absolute top-2 right-2 z-10">
          {" "}
          {/* Adjust the position here */}
          <Button
            color="default"
            size="icon"
            className="rounded-full bg-default-50 text-black"
          >
            <Icon icon="ph:heart" className="text-lg text-default-400" />
          </Button>
        </div>
      </div>

      <div>
        {/* Centered title */}
        <div className="flex justify-start">
          <h6 className="text-default-900 group-hover:text-white text-2xl font-medium mt-2 truncate text-center transition-colors duration-500">
            {title}
          </h6>
        </div>

        {/* Type Icon, Subscribers, and Rating in one row */}
        <div className="flex justify-between items-center mt-2">
          <RedBadge text={type} />
          <div className="flex items-center gap-5 space-x-2">
            <span className="flex items-center text-gray-500 group-hover:text-white font-normal text-sm space-x-0.5 rtl:space-x-reverse transition-colors duration-500">
              <Icon
                icon="heroicons-solid:users"
                className="text-gray-500 h-6 w-6 group-hover:text-white"
              />
              <span className="px-1">{subscribers}</span>
            </span>

            {rating && (
              <span className="flex items-center text-gray-500 group-hover:text-white font-normal text-sm space-x-0.5 rtl:space-x-reverse transition-colors duration-500">
                <Icon
                  icon="ph:star-fill"
                  className="text-gray-500 h-6 w-6 group-hover:text-white"
                />
                <span className="px-1">{rating}</span>
              </span>
            )}
          </div>
        </div>

        {/* Instructor details, Lessons, and Hours */}
        <div className="flex justify-between items-center mt-1.5 text-sm font-normal transition-colors duration-500">
          <div className="flex items-center text-white group-hover:text-white">
            <Image
              src={instructorimage}
              width={100}
              height={100}
              alt={`Instructor icon`}
              className="h-8 w-8 mr-2"
            />
            <span className="transition-colors duration-500">
              {instructorname}
            </span>
          </div>
          <div className="text-gray-500 group-hover:text-white transition-colors duration-500">
            {Lessons} Lessons | {Hours} Hours
          </div>
        </div>

        {/* Price and View Details */}
        <div className="flex justify-between items-center mt-2">
          <span className="text-default-900 group-hover:text-white font-bold text-2xl">
            ${Price}
          </span>
          <span className="text-default-900 group-hover:text-white font-bold text-2xl cursor-pointer">
            View Details
          </span>
        </div>
      </div>
    </Card>
  );
};

export default CoursesTab;
