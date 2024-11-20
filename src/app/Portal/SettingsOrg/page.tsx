"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/app/components/button-sidebar";
import Spinner from "@/app/components/Spinner"; // Import your spinner component
import OrganizationSetting from "./OrganizationSetting/page";
import EmployeeSetting from "@/app/components/employeeSettings";
import BillingMethod from "./BillingMethod/page";
import AccessControl from "./AccessControl/page";
import SystemLogs from "./SystemLogs/page";
import Departments from "./Departments/page";
import ProfilePage from "@/app/components/profilePage";

const Settings = () => {
  const [activeTab, setActiveTab] = useState<string>("organization setting");
  const [loading, setLoading] = useState<boolean>(false); // Initialize loading state
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  );

  const handleTabChange = (tab: string) => {
    setLoading(true); // Set loading to true when changing tabs
    setActiveTab(tab);

    // Simulate a loading delay (e.g., fetching data)
    setTimeout(() => {
      setLoading(false); // Set loading to false after the delay
    }, 500); // Adjust the delay as needed
  };

  const handleEmployeeSelect = (employeeId: number) => {
    setSelectedEmployeeId(employeeId);
    setActiveTab("Employee");
  };

  const renderContent = () => {
    if (activeTab === "Employee" && selectedEmployeeId) {
      return <ProfilePage employeeId={selectedEmployeeId} />;
    }
    switch (activeTab) {
      case "organization setting":
        return <OrganizationSetting />;
      case "employee setting":
        return <EmployeeSetting onEmployeeSelect={handleEmployeeSelect} />;
      case "billing method":
        return <BillingMethod />;
      case "access control":
        return <AccessControl />;
      case "system logs":
        return <SystemLogs />;
      case "departments":
        return <Departments />;
      default:
        return null; // Handle default case
    }
  };

  return (
    <>
      {loading ? (
        <div className="text-center text-gray-300">
          <Spinner height="20vh" /> {/* Adjust the spinner as needed */}
        </div>
      ) : (
        <div className="4xl:my-0 lg:my-24 5xl:my-0">
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 justify-start items-start my-2">
            {/* Organization Setting */}
            <div className="relative">
              <Button
                className={`text-md md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6 ${
                  activeTab === "organization setting"
                    ? "text-red-500"
                    : "text-default"
                }`}
                onClick={() => handleTabChange("organization setting")}
              >
                Organization Setting
              </Button>
              {activeTab === "organization setting" && (
                <div className="absolute left-0 right-0 h-1 bg-red-500 mt-1" />
              )}
            </div>

            {/* Employee Setting */}
            <div className="relative">
              <Button
                className={`text-md md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6 ${
                  activeTab === "employee setting"
                    ? "text-red-500"
                    : "text-default"
                }`}
                onClick={() => handleTabChange("employee setting")}
              >
                Employee Setting
              </Button>
              {activeTab === "employee setting" && (
                <div className="absolute left-0 right-0 h-1 bg-red-500 mt-1" />
              )}
            </div>

            {/* Billing Method */}
            <div className="relative">
              <Button
                className={`text-md md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6 ${
                  activeTab === "billing method"
                    ? "text-red-500"
                    : "text-default"
                }`}
                onClick={() => handleTabChange("billing method")}
              >
                Billing Method
              </Button>
              {activeTab === "billing method" && (
                <div className="absolute left-0 right-0 h-1 bg-red-500 mt-1" />
              )}
            </div>

            {/* Access Control */}
            <div className="relative">
              <Button
                className={`text-md md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6 ${
                  activeTab === "access control"
                    ? "text-red-500"
                    : "text-default"
                }`}
                onClick={() => handleTabChange("access control")}
              >
                Access Control
              </Button>
              {activeTab === "access control" && (
                <div className="absolute left-0 right-0 h-1 bg-red-500 mt-1" />
              )}
            </div>

            {/* System Logs */}
            <div className="relative">
              <Button
                className={`text-md md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6 ${
                  activeTab === "system logs" ? "text-red-500" : "text-default"
                }`}
                onClick={() => handleTabChange("system logs")}
              >
                System Logs
              </Button>
              {activeTab === "system logs" && (
                <div className="absolute left-0 right-0 h-1 bg-red-500 mt-1" />
              )}
            </div>

            {/* Departments */}
            <div className="relative">
              <Button
                className={`text-md md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6 ${
                  activeTab === "departments" ? "text-red-500" : "text-default"
                }`}
                onClick={() => handleTabChange("departments")}
              >
                Departments
              </Button>
              {activeTab === "departments" && (
                <div className="absolute left-0 right-0 h-1 bg-red-500 mt-1" />
              )}
            </div>
          </div>

          {/* Render Content Based on Active Tab */}
          <div className="content border-t border-gray-500 rounded-xl h-full w-full p-3 md:p-6">
            {renderContent()}
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
