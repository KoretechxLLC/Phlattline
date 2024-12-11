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
    },
    {
      id: 2,
      image: "/assets/DummyImg.png",
      name: "Jane Smith",
      designation: "Product Manager",
      interviewStatus: "View",
    },
    {
      id: 3,
      image: "/assets/DummyImg.png",
      name: "Alice Johnson",
      designation: "UI/UX Designer",
      interviewStatus: "Complete",
    },
  ];

  // State to manage modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Function to handle opening the modal when "Schedule Interview" button is clicked
  const handleScheduleClick = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleDeleteGoal = (id: any) => {};

  const handleOpenPopup = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Centered Heading */}
      <Card className="border border-[#62626280] rounded-xl w-full max-w-3xl">
        <CardHeader>
          <h2 className="text-2xl items-center font-semibold mb-3">
            Latest Updates
          </h2>
          {/* Label Bar for Columns */}
          <div className="flex justify-between px-8 py-3 text-white bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80] text-sm font-medium">
            <span>Name</span>
            <span>Designation</span>
            <span>Action</span>
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
              <CardContent className="flex items-center justify-between 4xl:p-3 px-8 py-8 space-x-2">
                {/* Name and Avatar */}
                <div className="flex items-center space-x-4">
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
                <div className="text-center text-sm text-yellow-400">
                  {interview.designation}
                </div>

                {/* Status Button with Conditional Color and Disabled State */}
                <div className="flex space-x-2">
                  <Button
                    color={
                      interview.interviewStatus === "Complete"
                        ? "secondary"
                        : "primary"
                    }
                    size="md"
                    className="rounded-3xl"
                    onClick={
                      interview.interviewStatus !== "Complete"
                        ? handleOpenPopup
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
                        className="rounded-lg bg-red-600 px-3 py-2 text-lg text-white transition-colors hover:bg-red-600 hover:text-red-200"
                      >
                        <FiTrash2 />
                      </button>
                    )}
                    confirmAction={() => handleDeleteGoal(interview.id)}
                  />
                </div>
              </CardContent>
            </li>
          ))}
        </ul>
      </Card>

      <ApplicationPopup
        show={isPopupVisible}
        onClose={handleClosePopup}
        employeeName="John Doe"
        designation="Software Engineer"
        message="I'm excited to apply for this position and contribute to your team."
        cvLink="https://example.com/john_doe_cv.pdf"
      />
      {/* Pass the modal state to the SpringModal */}
    </div>
  );
};

export default InterviewSchedulerTab;
