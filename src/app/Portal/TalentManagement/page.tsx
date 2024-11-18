"use client";
import React, { useState } from "react";
import { Button } from "@/app/components/button-sidebar";
import TalentAcquisitions from "./TalentAcquisitions/page";
import TalentDevelopment from "./TalentDevelopment/page";
import TalentRetentions from "./TalentRetentions/page";

const TalentManagement = () => {
  const [activeTab, setActiveTab] = useState<string>("Talent Acquisitions");
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
      case "Talent Acquisitions":
        return <TalentAcquisitions />;
      case "Talent Development":
        return <TalentDevelopment />;
      case "Talent Retentions":
        return <TalentRetentions />;
      default:
        return null; // Handle default case
    }
  };

  return (
    <div className="4xl:my-0 lg:my-24 5xl:my-0 relative">
      <>
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 justify-start items-start my-2">
          {/* Courses Button */}
          <Button
            className="text-md md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6"
            color={activeTab === "Talent Acquisitions" ? "primary" : "default"}
            onClick={() => handleTabChange("Talent Acquisitions")}
          >
            Talent Acquisitions
          </Button>

          {/* Assessments Button */}
          <Button
            className="text-md md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6"
            color={activeTab === "Talent Development" ? "primary" : "default"}
            onClick={() => handleTabChange("Talent Development")}
          >
            Talent Development
          </Button>

          {/* Performance Management Button */}
          <Button
            className="text-md md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6"
            color={activeTab === "Talent Retentions" ? "primary" : "default"}
            onClick={() => handleTabChange("Talent Retentions")}
          >
            Talent Retentions
          </Button>
        </div>

        {/* Render Content Based on Active Tab */}
        <div className="content border border-gray-500 rounded-xl h-full w-full 4xl:p-3 p-2 md:p-2">
          {renderContent()}
        </div>
      </>
    </div>
  );
};

export default TalentManagement;
