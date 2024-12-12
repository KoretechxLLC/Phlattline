import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";
import { Avatar, AvatarImage } from "@/app/components/avatar";
import { Button } from "./button-sidebar";

import ApplicationPopup from "./ApplicationPopup";
import Deletemodel from "./DeleteModal";
import { FiTrash2 } from "react-icons/fi";

const InterviewSchedulerTab: React.FC = () => {
  // Static array of interview data
  const interviewData = [
    {
      id: 1,
      image: "/assets/DummyImg.png",
      name: "John Doe",
      designation: "Software Engineer",
      interviewStatus: "View",
      message:
        "I'm excited to apply for this position and contribute to your team.",
      cvLink: "https://example.com/john_doe_cv.pdf",
    },
    {
      id: 2,
      image: "/assets/DummyImg.png",
      name: "Jane Smith",
      designation: "Product Manager",
      interviewStatus: "View",
      message: "Looking forward to discussing this role further.",
      cvLink: "https://example.com/jane_smith_cv.pdf",
    },
    {
      id: 3,
      image: "/assets/DummyImg.png",
      name: "Alice Johnson",
      designation: "UI/UX Designer",
      interviewStatus: "Complete",
      message: "Thank you for considering my application.",
      cvLink: "https://example.com/alice_johnson_cv.pdf",
    },
    {
      id: 4,
      image: "/assets/DummyImg.png",
      name: "Michael Brown",
      designation: "Data Scientist",
      interviewStatus: "View",
      message: "Excited to bring my skills to your organization.",
      cvLink: "https://example.com/michael_brown_cv.pdf",
    },
    {
      id: 5,
      image: "/assets/DummyImg.png",
      name: "Emma Davis",
      designation: "HR Specialist",
      interviewStatus: "Complete",
      message: "Hoping to contribute effectively to your team.",
      cvLink: "https://example.com/emma_davis_cv.pdf",
    },
    {
      id: 6,
      image: "/assets/DummyImg.png",
      name: "Samuel Lee",
      designation: "Backend Developer",
      interviewStatus: "View",
      message: "Eager to utilize my backend development skills.",
      cvLink: "https://example.com/samuel_lee_cv.pdf",
    },
    {
      id: 7,
      image: "/assets/DummyImg.png",
      name: "Sophia Martinez",
      designation: "Marketing Specialist",
      interviewStatus: "Complete",
      message: "Looking forward to joining the marketing team.",
      cvLink: "https://example.com/sophia_martinez_cv.pdf",
    },
    {
      id: 8,
      image: "/assets/DummyImg.png",
      name: "Lucas Green",
      designation: "DevOps Engineer",
      interviewStatus: "View",
      message: "Excited to streamline infrastructure and processes.",
      cvLink: "https://example.com/lucas_green_cv.pdf",
    },
  ];

  // State to manage modal visibility
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  const handleOpenPopup = (employee: any) => {
    setSelectedEmployee(employee);
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
    setSelectedEmployee(null);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Centered Heading */}
      <Card className="border border-[#62626280] rounded-xl w-full h-full ">
        <CardHeader>
          <h2 className="text-2xl items-center font-semibold mb-3">
            Latest Updates
          </h2>
          {/* Label Bar for Columns */}
          <div className="flex justify-between px-8 py-3 text-white bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80] text-sm font-medium">
            <span className="w-1/3 text-left">Name</span>
            <span className="w-1/3 text-center">Designation</span>
            <span className="w-1/3 text-right">Action</span>
          </div>
        </CardHeader>
        <ul>
          {interviewData.map((interview, index) => (
            <li
              key={index}
              className={`${
                index < interviewData.length - 1
                  ? "border-b border-gray-600"
                  : ""
              }`}
            >
              <CardContent className="flex justify-between items-center 4xl:p-3 px-8 py-4">
                {/* Name and Avatar */}
                <div className="w-1/3 flex items-center space-x-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={interview.image}
                      alt={`${interview.name}-avatar`}
                      className="w-10 h-10"
                    />
                  </Avatar>
                  <span className="font-semibold text-sm">
                    {interview.name}
                  </span>
                </div>

                {/* Designation */}
                <div className="w-1/3 text-center text-sm text-yellow-400">
                  {interview.designation}
                </div>

                {/* Status Button with Conditional Color and Disabled State */}
                <div className="w-1/3 flex justify-end items-center space-x-2">
                  <Button
                    color={
                      interview.interviewStatus === "Complete"
                        ? "secondary"
                        : "primary"
                    }
                    size="md"
                    className="rounded-lg text-sm"
                    onClick={
                      interview.interviewStatus !== "Complete"
                        ? () => handleOpenPopup(interview)
                        : undefined
                    } // Prevent modal opening if scheduled
                    disabled={interview.interviewStatus === "Complete"} // Disable button if scheduled
                  >
                    {interview.interviewStatus}
                  </Button>
                  <Deletemodel
                    trigger={(onClick: any) => (
                      <button
                        onClick={onClick}
                        className="rounded-lg bg-red-300/20 px-3 py-2 text-sm text-red-300 transition-colors hover:bg-red-600 hover:text-red-200"
                      >
                        <FiTrash2 />
                      </button>
                    )}
                    confirmAction={() => {}}
                  />
                </div>
              </CardContent>
            </li>
          ))}
        </ul>
      </Card>

      {selectedEmployee && (
        <ApplicationPopup
          show={isPopupVisible}
          onClose={handleClosePopup}
          employee={selectedEmployee}
        />
      )}
    </div>
  );
};

export default InterviewSchedulerTab;
