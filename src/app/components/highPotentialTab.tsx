"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";
import { Avatar, AvatarImage } from "@/app/components/avatar";
import { Badge } from "./badge";
import { Button } from "./button-sidebar";
import EmployeeModal from "./employeeModal";

const HighPotentialTab: React.FC = () => {
  // Static array of coaching session data
  const coachingData = [
    {
      image: "/assets/UserProfile.png",
      name: "John Doe",
      designation: "Software Engineer",
    },
    {
      image: "/assets/UserProfile.png",
      name: "Jane Smith",
      designation: "Product Manager",
    },
    {
      image: "/assets/UserProfile.png",
      name: "Alice Johnson",
      designation: "Team Lead",
    },
  ];

  // State to manage modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle opening the modal
  const handleViewAllClick = () => {
    setIsModalOpen(true);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Card className="border w-full border-gray-500 rounded-xl ">
        <CardHeader className="mb-2 rounded-xl bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80]">
          <CardTitle>High Potential Employees</CardTitle>
        </CardHeader>
        <ul>
          {coachingData.map((coach, index) => (
            <li
              key={index}
              className={`${
                index < coachingData.length - 1
                  ? "border-b border-gray-500"
                  : ""
              }`}
            >
              <CardContent className="flex items-center space-x-4 p-10">
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src={coach.image}
                    alt={`${coach.name}-avatar`}
                    className="w-10 h-10"
                  />
                </Avatar>
                <span className="font-semibold">{coach.name}</span>
                <span className="text-yellow-400">{coach.designation}</span>
              </CardContent>
            </li>
          ))}
        </ul>
        <Button
          className="text-white px-2 flex w-full justify-center items-center rounded-3xl mt-2"
          size="default"
          color="primary"
          onClick={handleViewAllClick} // Open modal on button click
        >
          View All
        </Button>
      </Card>

      {/* EmployeeModal will be displayed when the button is clicked */}
      <EmployeeModal open={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default HighPotentialTab;
