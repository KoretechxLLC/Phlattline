"use client";
import React from "react";
import { HoverEffect } from "@/app/components/card-hover-effect";
import { CardTitle } from "@/app/components/Card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/app/components/button-sidebar";

const projects: any[] = [
  {
    imageLink: "/assets/AssessmentBanner.svg",
    title: "Personally Assessment",
    link: "#",
    price: 50, // Price added
  },
  {
    imageLink: "/assets/AssessmentBanner.svg",
    title: "Problem Solving Abilities",
    link: "#",
    price: 40, // Price added
  },
  {
    imageLink: "/assets/AssessmentBanner.svg",
    title: "Work Ethics and Motivation Test",
    link: "#",
    price: 60, // Price added
  },
  {
    imageLink: "/assets/AssessmentBanner.svg",
    title: "Project Management Skills",
    link: "#",
    price: 70, // Price added
  },
  {
    imageLink: "/assets/AssessmentBanner.svg",
    title: "Cognitive Ability Test",
    link: "#",
    price: 45, // Price added
  },
  {
    imageLink: "/assets/AssessmentBanner.svg",
    title: "Career Interest and Values",
    link: "#",
    price: 55, // Price added
  },
  {
    imageLink: "/assets/AssessmentBanner.svg",
    title: "Personally Assessment",
    link: "#",
    price: 50, // Price added
  },
  {
    imageLink: "/assets/AssessmentBanner.svg",
    title: "Problem Solving Abilities",
    link: "#",
    price: 40, // Price added
  },
];

const AssessmentsCatalogue = () => {
  return (
    <div className="w-full mx-auto 4xl:px-7 px-8">
      <CardTitle>Recommended Assessments</CardTitle>
      <HoverEffect
        className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2"
        items={projects}
      />
      <div className="flex items-center justify-center gap-2 4xl:py-0 py-4">
        <Button
          variant="outline"
          size="icon"
          className="w-8 h-8 border-transparent hover:bg-transparent"
        >
          <ChevronLeft className="w-5 h-5 text-default-900" />
        </Button>
        <span className="text-sm font-medium text-default-900">1</span>
        <Button
          variant="outline"
          size="icon"
          className="w-8 h-8 border-transparent hover:bg-transparent"
        >
          <ChevronRight className="w-5 h-5 text-default-900" />
        </Button>
      </div>
    </div>
  );
};

export default AssessmentsCatalogue;
