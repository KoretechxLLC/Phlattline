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

const InpersonCoachingTab: React.FC = () => {
  // Static array of coaching session data
  const coachingData = [
    {
      image: "/images/avatar1.jpg",
      name: "John Doe",
      designation: "Software Engineer",
    },
    {
      image: "/images/avatar2.jpg",
      name: "Jane Smith",
      designation: "Product Manager",
    },
  ];

  return (
    <div>
      <Card className="border border-gray-400">
        <CardHeader>
          <CardTitle>In-Person Coaching</CardTitle>
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
              <CardContent className="flex items-center space-x-4 p-4">
                <Avatar className="w-6 h-6">
                  <AvatarImage
                    src={coach.image}
                    alt={`${coach.name}-avatar`}
                    className="w-5 h-5"
                  />
                </Avatar>
                <span className="font-semibold">{coach.name}</span>
                <span className="text-yellow-400">{coach.designation}</span>
                <Button className="bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80]">
                  Take
                </Button>
              </CardContent>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default InpersonCoachingTab;
