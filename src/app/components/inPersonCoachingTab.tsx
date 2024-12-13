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
import { ChevronLeft, ChevronRight } from "lucide-react";

const InpersonCoachingTab: React.FC = () => {
  // Static array of coaching session data
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
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

  const handleNextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

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
              <CardContent className="flex items-center space-x-4 4xl:p-2 p-4">
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
          <div className="flex items-center justify-center gap-2 py-4">
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8 border-transparent hover:bg-transparent"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-5 h-5 text-default-900" />
            </Button>
            <span className="text-sm font-medium text-default-900">
              Page {currentPage} of {totalPage}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8 border-transparent hover:bg-transparent"
              onClick={handleNextPage}
              disabled={currentPage >= totalPage}
            >
              <ChevronRight className="w-5 h-5 text-default-900" />
            </Button>
          </div>
        </ul>
      </Card>
    </div>
  );
};

export default InpersonCoachingTab;
