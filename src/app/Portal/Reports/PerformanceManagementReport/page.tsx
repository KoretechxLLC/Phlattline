"use client";
import React from "react";
import TasksTracker from "@/app/components/TasksTracker";
import EmpRating from "@/app/components/emprating";
import VacantJobs from "@/app/components/vacantjobs";

const PerformanceManagementReport = () => {
  const jobs = [
    { id: 1, title: "Finance Officer" },
    { id: 2, title: "Taxation" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    
      {/* Pending Goals */}
      <div className="flex-1">
        <TasksTracker
          showPending={true}
          showCompleted={false}
          showSaved={false}
          showTooltip={false}
          label={"Goals"}
          isClickable={false}
        />
      </div>

      {/* Completed Goals */}
      <div className="flex-1">
        <TasksTracker
          showPending={false}
          showCompleted={true}
          showSaved={false}
          showTooltip={false}
          label={"Goals"}
          isClickable={false}
        />
      </div>

      {/* Rating Box */}
      <div className="flex-1">
        <EmpRating rating={4.8} />
      </div>


  {/* Vacant Jobs on the Left */}
  <div className="md:col-span-1">
        <VacantJobs jobs={jobs} />
      </div>


    </div>
  );
};

export default PerformanceManagementReport;
