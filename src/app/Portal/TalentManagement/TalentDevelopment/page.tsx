"use client";
import React from "react";
import HighPotentialTab from "@/app/components/highPotentialTab";
import LDStrategyTab from "@/app/components/ldStrategyTab";
import SuccessionPlanningTab from "@/app/components/successionPlanning";

const TalentDevelopment = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* First Row */}
      <div>
        <HighPotentialTab />
      </div>
      <div>
        <LDStrategyTab />
      </div>

      {/* Second Row */}
      <div className="md:col-span-2">
        <SuccessionPlanningTab />
      </div>
    </div>
  );
};

export default TalentDevelopment;
