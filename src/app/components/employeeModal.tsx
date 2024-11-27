"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { CardContent } from "@/app/components/Card";
import Icon from "@/app/components/utility-icon";
import { Button } from "./button-sidebar";
import { Avatar, AvatarImage } from "@/app/components/avatar";

const coachingData = [
  {
    name: "John Doe",
    designation: "Software Engineer",
    email: "john.doe@example.com", // Added email field
    image: "/assets/UserProfile.png",
  },
  {
    name: "Jane Smith",
    designation: "Project Manager",
    email: "jane.smith@example.com", // Added email field
    image: "/assets/UserProfile.png",
  },
  {
    name: "Alice Johnson",
    designation: "UX Designer",
    email: "alice.johnson@example.com", // Added email field
    image: "/assets/UserProfile.png",
  },
  // Add more employees here...
];

const EmployeeModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const router = useRouter();

  if (!open) return null; // Conditional rendering to handle modal visibility

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="relative p-5 bg-white rounded-3xl w-3/4 md:w-1/3 flex flex-col">
        {" "}
        {/* Adjusted width */}
        <button
          onClick={onClose}
          className="absolute top-4 right-3 text-gray-700 hover:text-red-500"
        >
          <Icon icon="ic:outline-close" className="text-3xl" />
        </button>
        {/* Title Section */}
        <div className="px-5 py-4 text-center ">
          <select className="w-full p-2 rounded-xl h-14 bg-[#fff]] border border-[#626262]  text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#626262]">
            <option value="">Department</option>
            <option value="IT">IT</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>
        {/* Employee List Section */}
        <div className="overflow-y-auto flex-grow">
          <ul>
            {coachingData.map((coach, index) => (
              <li
                key={index}
                className={`${
                  index < coachingData.length - 1
                    ? "border-b border-gray-200"
                    : ""
                }`}
              >
                <CardContent className="flex items-center space-x-2 px-1 py-5 justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage
                        src={coach.image}
                        alt={`${coach.name}-avatar`}
                        className="w-16 h-16 rounded-full"
                      />
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-semibold text-black">
                        {coach.name}
                      </span>
                      <span className="text-red-600 text-sm">
                        {coach.email}
                      </span>{" "}
                      {/* Email below name */}
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    className="w-5 h-5 border-2 border-gray-400 rounded appearance-none checked:border-black checked:bg-transparent checked:relative checked:before:content-['✔'] checked:before:text-black checked:before:absolute checked:before:top-1/2 checked:before:left-1/2 checked:before:transform checked:before:-translate-x-1/2 checked:before:-translate-y-1/2"
                  />
                </CardContent>
              </li>
            ))}
          </ul>
        </div>
        {/* Close Button */}
        <div className="flex justify-center py-4">
          <Button
            onClick={onClose}
            color="primary"
            className="rounded-3xl px-5 py-2"
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeModal;
