"use client";
import React, { useState } from "react";
import { Button } from "@/app/components/button-sidebar";
import ProfileSettings from "@/app/Portal/Settings/ProfileSettings/page";
import BillingMethod from "@/app/Portal/Settings/BillingMethod/page";

const Settings = () => {
  const [activeTab, setActiveTab] = useState<string>("profilesettings");

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
    <div className="lg:my-24 5xl:my-0">
      <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 justify-start items-start my-2">
        {/* Profile Settings */}
        <div className="relative">
          <Button
            className={`text-md md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6 ${
              activeTab === "profilesettings" ? "text-red-500" : "text-default"
            }`}
            onClick={() => setActiveTab("profilesettings")}
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
              activeTab === "billingmethod" ? "text-red-500" : "text-default"
            }`}
            onClick={() => setActiveTab("billingmethod")}
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
  );
};

export default Settings;
