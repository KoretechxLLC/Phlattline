"use client";
import React, { useState } from "react";
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

  const [selectedJob, setSelectedJob] = useState(null); // State to hold selected job

  // Callback to handle edit button click
  const handleEditJob = (job: any) => {
    setSelectedJob(job); // Set the job to be edited
  };

  // Callback to clear selected job after updating or clearing
  const clearSelectedJob = () => {
    setSelectedJob(null); // Reset the state
  };


  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-2 p-1">
      {/* First Row */}
      <div className="md:col-span-1">
        <AddPositionForm job={selectedJob} clearSelectedJob={clearSelectedJob} />

      </div>
      <div className="md:col-span-2">
        <InterviewSchedulerTab />
      </div>

      {/* Second Row */}
      <div>
        <VacantJobs onEditJob={handleEditJob} />
      </div>
      <div>
        <OpenPositionChart />
      </div>
      <div>
        <EmployeesTab
          title="New Hiring"
          employees={newHirings}
          showBadge={true} // To display the "Onboard" badge
          hideViewAll={true} // Hides the "View All" button and modal
        />
      </div>
    </div>
  );
};

export default TalentAcquisitions;
