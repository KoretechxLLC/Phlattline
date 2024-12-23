"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Card } from "@/app/components/Card";
import Icon from "@/app/components/utility-icon";
import RedBadge from "@/app/components/RedBadge";
import { useRouter } from "next/navigation";

interface CourseTabProps {
  title?: string;
  description?: string;
  price?: number;
  videos?: Array<any>;
  assessments?: Array<any>;
  id?: number;
}

const CoursesTab: React.FC<CourseTabProps> = ({
  title = "Course Title",
  price = 0,
  videos = [],
  id,
}) => {
  const router = useRouter();

  const thumbnail =
    videos.length > 0
      ? `/api/images?filename=${videos[0].thumbnail_url}&folder=coursesthumbnails`
      : "/default-thumbnail.jpg";

  const [imgError, setImgError] = useState(false);

  const handleError = () => {
    setImgError(true); // Set the error flag to true when image fails to load
  };

  return (
    <Card
      className="p-3 w-full border-[1px] border-[#62626280] rounded-3xl hover:bg-red-700 transition-colors duration-500 cursor-pointer group"
      style={{ fontFamily: "Sansation" }}
      onClick={() => router.push(`/Portal/Courses/CourseDetail?courseId=${id}`)}
    >
      <div className="relative bg-default-200 dark:bg-default-900  flex flex-col justify-center items-center  rounded-md">
        <div className="h-full w-full">
          <Image
            width={1000}
            height={1000}
            className="rounded-lg w-full object-cover"
            src={imgError || !thumbnail ? "/assets/DummyImg.png" : thumbnail} // Fallback to DummyImg if there's an error or no thumbnail
            alt={title}
            onError={handleError} // If image fails to load, trigger the error handler
          />
        </div>

        {/* Play button overlay */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="backdrop-blur-md bg-opacity-50  p-3 rounded-full">
            <Icon icon="ph:play" className="text-white text-3xl" />
          </div>
        </div>
      </div>

      <div>
        {/* Course Title */}
        <h6 className="text-default-900 group-hover:text-white 4xl:text-lg text-2xl font-medium mt-2 truncate transition-colors duration-500">
          {title}
        </h6>

        <div className="flex justify-between 4xl:py-2 py-3">
          <RedBadge text="Basic" />
          <div className="my-1">
            {videos.length > 0 ? (
              <p className="text-gray-300 group-hover:text-white text-sm">
                {videos.length} Lessons
              </p>
            ) : (
              <p className="text-gray-500 group-hover:text-white text-sm">
                No videos available.
              </p>
            )}
          </div>
        </div>

        {/* Price */}
        <div className="flex justify-between 4xl:py-1 py-3 items-center">
          <div className="flex justify-between items-center ">
            <span className="text-default-900 group-hover:text-white font-bold 4xl:text-lg text-2xl">
              ${price}
            </span>
          </div>
          <div>
            <p>View Details →</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CoursesTab;
