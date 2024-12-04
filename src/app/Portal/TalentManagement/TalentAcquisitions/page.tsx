"use client";
import React from "react";
import AddPositionForm from "@/app/components/addPositionForm";
import InterviewSchedulerTab from "@/app/components/interviewScheduler";
import OpenPositionChart from "@/app/components/openPositionChart";
import EmployeesTab from "@/app/components/employeesTab";
import VacantJobs from "@/app/components/VacantJobs";
const jobs = [
  { id: 1, title: "Finance Officer" },
  { id: 2, title: "Taxation" },
];
const newHirings = [
  {
    image: "/assets/DummyImg.png",
    name: "John Doe",
    designation: "Software Engineer",
    status: "Onboard",
  },
  {
    image: "/assets/DummyImg.png",
    name: "Jane Smith",
    designation: "Product Manager",
    status: "Onboard",
  },
  {
    image: "/assets/DummyImg.png",
    name: "Dane Jones",
    designation: "Finance Officer",
    status: "Onboard",
  },
];

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
        <EmployeesTab
          title="New Hiring"
          employees={newHirings}
          showBadge={true} // To display the "Onboard" badge
          hideViewAll={true} // Hides the "View All" button and modal
        />
      </div>
      <div className="">
        <VacantJobs jobs={jobs} />
      </div>
      <div className="md:col-span-1">
        <OpenPositionChart />
      </div>
    </div>
  );
};

export default TalentAcquisitions;
