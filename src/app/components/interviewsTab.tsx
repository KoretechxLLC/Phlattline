"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";
import { Avatar, AvatarImage } from "@/app/components/avatar";
import { Badge } from "./badge";

const InterviewTab: React.FC = () => {
  // Static array of interview data
  const interviewData = [
    {
      image: "/assets/UserProfile.png",
      name: "John Doe",
      designation: "Software Engineer",
      interviewStatus: "Pending",
    },
    {
      image: "/assets/UserProfile.png",
      name: "Jane Smith",
      designation: "Product Manager",
      interviewStatus: "Completed",
    },
    {
      image: "/assets/UserProfile.png",
      name: "Alice Johnson",
      designation: "UI/UX Designer",
      interviewStatus: "Scheduled",
    },
  ];

  return (
    <div>
      <Card className="border border-gray-400">
        <CardHeader>
          <CardTitle>Interviews</CardTitle>
        </CardHeader>
        <ul>
          {interviewData.map((interview, index) => (
            <li
              key={index}
              className={`${
                index < interviewData.length - 1
                  ? "border-b border-gray-300"
                  : ""
              }`}
            >
              <CardContent className="flex items-center justify-between p-4 space-x-2">
                {/* Image and Name */}
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
                <div className="mx-1 text-center text-sm">
                  <span className="text-yellow-400">
                    {interview.designation}
                  </span>
                </div>

                {/* Status Badge */}
                <div className="mx-4">
                  <Badge className="bg-gradient-to-b text-sm from-[#B50D34] to-[#BAA716] whitespace-nowrap">
                    {interview.interviewStatus}
                  </Badge>
                </div>
              </CardContent>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default InterviewTab;
