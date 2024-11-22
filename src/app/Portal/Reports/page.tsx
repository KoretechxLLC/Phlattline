"use client";
import React, { useState } from "react";
import { Button } from "@/app/components/button-sidebar";
import AssessmentsReport from "@/app/Portal/Reports/AssessmentsReport/page";
import CoursesReport from "@/app/Portal/Reports/CourseReport/page";
import PerformanceManagementReport from "@/app/Portal/Reports/PerformanceManagementReport/page";
import Spinner from "@/app/components/Spinner";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ODaasReport from "./ODaasReport/page";

const Reports = () => {
  const { userData } = useSelector((state: RootState) => state.auth);
  const [activeTab, setActiveTab] = useState<string>("Courses");
  const [loading, setLoading] = useState<boolean>(false); // Initialize loading state

  const id = userData?.user_type_id;
  const handleTabChange = (tab: string) => {
    setLoading(true); // Set loading to true when changing tabs
    setActiveTab(tab);

    setTimeout(() => {
      setLoading(false); // Set loading to false after the delay
    }, 500); // Adjust the delay as needed
  };

  const renderContent = () => {
    if (id === 1 || id === 3) {
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
    } else if (id === 2) {
      switch (activeTab) {
        case "Courses":
          return <CoursesReport />;
        case "Assessments":
          return <AssessmentsReport />;
        case "PerformanceManagement":
          return <PerformanceManagementReport />;
        case "ODaas":
          return <ODaasReport />;
        default:
          return null; // Handle default case
      }
    }
  };

  return (
    <div className="4xl:my-0 lg:my-24 5xl:my-0 relative">
      {loading ? (
        <div className="text-center text-gray-300">
          <Spinner height="20vh" />
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 justify-start items-start my-2">
            {id === 1 && (
              <>
                <Button
                  className="text-md md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6"
                  color={activeTab === "Courses" ? "primary" : "default"}
                  onClick={() => handleTabChange("Courses")}
                >
                  Courses
                </Button>

                <Button
                  className="text-md md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6"
                  color={activeTab === "Assessments" ? "primary" : "default"}
                  onClick={() => handleTabChange("Assessments")}
                >
                  Assessments
                </Button>

                <Button
                  className="text-md md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6"
                  color={
                    activeTab === "PerformanceManagement"
                      ? "primary"
                      : "default"
                  }
                  onClick={() => handleTabChange("PerformanceManagement")}
                >
                  Performance Management
                </Button>
              </>
            )}
            {id === 2 && (
              <>
                <Button
                  className="text-md md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6"
                  color={activeTab === "Courses" ? "primary" : "default"}
                  onClick={() => handleTabChange("Courses")}
                >
                  Courses
                </Button>

                <Button
                  className="text-md md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6"
                  color={activeTab === "Assessments" ? "primary" : "default"}
                  onClick={() => handleTabChange("Assessments")}
                >
                  Assessments
                </Button>

                <Button
                  className="text-md md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6"
                  color={
                    activeTab === "PerformanceManagement"
                      ? "primary"
                      : "default"
                  }
                  onClick={() => handleTabChange("PerformanceManagement")}
                >
                  Performance Management
                </Button>
                <Button
                  className="text-md md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6"
                  color={activeTab === "ODaas" ? "primary" : "default"}
                  onClick={() => handleTabChange("ODaas")}
                >
                  ODaas
                </Button>
              </>
            )}
          </div>

          <div className="content border border-gray-500 rounded-xl h-full w-full 4xl:p-3 p-3 md:p-3">
            {renderContent()}
          </div>
        </>
      )}
    </div>
  );
};

export default Reports;
