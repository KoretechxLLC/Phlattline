"use client";
import React from "react";
import AddPositionForm from "@/app/components/addPositionForm";
import InterviewSchedulerTab from "@/app/components/interviewScheduler";
import NewHiringTab from "@/app/components/newHiringTab";
import AvailableJobsTab from "@/app/components/availableJobsTab";
import OpenPositionChart from "@/app/components/openPositionChart";

const TalentAcquisitions = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* First Row */}
      <div className="md:col-span-1">
        <AddPositionForm />
      </div>
      <div className="md:col-span-1">
        <InterviewSchedulerTab />
      </div>

      {/* Second Row */}
      <div className="">
        <NewHiringTab />
      </div>
      <div className="">
        <AvailableJobsTab />
      </div>
      <div className="md:col-span-1">
        <OpenPositionChart />
      </div>
    </div>
  );
};

export default TalentAcquisitions;
