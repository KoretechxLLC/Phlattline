"use client";
import React from "react";
import EmployeesTab from "@/app/components/employeesTab";

import EmployeesListTab from "@/app/components/employeesList";
import EmployeeDataTab from "@/app/components/employeeDataTab";

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

const exitInterviewEmployees = [
  {
    image: "/assets/DummyImg.png",
    name: "John Doe",
    designation: "Software Engineer",
    status: "Completed",
  },
  {
    image: "/assets/DummyImg.png",
    name: "Jane Smith",
    designation: "Product Manager",
    status: "Completed",
  },
  {
    image: "/assets/DummyImg.png",
    name: "Jane Smith",
    designation: "Product Manager",
    status: "Completed",
  },
];

const triageEmployees = [
  {
    image: "/assets/DummyImg.png",
    name: "John Doe",
    reason: "Want to leave organisation",
  },
  {
    image: "/assets/DummyImg.png",
    name: "Jane Smith",
    reason: "Not Satisfied",
  },
];

const TalentRetentions = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* First Row */}
        <div>
          <EmployeesTab
            title="High Potential Employees"
            employees={highPotentialEmployees}
          />
        </div>

        <div>
          <EmployeesTab
            title="Exit Interview Tab"
            employees={exitInterviewEmployees}
            showBadge={true}
          />
        </div>
        <div>
          <EmployeesTab
            title="Triage"
            employees={triageEmployees}
            showReason={true}
          />
        </div>

        {/* Second Row */}
      </div>
      <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="col-span-1">
          <EmployeesListTab />
        </div>
        <div className="col-span-2">
          <EmployeeDataTab />
        </div>
      </div>
    </div>
  );
};

export default TalentRetentions;