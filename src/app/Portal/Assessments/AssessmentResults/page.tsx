"use client";
import React from "react";
import TasksTracker from "@/app/components/TasksTracker";

const AssessmentResults = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <TasksTracker
        showPending={true}
        showCompleted={false}
        showSaved={false}
        showTooltip={false}
        label={"Assessments"}
        isClickable={false}
      />

      <TasksTracker
        showPending={false}
        showCompleted={true}
        showSaved={false}
        showTooltip={false}
        label={"Assessments"}
        isClickable={false}
      />
      {/* <TasksTracker
        showPending={false}
        showCompleted={false}
        showSaved={true}
        showTooltip={false}
        label={"Assessments"}
        isClickable={false}
      /> */}
    </div>
  );
};

export default AssessmentResults;
