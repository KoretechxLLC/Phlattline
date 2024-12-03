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
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("profilesettings");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  );

  const userType = userData?.user_type_id;

  useEffect(() => {
    // Function to get the active tab from the URL
    const getTabFromUrl = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const view = urlParams.get("view");
      return (
        view || (userType === 2 ? "organizationsetting" : "profilesettings")
      );
    };

    // Set the active tab based on the URL query param or fallback to default
    setActiveTab(getTabFromUrl());

    // Listen for changes in the URL query param
    const handleUrlChange = () => {
      setActiveTab(getTabFromUrl());
    };

    // Listen for popstate event to detect back/forward navigation
    window.addEventListener("popstate", handleUrlChange);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("popstate", handleUrlChange);
    };
  }, [userType]);

  const handleTabChange = (tab: string) => {
    setLoading(true);
    setActiveTab(tab);

    // Simulate loading delay
    setTimeout(() => {
      setLoading(false);
    }, 500);

    // Update the URL with the new active tab (using pushState)
    window.history.pushState(null, "", `?view=${tab}`);
  };

  const handleEmployeeSelect = (employeeId: number) => {
    setSelectedEmployeeId(employeeId);
    setActiveTab("employee");
  };

  const renderContent = () => {
    if (userType === 1 || userType === 3) {
      switch (activeTab) {
        case "profilesettings":
          return <ProfileSettings />;
        case "billingmethod":
          return <BillingMethod />;
        default:
          return <ProfileSettings />;
      }
    } else if (userType === 2) {
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
        default:
          return <OrganizationSetting />;
      }
    }
  };

  return (
    <>
      {loading ? (
        <div className="text-center text-gray-300">
          <Spinner height="30px" width="30px" />
        </div>
      ) : (
        <div className="4xl:my-0 lg:my-24 5xl:my-0">
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 justify-start items-start my-2">
            {(userType === 1 || userType === 3) && (
              <>
                <div className="relative">
                  <Button
                    className={`text-md 4xl:text-sm md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6 ${
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
                <div
                  className="relative"
                  style={{
                    display: userData?.user_type_id === 3 ? "none" : "block",
                  }}
                >
                  <Button
                    className={`text-md 4xl:text-sm md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6 ${
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

            {/* Admin UserType 2 Tabs */}
            {userType === 2 && (
              <>
                {/* Organization Setting */}
                <div className="relative">
                  <Button
                    className={`text-md 4xl:text-sm md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6 ${
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
                    className={`text-md 4xl:text-sm md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6 ${
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
                    className={`text-md 4xl:text-sm md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6 ${
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
                    className={`text-md 4xl:text-sm md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6 ${
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
                    className={`text-md 4xl:text-sm md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6 ${
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
          <div className="content border-t border-[#62626280] rounded-xl h-full w-full p-3 md:p-6">
            {renderContent()}
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
