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
import { Button } from "./button-sidebar";

const NewHiringTab: React.FC = () => {
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
      name: "Dane Jones",
      designation: "Finance Officer",
    },
  ];

  return (
    <div>
      <Card className="border w-full border-gray-500 rounded-xl ">
        <CardHeader className="mb-2 bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80] rounded-xl">
          <CardTitle>New Hiring</CardTitle>
        </CardHeader>
        <ul>
          {coachingData.map((coach, index) => (
            <li
              key={index}
              className={`${
                index < coachingData.length - 1
                  ? "border-b border-gray-300"
                  : ""
              }`}
            >
              <CardContent className="flex items-center my-5 space-x-4 p-6">
                <Avatar className="w-12 h-10">
                  <AvatarImage
                    src={coach.image}
                    alt={`${coach.name}-avatar`}
                    className="w-9 h-9"
                  />
                </Avatar>
                <span className="font-semibold">{coach.name}</span>
                <span className="text-yellow-400">{coach.designation}</span>
                <Badge className="bg-gradient-to-b text-sm from-[#B50D34] to-[#BAA716] whitespace-nowrap">
                  Onboard
                </Badge>
              </CardContent>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default NewHiringTab;
