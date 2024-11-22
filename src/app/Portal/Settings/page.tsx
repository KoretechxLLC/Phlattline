"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/app/components/button-sidebar";
import ProfileSettings from "@/app/Portal/Settings/ProfileSettings/page";
import Spinner from "@/app/components/Spinner"; // Import your spinner component
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import OrganizationSetting from "./OrganizationSetting/page";
import EmployeeSetting from "@/app/components/employeeSettings";
import BillingMethod from "./BillingMethod/page";
import AccessControl from "./AccessControl/page";
import SystemLogs from "./SystemLogs/page";
import Departments from "./Departments/page";
import ProfilePage from "@/app/components/profilePage";

const Settings = () => {
  const { userData } = useSelector((state: RootState) => state.auth);
  const [activeTab, setActiveTab] = useState<string>("profilesettings");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  );

  const id = userData?.user_type_id;

  const handleTabChange = (tab: string) => {
    setLoading(true);
    setActiveTab(tab);

    // Simulate a loading delay (e.g., fetching data)
    setTimeout(() => {
      setLoading(false);
    }, 500); // Adjust the delay as needed
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const view = urlParams.get("view");

    // Set the active tab based on query parameter
    if (view) {
      setActiveTab(view);
    }
  }, []);

  const handleEmployeeSelect = (employeeId: number) => {
    setSelectedEmployeeId(employeeId);
    setActiveTab("employee");
  };

  const renderContent = () => {
    if (id === 1 || id === 3) {
      switch (activeTab) {
        case "profilesettings":
          return <ProfileSettings />;
        case "billingmethod":
          return <BillingMethod />;
        default:
          return <div>Select a tab to get started.</div>;
      }
    } else if (id === 2) {
      if (activeTab === "employee" && selectedEmployeeId) {
        return <ProfilePage employeeId={selectedEmployeeId} />;
      }
      switch (activeTab) {
        case "organizationsetting":
          return <OrganizationSetting />;
        case "employeesetting":
          return <EmployeeSetting onEmployeeSelect={handleEmployeeSelect} />;
        case "billingmethod":
          return <BillingMethod />;
        case "accesscontrol":
          return <AccessControl />;
        case "systemlogs":
          return <SystemLogs />;
        case "departments":
          return <Departments />;
      }
    } else {
      return <div>User type not recognized.</div>;
    }
  };

  return (
    <>
      {loading ? (
        <div className="text-center text-gray-300">
          <Spinner height="20vh" />
        </div>
      ) : (
        <div className="4xl:my-0 lg:my-24 5xl:my-0">
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 justify-start items-start my-2">
            {id === 1 && (
              <>
                <div className="relative">
                  <Button
                    className={`text-md md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6 ${
                      activeTab === "profilesettings"
                        ? "text-red-500"
                        : "text-default"
                    }`}
                    onClick={() => handleTabChange("profilesettings")}
                  >
                    Profile Settings
                  </Button>
                  {activeTab === "profilesettings" && (
                    <div className="absolute left-0 right-0 h-1 bg-red-500 mt-1" />
                  )}
                </div>

                {/* Billing Method */}
                <div className="relative">
                  <Button
                    className={`text-md md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6 ${
                      activeTab === "billingmethod"
                        ? "text-red-500"
                        : "text-default"
                    }`}
                    onClick={() => handleTabChange("billingmethod")}
                  >
                    Billing Method
                  </Button>
                  {activeTab === "billingmethod" && (
                    <div className="absolute left-0 right-0 h-1 bg-red-500 mt-1" />
                  )}
                </div>
              </>
            )}

            {/* Additional Tabs for Admin (ID 2) */}
            {id === 2 && (
              <>
                {/* Organization Setting */}
                <div className="relative">
                  <Button
                    className={`text-md md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6 ${
                      activeTab === "organizationsetting"
                        ? "text-red-500"
                        : "text-default"
                    }`}
                    onClick={() => handleTabChange("organizationsetting")}
                  >
                    Organization Setting
                  </Button>
                  {activeTab === "organizationsetting" && (
                    <div className="absolute left-0 right-0 h-1 bg-red-500 mt-1" />
                  )}
                </div>

                {/* Employee Setting */}
                <div className="relative">
                  <Button
                    className={`text-md md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6 ${
                      activeTab === "employeesetting"
                        ? "text-red-500"
                        : "text-default"
                    }`}
                    onClick={() => handleTabChange("employeesetting")}
                  >
                    Employee Setting
                  </Button>
                  {activeTab === "employeesetting" && (
                    <div className="absolute left-0 right-0 h-1 bg-red-500 mt-1" />
                  )}
                </div>

                {/* Access Control */}
                <div className="relative">
                  <Button
                    className={`text-md md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6 ${
                      activeTab === "accesscontrol"
                        ? "text-red-500"
                        : "text-default"
                    }`}
                    onClick={() => handleTabChange("accesscontrol")}
                  >
                    Access Control
                  </Button>
                  {activeTab === "accesscontrol" && (
                    <div className="absolute left-0 right-0 h-1 bg-red-500 mt-1" />
                  )}
                </div>

                {/* System Logs */}
                <div className="relative">
                  <Button
                    className={`text-md md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6 ${
                      activeTab === "systemlogs"
                        ? "text-red-500"
                        : "text-default"
                    }`}
                    onClick={() => handleTabChange("systemlogs")}
                  >
                    System Logs
                  </Button>
                  {activeTab === "systemlogs" && (
                    <div className="absolute left-0 right-0 h-1 bg-red-500 mt-1" />
                  )}
                </div>

                {/* Departments */}
                <div className="relative">
                  <Button
                    className={`text-md md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6 ${
                      activeTab === "departments"
                        ? "text-red-500"
                        : "text-default"
                    }`}
                    onClick={() => handleTabChange("departments")}
                  >
                    Departments
                  </Button>
                  {activeTab === "departments" && (
                    <div className="absolute left-0 right-0 h-1 bg-red-500 mt-1" />
                  )}
                </div>
              </>
            )}
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
