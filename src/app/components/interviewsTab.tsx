"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";
import { Avatar, AvatarImage } from "@/app/components/avatar";
import { Badge } from "./badge";
import Spinner from "@/app/components/Spinner";

const InterviewTab: React.FC = () => {
  // Static array of interview data
  const [interviewData, setInterviewData] = useState<
    {
      image: string;
      name: string;
      designation: string;
      interviewStatus: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timeout = setTimeout(() => {
      setInterviewData([
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
      ]);
      setLoading(false);
    }, 2000); // Simulate a 2-second loading time

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      <Card className="border border-gray-500 rounded-3xl">
        <CardHeader className="h-16 rounded-3xl bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80]">
          <CardTitle>Interviews</CardTitle>
        </CardHeader>
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Spinner height="30px" width="30px" />
          </div>
        ) : interviewData.length > 0 ? (
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
                <CardContent className="flex items-center justify-between p-8 space-x-2">
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
        ) : (
          <div className="flex justify-center items-center p-8 text-gray-300">
            No interviews data found!
          </div>
        )}
      </Card>
    </div>
  );
};

export default InterviewTab;
