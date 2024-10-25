"use client";
import React, { useState } from "react";
import { Button } from "@/app/components/button-sidebar";
import AssessmentsReport from "@/app/Portal/Reports/AssessmentsReport/page";
import CoursesReport from "@/app/Portal/Reports/CourseReport/page";
import PerformanceManagementReport from "@/app/Portal/Reports/PerformanceManagementReport/page";

const Reports = () => {
  const [activeTab, setActiveTab] = useState<string>("Courses");

  const renderContent = () => {
    switch (activeTab) {
      case "Courses":
        return <CoursesReport />; // Add return here
      case "Assessments":
        return <AssessmentsReport />; // Add return here
      case "PerformanceManagement":
        return <PerformanceManagementReport />; // Add return here
      default:
        return null; // Handle default case
    }
  };

  return (
    <div className="lg:my-24 5xl:my-0">
      <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 justify-start items-start my-2">
        {/* Courses Button */}
        <Button
          className="text-md md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6"
          color={activeTab === "Courses" ? "primary" : "default"}
          onClick={() => setActiveTab("Courses")}
        >
          Courses
        </Button>

        {/* Assessments Button */}
        <Button
          className="text-md md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6"
          color={activeTab === "Assessments" ? "primary" : "default"}
          onClick={() => setActiveTab("Assessments")}
        >
          Assessments
        </Button>

        {/* Performance Management Button */}
        <Button
          className="text-md md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6"
          color={activeTab === "PerformanceManagement" ? "primary" : "default"}
          onClick={() => setActiveTab("PerformanceManagement")}
        >
          Performance Management
        </Button>
      </div>

      {/* Render Content Based on Active Tab */}
      <div className="content border border-gray-500 rounded-xl h-full w-full p-3 md:p-3">
        {renderContent()}
      </div>
    </div>
  );
};

export default Reports;
