"use client";
import React from "react";
import { Button } from "@/app/components/button-sidebar";
import { CardTitle } from "@/app/components/Card";
import { HoverEffect } from "@/app/components/card-hover-effect";

const individualAssessments: any[] = [
  {
    imageLink: "/assets/AssessmentBanner.svg",
    title: "Personally Assessment",
    link: "#",
    price: 50,
  },
  {
    imageLink: "/assets/AssessmentBanner.svg",
    title: "Problem Solving Abilities",
    link: "#",
    price: 40,
  },
];

const recommendedAssessments: any[] = [
  {
    imageLink: "/assets/AssessmentBanner.svg",
    title: "Cognitive Ability Test",
    link: "#",
    price: 45,
  },
  {
    imageLink: "/assets/AssessmentBanner.svg",
    title: "Career Interest and Values",
    link: "#",
    price: 55,
  },
];

const AssessmentsCatalogue: React.FC<any> = ({ onViewAll }) => {
  return (
    <div className="px-0 md:px-4 grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 w-full h-full">
      {/* Individual Assessments Section */}
      <div className="bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] rounded-xl p-5 w-full">
        <CardTitle className="text-xl">Individual Assessments</CardTitle>
        <HoverEffect
          items={individualAssessments} // Show subset
          className="grid grid-cols-1 md:grid-cols-2 gap-2"
        />
        <Button
          className="text-white px-5 flex w-full justify-center items-center rounded-3xl mt-4"
          size="default"
          color="primary"
          onClick={() => onViewAll("individual")}
        >
          View All
        </Button>
      </div>

      {/* Recommended Assessments Section */}
      <div className="bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] rounded-xl p-5 w-full">
        <CardTitle className="text-xl">Recommended Assessments</CardTitle>
        <HoverEffect
          items={recommendedAssessments} // Show subset
          className="grid grid-cols-1 md:grid-cols-2 gap-2"
        />
        <Button
          className="text-white px-5 flex w-full justify-center items-center rounded-3xl mt-4"
          size="default"
          color="primary"
          onClick={() => onViewAll("recommended")}
        >
          View All
        </Button>
      </div>
    </div>
  );
};

export default AssessmentsCatalogue;
