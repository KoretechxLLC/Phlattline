"use client";
import React, { useState } from "react";
import { Button } from "@/app/components/button-sidebar";
import EmployeeDetail from "../../components/employeeDetail";
import PerformanceReview from "../../components/performanceReview";
import Report from "./Report/page";
import Supervisor from "./Supervisor/page";
import Spinner from "@/app/components/Spinner";
import Employee from "./Employee/page";

const PerformanceManagement = () => {
  const [activeTab, setActiveTab] = useState<string>("Employee");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  );
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleTabChange = (tab: string) => {
    setLoading(true);
    setActiveTab(tab);
    setSelectedEmployeeId(null); // Reset selected employee when switching tabs

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const handleEmployeeSelect = (employeeId: number) => {
    setSelectedEmployeeId(employeeId);
    setActiveTab("Performance Review");
  };

  const handleDepartmentSelect = (employeeId: number) => {
    setSelectedDepartmentId(employeeId);
    setActiveTab("Performance Review");
  };

  const renderContent = () => {
    if (activeTab === "Performance Review" && selectedEmployeeId) {
      return (
        <EmployeeDetail
          employeeId={selectedEmployeeId}
          departmentId={selectedDepartmentId}
        />
      );
    }

    switch (activeTab) {
      case "Employee":
        return <Employee />;
      case "Performance Review":
        return (
          <PerformanceReview
            onEmployeeSelect={handleEmployeeSelect}
            onDepartmentSelect={handleDepartmentSelect}
          />
        );
      case "Supervisor":
        return <Supervisor />;
      case "Report":
        return <Report />;
      default:
        return null;
    }
  };

  return (
    <div className="4xl:my-0 lg:my-24 5xl:my-0 relative">
      {loading ? (
        <div className="text-center text-gray-300">
          <Spinner height="30px" width="30px" />
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 justify-start items-start my-2">
            <Button
              className="text-md 4xl:text-sm md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6"
              color={activeTab === "Employee" ? "primary" : "default"}
              onClick={() => handleTabChange("Employee")}
            >
              Employee
            </Button>
            <Button
              className="text-md 4xl:text-sm md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6"
              color={activeTab === "Performance Review" ? "primary" : "default"}
              onClick={() => handleTabChange("Performance Review")}
            >
              Performance Review
            </Button>

            <Button
              className="text-md 4xl:text-sm md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6"
              color={activeTab === "Supervisor" ? "primary" : "default"}
              onClick={() => handleTabChange("Supervisor")}
            >
              Supervisor/Manager
            </Button>

            <Button
              className="text-md 4xl:text-sm md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6"
              color={activeTab === "Report" ? "primary" : "default"}
              onClick={() => handleTabChange("Report")}
            >
              Report
            </Button>
          </div>

          <div className="content border border-[#62626280] rounded-xl h-full w-full 4xl:p-3 p-3 md:p-3">
            {renderContent()}
          </div>
        </>
      )}
    </div>
  );
};

export default PerformanceManagement;
