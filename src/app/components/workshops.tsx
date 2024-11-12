"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";
import { Button } from "./button-sidebar";
import Image from "next/image";

const Workshops = () => {
  // Static array of workshop data
  const workshops = [
    {
      image: "/assets/WorkshopImage.png",
      title: "AI and Virtual",
    },
    {
      image: "/assets/WorkshopImage.png",
      title: "Leadership Development",
    },
    {
      image: "/assets/WorkshopImage.png",
      title: "Team Building",
    },
  ];

  return (
    <div>
      <Card className="border border-gray-400 p-16 bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80]">
        <CardHeader>
          <CardTitle>Workshops</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-12 ">
            {workshops.map((workshop, index) => (
              <div key={index}>
                <Image
                  src={workshop.image}
                  width={1000}
                  height={1000}
                  alt={workshop.title}
                  className="w-48 h-24 object-cover"
                />
                <span className="block text-lg font-semibold mt-2">
                  {workshop.title}
                </span>
                <Button color="primary">View</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Workshops;
