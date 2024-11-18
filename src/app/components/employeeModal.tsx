"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/app/components/Card";
import Image from "next/image";
import Icon from "@/app/components/utility-icon";
import { Badge } from "@/app/components/badge";
import { Avatar, AvatarImage } from "@/app/components/avatar";

const coachingData = [
  {
    name: "John Doe",
    designation: "Software Engineer",
    image: "/assets/UserProfile.png",
  },
  {
    name: "Jane Smith",
    designation: "Project Manager",
    image: "/assets/UserProfile.png",
  },
  {
    name: "Alice Johnson",
    designation: "UX Designer",
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
      <div className="relative p-5 bg-white rounded-3xl w-4/5 md:w-1/2 flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 hover:text-red-500"
        >
          <Icon icon="ic:outline-close" className="text-3xl" />
        </button>

        {/* Title Section */}
        <div className="px-5 py-2">
          <h1 className="text-3xl font-bold text-black">Employee List</h1>
        </div>

        {/* Employee List Section */}
        <div className="overflow-y-auto flex-grow">
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
                <CardContent className="flex items-center space-x-4 p-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={coach.image}
                      alt={`${coach.name}-avatar`}
                      className="w-10 h-10"
                    />
                  </Avatar>
                  <span className="font-semibold text-black">{coach.name}</span>
                  <span className="text-yellow-600">{coach.designation}</span>
                </CardContent>
              </li>
            ))}
          </ul>
        </div>

        {/* Close Button */}
        <div className="flex justify-center py-4">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-red-500 text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeModal;
