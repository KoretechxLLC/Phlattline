"use client";
import React from "react";
import { HoverEffect } from "@/app/components/card-hover-effect";

const projects: any[] = [
  {
    imageLink: "/assets/AssessmentBanner.svg",
    title: "Personally Assessment",
    link: "#",
  },
  {
    imageLink: "/assets/AssessmentBanner.svg",
    title: "Problem Solving Abilities",
    link: "#",
  },
  {
    imageLink: "/assets/AssessmentBanner.svg",
    title: "Work Ethics and Motivation Test",
    link: "#",
  },
  {
    imageLink: "/assets/AssessmentBanner.svg",
    title: "Project Management Skills",
    link: "#",
  },
  {
    imageLink: "/assets/AssessmentBanner.svg",
    title: "Cognitive Ability Test",
    link: "#",
  },
  {
    imageLink: "/assets/AssessmentBanner.svg",
    title: "Career Interest and Values",
    link: "#",
  },
  {
    imageLink: "/assets/AssessmentBanner.svg",
    title: "Personally Assessment",
    link: "#",
  },
  {
    imageLink: "/assets/AssessmentBanner.svg",
    title: "Problem Solving Abilities",
    link: "#",
  },
];

const Assessments = () => {
  return (
    <div className="w-full mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
};

export default Assessments;
