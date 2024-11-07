"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/app/components/button-sidebar";
import AssessmentsCatalogue from "@/app/Portal/Assessments/AssessmentCatalogue/page";
import MyAssessments from "@/app/Portal/Assessments/myAssessments/page";
import AssessmentResults from "@/app/Portal/Assessments/assessmentResults/page";
import IndividualAssessments from "@/app/Portal/Assessments/AssessmentCatalogue/IndividualAssessments/page";
import RecommendedAssessments from "@/app/Portal/Assessments/AssessmentCatalogue/RecommendedAssessments/page";
import Spinner from "@/app/components/Spinner";

const Assessments = () => {
  const [activeTab, setActiveTab] = useState<string>("catalogue");
  const [loading, setLoading] = useState<boolean>(false); // Initialize loading state

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const view = urlParams.get("view");

    // Set the active tab based on query parameter
    if (view === "recommended") {
      setActiveTab("recommendedAssessments");
    } else if (view === "individual") {
      setActiveTab("individualAssessments");
    } else {
      setActiveTab("catalogue");
    }
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "catalogue":
        return (
          <AssessmentsCatalogue
            onViewAll={(view: any) => {
              if (view === "individual") setActiveTab("individualAssessments");
              if (view === "recommended")
                setActiveTab("recommendedAssessments");
            }}
          />
        );
      case "individualAssessments":
        return <IndividualAssessments />;
      case "recommendedAssessments":
        return <RecommendedAssessments />;
      case "myAssessments":
        return <MyAssessments />;
      case "results":
        return <AssessmentResults />;
      default:
        return null; // Handle default case
    }
  };

  // Use effect to simulate loading when the active tab changes
  useEffect(() => {
    setLoading(true); // Start loading when the active tab changes
    const timer = setTimeout(() => {
      setLoading(false); // Stop loading after a delay
    }, 500); // Simulate loading time (adjust as needed)

    return () => clearTimeout(timer); // Clean up the timer
  }, [activeTab]);

  return (
    <div className="lg:my-0 5xl:my-0">
      <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 justify-start items-start my-2">
        {/* Assessment Catalogue Button */}
        <Button
          className="text-md md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6"
          color={
            activeTab === "catalogue" ||
            activeTab === "individualAssessments" ||
            activeTab === "recommendedAssessments"
              ? "primary"
              : "default"
          }
          onClick={() => setActiveTab("catalogue")}
        >
          Assessment Catalogue
        </Button>

        {/* Assessment Results Button */}
        <Button
          className="text-md md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6"
          color={activeTab === "results" ? "primary" : "default"}
          onClick={() => setActiveTab("results")}
        >
          Assessment Results
        </Button>

        {/* My Assessments Button */}
        <Button
          className="text-md md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6"
          color={activeTab === "myAssessments" ? "primary" : "default"}
          onClick={() => setActiveTab("myAssessments")}
        >
          My Assessments
        </Button>
      </div>
      {/* Render Content Based on Active Tab */}
      <div className="content border border-gray-500 rounded-xl h-full w-full p-3 md:p-6 relative">
        {renderContent()}
      </div>
    </div>
  );
};

export default Assessments;
