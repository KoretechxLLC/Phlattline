"use client";
import React, { useState } from "react";
import { Button } from "@/app/components/button-sidebar";
import Diagnostics from "./Diagnostics/page";
import DataCollection from "./DataCollection/page";
import GapAnalysis from "./GapAnalysis/page";
import DesigningInterventions from "./DesigningInterventions/page";
import ManagingChange from "./ManagingChange/page";
import ProgramEvolutions from "./ProgramEvolutions/page";

const OdaasStrategic = () => {
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
      case "Diagnostics":
        return <Diagnostics />;
      case "Data Collection":
        return <DataCollection />;
      case "Gap Analysis and Feedback":
        return <GapAnalysis />;
      case "Designing Interventions":
        return <DesigningInterventions />;
      case "Managing Change":
        return <ManagingChange />;
      case "Program Evolutions":
        return <ProgramEvolutions />;
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
            color={activeTab === "Diagnostics" ? "primary" : "default"}
            onClick={() => handleTabChange("Diagnostics")}
          >
            Diagnostics
          </Button>

          {/* Assessments Button */}
          <Button
            className="text-md md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6"
            color={activeTab === "Data Collection" ? "primary" : "default"}
            onClick={() => handleTabChange("Data Collection")}
          >
            Data Collection
          </Button>

          {/* Performance Management Button */}
          <Button
            className="text-md md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6"
            color={
              activeTab === "Gap Analysis and Feedback" ? "primary" : "default"
            }
            onClick={() => handleTabChange("Gap Analysis and Feedback")}
          >
            Gap Analysis and Feedback
          </Button>
          <Button
            className="text-md md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6"
            color={
              activeTab === "Designing Interventions" ? "primary" : "default"
            }
            onClick={() => handleTabChange("Designing Interventions")}
          >
            Designing Interventions
          </Button>
          <Button
            className="text-md md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6"
            color={activeTab === "Managing Change" ? "primary" : "default"}
            onClick={() => handleTabChange("Managing Change")}
          >
            Managing Change
          </Button>
          <Button
            className="text-md md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6"
            color={activeTab === "Program Evolutions" ? "primary" : "default"}
            onClick={() => handleTabChange("Program Evolutions")}
          >
            Program Evolutions
          </Button>
        </div>

        {/* Render Content Based on Active Tab */}
        <div className="content border border-gray-500 rounded-xl h-full w-full 4xl:p-3 p-3 md:p-3">
          {renderContent()}
        </div>
      </>
    </div>
  );
};

export default OdaasStrategic;
