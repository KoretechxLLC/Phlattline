"use client";
import React from "react";
import HighPotentialTab from "@/app/components/employeesTab";
import LDStrategyTab from "@/app/components/ldStrategyTab";
import SuccessionPlanningTab from "@/app/components/successionPlanning";
import EmployeesTab from "@/app/components/employeesTab";

const highPotentialEmployees = [
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
  {
    image: "/assets/DummyImg.png",
    name: "Alice Johnson",
    designation: "Team Lead",
  },
];

const TalentDevelopment = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
      {/* First Row */}
      <div className="md:col-span-1">
        <LDStrategyTab />
      </div>

      {/* Second Row */}
      <div className="md:col-span-1">
        <SuccessionPlanningTab />
      </div>
    </div>
  );
};

export default TalentDevelopment;
