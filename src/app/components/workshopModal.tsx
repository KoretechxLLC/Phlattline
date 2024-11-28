"use client";
import React, { useState } from "react";
import { Button } from "@/app/components/button-sidebar";
import { Badge } from "@/app/components/badge";
import Image from "next/image";
import Icon from "@/app/components/utility-icon";
import { Card, CardContent } from "@/app/components/Card";
import { useRouter } from "next/navigation";
import Spinner from "@/app/components/Spinner"; // Assuming Spinner is available

const staticWorkshop = {
  id: 1,
  title: "AI and Virtual Workshop",
  thumbnail: "/assets/framepic2.png",
  description:
    "This is a comprehensive workshop on AI and Virtual tools for innovation.",
  instructorname: "John Doe",
  designation: "AI Expert",
  instructorimage: "/assets/UserProfile.png",
  rating: 4.8,
  subscribers: 120,
  duration: "3 hours",
  startTime: "10:00 AM",
  endTime: "1:00 PM",
  date: "2024-12-01",
  keyResponsibilities: [
    "Learn to implement AI-driven solutions.",
    "Understand virtual toolkits for businesses.",
    "Collaborate with peers on innovative projects.",
  ],
};

const WorkshopModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false); // Loading state for the enroll button

  if (!open) return null;

  const handleEnroll = () => {
    setLoading(true); // Start loading
    // Simulate API call or navigation delay
    setTimeout(() => {
      setLoading(false); // Stop loading after delay
      //   router.push(
      //     `/Portal/Workshops/WorkshopDetail?workshopId=${staticWorkshop.id}`
      //   );
    }, 1500); // 1.5-second delay for demonstration
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div
        style={{ maxHeight: "90%", overflow: "auto" }}
        className="relative p-5 bg-white rounded-3xl w-4/5 md:w-1/2 flex flex-col md:flex-row"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 hover:text-red-500"
        >
          <Icon icon="ic:outline-close" className="text-3xl" />
        </button>

        {/* Left Side: Workshop Details */}
        <div className="flex-grow flex flex-col">
          <div className="flex items-center justify-between px-5 py-2">
            <h1 className="text-3xl font-bold text-black">
              {staticWorkshop.title}
            </h1>
          </div>
          <div className="relative w-full mx-2 mb-2">
            <Image
              src={staticWorkshop.thumbnail}
              alt="Workshop Image"
              className="w-full h-full rounded-lg object-cover"
              width={1000}
              height={1000}
            />
          </div>

          {/* Instructor Info, Duration, and Timing */}
          <div className="flex items-center justify-between p-4 bg-white rounded-lg mb-4">
            <div className="flex items-center">
              <div className="rounded-full overflow-hidden w-12 h-12">
                {staticWorkshop.instructorimage ? (
                  <Image
                    src={staticWorkshop.instructorimage}
                    alt={staticWorkshop.instructorname}
                    className="w-full h-full object-cover"
                    width={100}
                    height={100}
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-300 flex items-center justify-center rounded-full">
                    <span className="text-white text-xl font-bold">
                      {staticWorkshop.instructorname?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <div className="ml-3">
                <h3 className="text-xl text-red-500 font-bold">
                  {staticWorkshop.instructorname}
                </h3>
                <p className="text-lg text-gray-500  ">
                  {staticWorkshop.designation}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg text-red-500 font-bold">
                {staticWorkshop.duration}
              </p>
              <p className="text-lg text-gray-500">
                {staticWorkshop.startTime} - {staticWorkshop.endTime}
              </p>
            </div>
          </div>

          {/* Workshop Details Section */}
          <div className="space-y-3 w-full my-2 mx-2 flex-grow">
            <Card className="bg-white p-4 rounded-2xl">
              <CardContent>
                <p className="text-black text-sm lg:text-base font-normal">
                  {staticWorkshop.description}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center mt-4">
            <p className="text-lg text-red-500 font-bold">
              Date: {new Date(staticWorkshop.date).toLocaleDateString()}
            </p>
            {loading ? (
              <Spinner height="30px" width="30px" /> // Display spinner while loading
            ) : (
              <Button
                color="primary"
                className="text-white px-4 py-2 rounded-3xl"
                onClick={handleEnroll}
              >
                Enroll Now
              </Button>
            )}
          </div>
        </div>

        {/* Right Side: Learning Outcomes */}
        <div className="flex-shrink-0 md:w-1/3 my-4 md:ml-5">
          <div className="my-5">
            <Card className="p-5">
              <h2 className="text-xl text-red-500 font-bold">
                Learning Outcomes
              </h2>
              <ul className="mt-3 space-y-2 text-lg lg:text-lg text-black list-disc pl-5">
                {staticWorkshop.keyResponsibilities.map(
                  (responsibility: string, index: number) => (
                    <li key={index}>{responsibility}</li>
                  )
                )}
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopModal;
