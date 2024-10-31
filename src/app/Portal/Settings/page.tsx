"use client";
import React, { useState } from "react";
import { Button } from "@/app/components/button-sidebar";
import ProfileSettings from "@/app/Portal/Settings/ProfileSettings/page";
import BillingMethod from "@/app/Portal/Settings/BillingMethod/page";
import Spinner from "@/app/components/Spinner"; // Import your spinner component

const Settings = () => {
  const [activeTab, setActiveTab] = useState<string>("profilesettings");
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
      case "profilesettings":
        return <ProfileSettings />;
      case "billingmethod":
        return <BillingMethod />;
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
            {/* Profile Settings */}
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
