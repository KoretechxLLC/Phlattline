"use client";

import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/app/components/Card";
import Icon from "@/app/components/utility-icon";
import TabButton from "@/app/components/TabButton";
import { Button } from "@/app/components/button-sidebar";
import { Badge } from "@/app/components/badge";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";

interface CourseDetailsProps {
  params: {
    id: string;
  };
}

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

const CourseDetail: React.FC<CourseDetailsProps> = ({ params: { id } }) => {
  const router = useRouter();
  const [isBought, setIsBought] = useState<Boolean>(false);
  const [showComments, setShowComments] = useState<Boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<any>();

  const handleBuyClick = () => {
    setIsOpen(true); // Open modal when the Buy button is clicked
  };

  const handleGetStartedClick = () => {
    setShowComments(true);
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
    <div className="p-5 grid grid-cols-1 md:grid-cols-[70%_30%] gap-5 bg-default-50 w-full h-full space-y-6 rounded-lg">
      {/* Left Column: Course Details */}
      <div>
        <div className="flex items-center px-5 py-1 space-x-4">
          <h1 className="text-3xl font-bold">{data && data?.title}</h1>
          <Badge className="font-bold rounded-2xl text-md bg-gradient-to-b whitespace-nowrap from-[#B50D34] to-[#BAA716] text-white">
            <span className="px-5">{data && data?.type}</span>
          </Badge>
        </div>

        <div className="relative w-full mx-2">
          <Image
            src={data && data?.thumbnail}
            alt="Course Image"
            className="w-full h-full rounded-lg object-cover container"
            width={1000}
            height={1000}
          />
          <div className="absolute left-0 bottom-0 m-4">
            <div className="backdrop-blur-md bg-opacity-50 p-3 rounded-full">
              <Icon
                icon="tdesign:play-circle"
                className="text-white w-32 h-32 text-3xl hover:text-red-500"
              />
            </div>
          </div>
        </div>

        {/* Course Details Section */}
        <div className="space-y-5 w-full my-2 mx-2">
          <div className="rounded-2xl">
            <Card className="bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] p-4">
              <CardContent>
                <div className="flex items-center justify-between text-default-900 text-sm lg:text-base font-normal">
                  <h1 className="text-3xl font-bold">About this course</h1>
                  <div className="flex items-center gap-1.5">
                    <Icon icon="ph:star-fill" className="text-red-600" />
                    <Icon icon="ph:star-fill" className="text-red-600" />
                    <Icon icon="ph:star-fill" className="text-red-600" />
                    <Icon icon="ph:star-fill" className="text-red-600" />
                    <Icon icon="ph:star-fill" className="text-default-300/80" />
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

        {/* Buttons Section */}
        <div className="my-5 md:my-10 space-x-4">
          {!isBought ? (
            <Button
              className="text-white px-5 text-sm md:text-base lg:text-base flex w-full  justify-center items-center rounded-3xl"
              size="default"
              color="primary"
              onClick={handleBuyClick} // Open modal when the Buy button is clicked
            >
              Buy now for $50
            </Button>
          ) : (
            <div className="flex space-x-4">
              <Button
                className="text-white px-5 text-sm md:text-base lg:text-base flex w-full  justify-center items-center rounded-3xl"
                size="default"
                color="primary"
                onClick={() =>
                  router.push(
                    `/Portal/Courses/CourseModule?courseId=${data?.id}`
                  )
                }
              >
                Get Started
              </Button>
            </div>
          )}
        </div>

        {/* Live Button */}
        <div className="my-4">
          <TabButton
            backgroundColor="#FF0000"
            text="Training-On Demand"
            imageSrc="/assets/LiveIcon.png"
            textColor="#FFFFFF"
            arrowImageSrc="/assets/ArrowRightUp.png"
          />
        </div>
      </div>

      {/* Right Column: Video List */}
      <div>
        <div className="grid my-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
          {[1, 2, 3, 4, 5, 6].map((video) => (
            <div
              key={video}
              className="relative border border-gray-500 rounded-lg"
            >
              <Image
                src="/assets/framepic2.png"
                alt={`Video Thumbnail ${video}`}
                className="w-full h-full rounded-lg container"
                width={1000}
                height={1000}
              />

              <div className="absolute inset-0 flex justify-center items-center">
                <div className="backdrop-blur-md bg-opacity-50 p-3 rounded-full">
                  <Icon icon="ph:play" className="text-white text-3xl" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 p-2 text-white bg-opacity-60 rounded-br-lg rounded-tl-lg">
                <span className="text-lg font-bold">Video {video}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Popup */}
      <SpringModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setIsBought={setIsBought}
      />
    </div>
  );
};

// Modal component using Framer Motion
const SpringModal = ({
  isOpen,
  setIsOpen,
  setIsBought,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setIsBought: any;
}) => {
  const handleContinue = () => {
    setIsOpen(false);
    setIsBought(true); // Show the "Get Started" button after closing the modal
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-red-800 to-[#27010A] text-white p-10 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <div className="flex justify-center items-center h-full">
              <Icon
                icon="teenyicons:tick-circle-outline"
                className="text-white w-20 h-20 text-3xl"
              />
            </div>

            <div className="relative z-10 p-5 border rounded-xl my-6">
              <h3 className="text-3xl font-bold text-center mx-5 text-[#009B21]">
                Success!
              </h3>
              <p className="text-center mb-6">
                We are delighted to inform you that we received your payment.
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                className="text-white px-5 text-sm md:text-base lg:text-base flex w-full h-12 justify-center items-center rounded-3xl"
                size="default"
                color="primary"
                style={{ fontFamily: "Sansation" }}
                onClick={handleContinue} // Update the logic to handle the Continue button
              >
                Continue
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CourseDetail;
