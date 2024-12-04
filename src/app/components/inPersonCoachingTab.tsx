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
      image: "/assets/DummyImg.png",
      name: "John Doe",
      designation: "Software Engineer",
    },
    {
      image: "/assets/DummyImg.png",
      name: "Jane Smith",
      designation: "Product Manager",
    },
  ];

  return (
    <div>
      <Card className="border w-full rounded-3xl border-[#62626280] ">
        <CardHeader>
          <CardTitle>In-Person Coaching</CardTitle>
        </CardHeader>
        <ul>
          {coachingData.map((coach, index) => (
            <li
              key={index}
              className={`${
                index < coachingData.length - 1
                  ? "border-b border-[#62626280]"
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
                <span className="font-semibold">{coach.name}</span>
                <span className="text-yellow-400">{coach.designation}</span>
                <Button color="primary" className="rounded-3xl">
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
