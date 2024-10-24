"use client";
import React from "react";
import { HoverEffect } from "@/app/components/card-hover-effect";
import { CardTitle } from "@/app/components/Card";

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
    <div className="w-full mx-auto  px-8">
      <CardTitle>Individual Assessments</CardTitle>
      <HoverEffect
        className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2"
        items={projects}
      />
    </div>
  );
};

export default AssessmentsCatalogue;
