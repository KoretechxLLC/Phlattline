"use client";
import React, { useState } from "react";
import { Button } from "@/app/components/button-sidebar";
import AssessmentsReport from "@/app/Portal/Reports/AssessmentsReport/page";
import CoursesReport from "@/app/Portal/Reports/CourseReport/page";
import PerformanceManagementReport from "@/app/Portal/Reports/PerformanceManagementReport/page";
import Spinner from "@/app/components/Spinner"; // Import your spinner component

const Reports = () => {
  const [activeTab, setActiveTab] = useState<string>("Courses");
  const [loading, setLoading] = useState<boolean>(false); // Initialize loading state

  const handleTabChange = (tab: string) => {
    setLoading(true); // Set loading to true when changing tabs
    setActiveTab(tab);

    // Simulate a loading delay (e.g., fetching data)
    setTimeout(() => {
      setLoading(false); // Set loading to false after the delay
    }, 500); // Adjust the delay as needed
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Courses":
        return <CoursesReport />;
      case "Assessments":
        return <AssessmentsReport />;
      case "PerformanceManagement":
        return <PerformanceManagementReport />;
      default:
        return null; // Handle default case
    }
  };

  return (
    <div className="4xl:my-0 lg:my-24 5xl:my-0 relative">
      {loading ? (
        <div className="text-center text-gray-300">
          <Spinner height="20vh" /> {/* Adjust the spinner as needed */}
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 justify-start items-start my-2">
            {/* Courses Button */}
            <Button
              className="text-md md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6"
              color={activeTab === "Courses" ? "primary" : "default"}
              onClick={() => handleTabChange("Courses")}
            >
              Courses
            </Button>

            {/* Assessments Button */}
            <Button
              className="text-md md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6"
              color={activeTab === "Assessments" ? "primary" : "default"}
              onClick={() => handleTabChange("Assessments")}
            >
              Assessments
            </Button>

            {/* Performance Management Button */}
            <Button
              className="text-md md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6"
              color={
                activeTab === "PerformanceManagement" ? "primary" : "default"
              }
              onClick={() => handleTabChange("PerformanceManagement")}
            >
              Performance Management
            </Button>
          </div>

          {/* Render Content Based on Active Tab */}
          <div className="content border border-gray-500 rounded-xl h-full w-full 4xl:p-3 p-3 md:p-3">
            {renderContent()}
          </div>
        </>
      )}
    </div>
  );
};

export default Reports;
