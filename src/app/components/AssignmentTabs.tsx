"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/app/components/Card";
import { Button } from "@/app/components/button-sidebar";
import Spinner from "@/app/components/Spinner";
import Image from "next/image";
import Icon from "./utility-icon";

// Static array of items with title and description
const assignmentItems = [
  {
    title: "Goal Setting",
    description: "Define personal goals for the quarter.",
  },
  {
    title: "Team Collaboration",
    description: "Enhance collaboration across departments.",
  },
  {
    title: "Skill Development",
    description: "Focus on upskilling for career growth.",
  },
];

const AssignmentTabs: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulate loading delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex overflow-x-auto space-x-4">
      {loading ? (
        <Card className="w-full h-full 4xl:p-4 p-8 bg-gradient-to-b from-[#62626280] to-[#2D2C2C80]">
          <Spinner height="5vh" />
        </Card>
      ) : (
        <>
          {/* Render each assignment item as a card */}
          {assignmentItems.map((item, index) => (
            <Card
              key={index}
              className="min-w-[300px] w-full 4xl:py-3 4xl:px-6 py-7 px-12 bg-gradient-to-b from-[#62626280] to-[#2D2C2C80]"
            >
              <CardContent className="flex flex-col justify-between h-full">
                <ul className="space-y-2">
                  <li className="5xl:text-md 4xl:text-sm lg:text-xl font-semibold">
                    {item.title}
                  </li>
                  <li className="5xl:text-md 4xl:text-sm lg:text-lg text-gray-200">
                    {item.description}
                  </li>
                </ul>
                <div className="mt-4 flex justify-end">
                  <Button color="primary" className="rounded-3xl">
                    Take Assessment
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Extra tab at the end */}
          <Card className="min-w-[200px] w-full 4xl:py-3 4xl:px-6 py-7 px-12 bg-gradient-to-b from-[#B50D34] to-[#BAA716]">
            <CardContent className="flex flex-col justify-center items-center h-full">
              <Icon
                icon={"mingcute:arrow-right-up-circle-fill"}
                className="w-24 h-24"
              />
              <span className="5xl:text-md 4xl:text-sm lg:text-xl font-semibold text-gray-200">
                Retake Assessments
              </span>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default AssignmentTabs;
