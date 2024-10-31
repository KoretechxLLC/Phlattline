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
    instructorimage: "/assets/userProfile.png",
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
  instructorimage: "/assets/userProfile.png",
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
  event?: typeof staticEvent;
}) => {
  const router = useRouter();
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false); // New loading state
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");

  useEffect(() => {
    if (courseId) {
      const filteredCourseData = coursesData.find(
        (e: any) => Number(e.id) === Number(courseId)
      );
      setData(filteredCourseData);
    }
  }, [courseId]);

  if (!open) return null; // Conditional rendering can still be used here

  const handleGetStarted = async () => {
    setLoading(true); // Start loading
    // Simulate a network request or navigation delay
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a 2-second delay
    setLoading(false); // End loading
    router.push(`/Portal/Courses/CourseModule?courseId=${event.id}`); // Navigate after loading
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="relative p-5 bg-white rounded-3xl w-4/5 md:w-1/2 flex flex-col md:flex-row">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-40">
            <Spinner /> {/* Display spinner in the parent div */}
          </div>
        )}

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 hover:text-red-500"
        >
          <Icon icon="ic:outline-close" className="text-3xl" />
        </button>

        {/* Left Side: Event Details */}
        <div className="flex-grow flex flex-col">
          <div className="flex items-center justify-between px-5 py-2">
            <h1 className="text-3xl font-bold text-black">{event.title}</h1>
            <Badge className="font-normal rounded-3xl text-lg bg-gradient-to-b from-[#B50D34] to-[#BAA716] text-white">
              <span>{event.type}</span>
            </Badge>
          </div>

          <div className="relative w-full mx-2 mb-2">
            <Image
              src={event.thumbnail}
              alt="Course Image"
              className="w-full h-full rounded-lg object-cover"
              width={1000}
              height={1000}
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
            <Card className="bg-white p-4 rounded-2xl">
              <CardContent>
                <h1 className="text-3xl font-bold mb-2 text-black">
                  About this course
                </h1>
                <div className="flex items-center justify-between text-black text-sm lg:text-base font-normal">
                  <div className="flex items-center gap-1.5">
                    <Icon icon="ph:star-fill" className="text-red-600" />
                    <Icon icon="ph:star-fill" className="text-red-600" />
                    <Icon icon="ph:star-fill" className="text-red-600" />
                    <Icon icon="ph:star-fill" className="text-red-600" />
                    <Icon icon="ph:star-fill" className="text-default-300/80" />
                    <span className="text-black">{event.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon
                      icon="heroicons-solid:users"
                      className="text-yellow-600"
                    />
                    <span className="text-black">{event.subscribers}</span>
                  </div>
                </div>

                <div className="text-black text-sm lg:text-base font-normal ">
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

          {/* About the Author Section */}
          <div className="p-4 bg-white rounded-lg">
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
                  <Image
                    src={event.instructorimage}
                    alt={event.instructorname}
                    className="w-full h-full object-cover"
                    width={1000}
                    height={1000}
                  />
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
          </div>

          {/* Button */}
          <div className="flex-shrink-0 mt-2">
            <Button
              color="primary"
              className="w-full text-white px-4 py-2 rounded-3xl"
              onClick={handleGetStarted}
              disabled={loading} // Disable button while loading
            >
              {loading ? (
                <Spinner /> // Display spinner while loading
              ) : (
                "Get Started"
              )}
            </Button>
          </div>
        </div>

        {/* Right Side: Module List Only */}
        <div className="flex-shrink-0 md:w-1/3 my-4 md:ml-5">
          <div className="my-5">
            <Card className="border border-gray-500 rounded-xl p-5">
              <CardHeader className="rounded-3xl bg-gradient-to-b from-[#B50D34] to-[#BAA716] p-2">
                <div className="text-sm flex justify-center items-center text-white">
                  <CardTitle>Course Modules</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ModuleList />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
