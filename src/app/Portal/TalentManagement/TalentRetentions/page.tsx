"use client";
import React from "react";
import HighPotentialTab from "@/app/components/highPotentialTab";
import ExitInterviewTab from "@/app/components/exitInterviewTabs";
import TriageTab from "@/app/components/triageTab";
import EmployeesListTab from "@/app/components/employeesList";
import EmployeeDataTab from "@/app/components/employeeDataTab";

const TalentRetentions = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* First Row */}
      <div>
        <HighPotentialTab />
      </div>
      <div>
        <EmployeeDataTab />
      </div>
      <div>
        <EmployeesListTab />
      </div>
      <div>
        <ExitInterviewTab />
      </div>
      <div>
        <TriageTab />
      </div>
    </div>
  );
};

export default TalentRetentions;
