"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/app/components/button-sidebar";
import Diagnostics from "./Diagnostics/page";
import DataCollection from "./DataCollection/page";
import GapAnalysis from "./GapAnalysis/page";
import DesigningInterventions from "./DesigningInterventions/page";
import ManagingChange from "./ManagingChange/page";
import ProgramEvolutions from "./ProgramEvolutions/page";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter, useSearchParams } from "next/navigation";
import Spinner from "@/app/components/Spinner";

const OdaasStrategic = () => {
  const [activeTab, setActiveTab] = useState<string>("Diagnostics");
  const [loading, setLoading] = useState<boolean>(true); // Initialize as true for initial loading
  const defaultWidgets = [
    {
      id: "assesmentResults",
      name: "Assesment Results",
      isVisible: true,
    },
    {
      id: "interviews",
      name: "Interviews",
      isVisible: true,
    },
    {
      id: "performanceReviews",
      name: "Performance Reviews",
      isVisible: true,
    },
    {
      id: "openPositionsDept",
      name: "Open Positions Dept",
      isVisible: true,
    },
    {
      id: "operationalGaps",
      name: "Operational Gaps",
      isVisible: true,
    },
    {
      id: "workLoad",
      name: "workLoadTab",
      isVisible: true,
    },
    {
      id: "courses",
      name: "Courses",
      isVisible: true,
    },
    {
      id: "assesmentTabs",
      name: "Assesment Tabs",
      isVisible: true,
    },
    {
      id: "coachingTab",
      name: "Coaching Tab",
      isVisible: true,
    },
    {
      id: "individualReport",
      name: "individualReport",
      isVisible: true,
    },
    {
      id: "assignCourses",
      name: "Assign Courses",
      isVisible: true,
    },
    {
      id: "taskMonitoring",
      name: "Task Monitoring",
      isVisible: true,
    },
    {
      id: "courseResults",
      name: "Course Results",
      isVisible: true,
    },
    {
      id: "workshops",
      name: "Workshops",
      isVisible: true,
    },
    {
      id: "goalsAchieved",
      name: "Goals Achieved",
      isVisible: true,
    },
    {
      id: "leadersFeedback",
      name: "Leaders Feedback",
      isVisible: true,
    },
  ];
  const { userData } = useSelector((state: RootState) => state.auth);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const initialTab = searchParams.get("tab") || "Diagnostics";
    setActiveTab(initialTab);

    if (userData) {
      if (userData?.user_type_id !== 2) {
        router.back();
      } else {
        setLoading(false);
      }
    }
  }, [searchParams, userData, router]);

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

  if (loading) {
    // Display a loader while loading
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner height="30px" width="30px" />
      </div>
    );
  }

  return (
    <div className="4xl:my-0 lg:my-24 5xl:my-0 relative">
      <>
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 justify-start items-start my-2">
          {/* Courses Button */}
          <Button
            className="text-md 4xl:text-sm md:text-2xl w-full sm:w-auto rounded-2xl 4xl:px-4 px-4 py-2 sm:px-6"
            color={activeTab === "Diagnostics" ? "primary" : "default"}
            onClick={() => handleTabChange("Diagnostics")}
          >
            Diagnostics
          </Button>

          {/* Assessments Button */}
          <Button
            className="text-md 4xl:text-sm md:text-2xl w-full sm:w-auto rounded-2xl 4xl:px-4 px-4 py-2 sm:px-6"
            color={activeTab === "Data Collection" ? "primary" : "default"}
            onClick={() => handleTabChange("Data Collection")}
          >
            Data Collection
          </Button>

          {/* Performance Management Button */}
          <Button
            className="text-md 4xl:text-sm md:text-2xl w-full sm:w-auto rounded-2xl 4xl:px-4 px-4 py-2 sm:px-6"
            color={
              activeTab === "Gap Analysis and Feedback" ? "primary" : "default"
            }
            onClick={() => handleTabChange("Gap Analysis and Feedback")}
          >
            Gap Analysis and Feedback
          </Button>
          <Button
            className="text-md 4xl:text-sm md:text-2xl w-full sm:w-auto rounded-2xl 4xl:px-4 px-4 py-2 sm:px-6"
            color={
              activeTab === "Designing Interventions" ? "primary" : "default"
            }
            onClick={() => handleTabChange("Designing Interventions")}
          >
            Designing Interventions
          </Button>
          <Button
            className="text-md 4xl:text-sm md:text-2xl w-full sm:w-auto rounded-2xl 4xl:px-4 px-4 py-2 sm:px-6"
            color={activeTab === "Managing Change" ? "primary" : "default"}
            onClick={() => handleTabChange("Managing Change")}
          >
            Managing Change
          </Button>
          <Button
            className="text-md 4xl:text-sm md:text-2xl w-full sm:w-auto rounded-2xl 4xl:px-4 px-4 py-2 sm:px-6"
            color={activeTab === "Program Evolutions" ? "primary" : "default"}
            onClick={() => handleTabChange("Program Evolutions")}
          >
            Program Evolutions
          </Button>
        </div>

        {/* Render Content Based on Active Tab */}
        <div className="content border border-[#62626280] rounded-3xl h-full w-full 4xl:p-3 p-3 5xl:p-2 md:p-3">
          {renderContent()}
        </div>
      </>
    </div>
  );
};

export default OdaasStrategic;
