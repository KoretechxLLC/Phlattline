"use client";
import React from "react";
import EmployeesTab from "@/app/components/employeesTab";

import EmployeesListTab from "@/app/components/employeesList";
import EmployeeDataTab from "@/app/components/employeeDataTab";

const highPotentialEmployees = [
  {
    image: "/assets/UserProfile.png",
    name: "John Doe",
    designation: "Software Engineer",
  },
  {
    image: "/assets/UserProfile.png",
    name: "Jane Smith",
    designation: "Product Manager",
  },
  {
    image: "/assets/UserProfile.png",
    name: "Alice Johnson",
    designation: "Team Lead",
  },
];

const exitInterviewEmployees = [
  {
    image: "/assets/UserProfile.png",
    name: "John Doe",
    designation: "Software Engineer",
    status: "Completed",
  },
  {
    image: "/assets/UserProfile.png",
    name: "Jane Smith",
    designation: "Product Manager",
    status: "Completed",
  },
];

const triageEmployees = [
  {
    image: "/assets/UserProfile.png",
    name: "John Doe",
    reason: "Want to leave organisation",
  },
  {
    image: "/assets/UserProfile.png",
    name: "Jane Smith",
    reason: "Not Satisfied",
  },
];

const TalentRetentions = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* First Row */}
      <div>
        <EmployeesTab
          title="High Potential Employees"
          employees={highPotentialEmployees}
        />
      </div>
      <div>
        <EmployeeDataTab />
      </div>
      <div>
        <EmployeesListTab />
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
    </div>
  );
};

export default TalentRetentions;
