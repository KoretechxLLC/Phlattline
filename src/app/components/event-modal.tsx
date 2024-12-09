"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/app/components/button-sidebar";
import { Badge } from "@/app/components/badge";
import Image from "next/image";
import Icon from "@/app/components/utility-icon";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";
import { useRouter, useSearchParams } from "next/navigation";
import ModuleList from "@/app/components/ModuleList";
import Spinner from "@/app/components/Spinner"; // Import your Spinner component

const coursesData = [
  {
    id: 1,
    thumbnail: "/assets/framepic2.png",
    title: "AI and Virtual",
    type: "Basic",
    subscribers: 1014,
    rating: 3.4,
    instructorname: "Jack Edwards",
    instructorimage: "/assets/DummyImg.png",
    Lessons: 14,
    Hours: 12,
    Price: 40,
  },
  // Other course data...
];

// Static event data
const staticEvent = {
  id: 1,
  title: "AI and Virtual",
  thumbnail: "/assets/framepic2.png",
  description:
    "This is a comprehensive course about blog writing and marketing strategies.",
  type: "Basic",
  instructorname: "John Doe",
  designation: "Content Writer",
  instructorimage: "/assets/DummyImg.png",
  rating: 4.8,
  subscribers: 120,
};

const EventModal = ({
  open,
  onClose,
  event = staticEvent,
}: {
  open: boolean;
  onClose: () => void;
  event?: any;
}) => {
  const router = useRouter();
  const [imgError, setImgError] = useState(false);

  if (!open) return null; // Conditional rendering can still be used here

  let { videos } = event;

  let firstImage = videos?.[0]?.thumbnail_url;

  const handleError = () => {
    setImgError(true);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div
        style={{ maxHeight: "90%", overflow: "auto" }}
        className="relative p-5 bg-[#000000b9] rounded-3xl w-4/5 md:w-1/2 flex flex-col md:flex-row"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-red-500"
        >
          <Icon icon="ic:outline-close" className="text-3xl" />
        </button>

        {/* Left Side: Event Details */}
        <div className="flex-grow flex flex-col">
          <div className="flex items-center justify-between px-5 py-2">
            <h1 className="text-3xl font-bold text-white">
              {event.course_name}
            </h1>
            <Badge className="font-normal rounded-3xl text-lg bg-gradient-to-b from-[#B50D34] to-[#BAA716] text-white">
              <span>$ {event.price}</span>
            </Badge>
          </div>

          <div className="relative w-full mx-2 mb-2">
            <Image
              src={
                imgError
                  ? "/assets/DummyImg.png"
                  : `/api/images?filename=${firstImage}&folder=coursesthumbnails`
              }
              alt="Course Image"
              className="w-full h-full rounded-lg object-cover"
              width={1000}
              height={1000}
              onError={handleError} // If image fails to load, trigger the error handler
            />
            <div className="absolute left-0 bottom-0 m-4">
              <div className="backdrop-blur-md bg-opacity-50 p-3 rounded-full">
                <Icon
                  icon="tdesign:play-circle"
                  className="text-white w-16 h-16 text-3xl hover:text-red-500"
                />
              </div>
            </div>
          </div>

          {/* Course Details Section */}
          <div className="space-y-3 w-full my-2 mx-2 flex-grow">
            <Card className="bg-gray-800 p-4 rounded-2xl">
              <CardContent>
                <h1 className="text-3xl font-bold mb-2 text-white">
                  About this course
                </h1>
                <div className="flex items-center justify-between text-white text-sm lg:text-base font-normal">
                  {/* <div className="flex items-center gap-1.5">
                    <Icon icon="ph:star-fill" className="text-red-600" />
                    <Icon icon="ph:star-fill" className="text-red-600" />
                    <Icon icon="ph:star-fill" className="text-red-600" />
                    <Icon icon="ph:star-fill" className="text-red-600" />
                    <Icon icon="ph:star-fill" className="text-default-300/80" />
                    <span className="text-black">{event.rating}</span>
                  </div> */}
                  <div className="flex items-center gap-1">
                    <Icon
                      icon="heroicons-solid:users"
                      className="text-yellow-600"
                    />
                    {/* <span className="text-black">{event.subscribers}</span> */}
                  </div>
                </div>

                <div className="text-white text-sm lg:text-base font-normal ">
                  <p>{event?.description}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* About the Author Section */}
          {/* <div className="p-4 bg-white rounded-lg">
            <h2 className="text-lg mx-6 font-bold text-black">
              About the Author
            </h2>
            <div className="flex items-center mx-7">
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-black">
                  {event.instructorname}
                </h3>
                <div className="flex items-center space-x-1 my-1">
                  <Badge className="font-bold rounded-2xl text-md text-gray-400">
                    <Icon
                      icon="bitcoin-icons:verify-filled"
                      className="text-xl text-yellow-600"
                    />
                    Certified Instructor
                  </Badge>
                  <p className="text-gray-400">{event.designation}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="rounded-full overflow-hidden w-12 h-12">
                  {staticEvent.instructorimage ? (
                    <div className="w-10 h-10 ring-1 ring-[#fff] md:mt-0 mt-3 flex items-center justify-center rounded-full overflow-hidden">
                      <Image
                        src={staticEvent.instructorimage}
                        alt={staticEvent.instructorname}
                        className="w-full h-full object-cover"
                        width={100}
                        height={100}
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 ring-1 ring-white md:mt-0 mt-3 flex items-center justify-center bg-[#BAA716]  rounded-full">
                      <span className="text-white text-sm md:text-sm font-bold py-3">
                        {staticEvent.instructorname?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-center items-end">
                  <div className="flex items-center space-x-1 text-yellow-400">
                    <Icon
                      icon="ph:star-fill"
                      className="text-xl text-red-600"
                    />
                    <span className="text-lg text-black">
                      {event.rating || staticEvent.rating}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          {/* Button */}
          <div className="flex-shrink-0 mt-2">
            <Button
              color="primary"
              className="w-full text-white px-4 py-2 rounded-3xl"
              onClick={() =>
                router.push(`/Portal/Courses/CourseDetail?courseId=${event.id}`)
              }
            >
              Get Started
            </Button>
          </div>
        </div>

        {/* Right Side: Module List Only */}
        <div className="flex-shrink-0 md:w-1/3 my-4 md:ml-5">
          <div className="my-5">
            <Card className="border border-[#62626280] rounded-xl p-5">
              {/* <CardHeader className="rounded-3xl bg-gradient-to-b from-[#B50D34] to-[#BAA716] p-2"> */}
              {/* <div className="text-sm flex justify-center items-center text-white">
                  <CardTitle>Course Modules</CardTitle>
                </div> */}
              {/* </CardHeader> */}
              {/* <CardContent> */}
              {/* <ModuleList /> */}

              <div>
                <div className="grid my-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                  {event?.videos &&
                    event?.videos?.length > 0 &&
                    event?.videos.map((video: any) => (
                      <div
                        key={video.id}
                        className="relative border border-[#62626280] rounded-lg"
                      >
                        <Image
                          src={
                            imgError
                              ? "/assets/DummyImg.png"
                              : `/api/images?filename=${videos[0].thumbnail_url}&folder=coursesthumbnails`
                          }
                          alt={`Video Thumbnail ${video.id}`}
                          className="w-full h-full rounded-lg container border-2 border-red-600"
                          width={1000}
                          height={1000}
                          onError={handleError} // If image fails to load, trigger the error handler
                        />
                        <div className="absolute inset-0 flex justify-center items-center">
                          <div className="backdrop-blur-md bg-opacity-50 p-3 rounded-full">
                            <Icon
                              icon="ph:play"
                              className="text-white text-3xl"
                            />
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 p-2 text-white bg-opacity-60 rounded-br-lg rounded-tl-lg">
                          <span
                            className="text-lg font-bold"
                            style={{ textShadow: "2px 2px 4px black" }}
                          >
                            {video.title}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              {/* </CardContent> */}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
