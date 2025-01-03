"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/app/components/button-sidebar";
import AssessmentsCatalogue from "@/app/Portal/Assessments/AssessmentCatalogue/page";
import IndividualAssessments from "@/app/Portal/Assessments/AssessmentCatalogue/IndividualAssessments/page";
import RecommendedAssessments from "@/app/Portal/Assessments/AssessmentCatalogue/RecommendedAssessments/page";
import OrganizationAssessments from "@/app/Portal/Assessments/AssessmentCatalogue/OrganizationAssesments/page";
import TeamAssessments from "@/app/Portal/Assessments/AssessmentCatalogue/TeamAssessments/page";

import MyAssessments from "./MyAssessments/page";
import AssessmentResults from "./AssessmentResults/page";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Assessments = () => {
  const [activeTab, setActiveTab] = useState<string>("catalogue");
  const [loading, setLoading] = useState<boolean>(false); // Initialize loading state
  const { userData } = useSelector((state: RootState) => state.auth);
  const userType = userData?.user_type_id;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const view = urlParams.get("view");

    // Set the active tab based on query parameter
    if (view === "recommended") {
      setActiveTab("recommendedAssessments");
    } else if (view === "individual") {
      setActiveTab("individualAssessments");
    } else if (view === "organization") {
      setActiveTab("organizationAssessments");
    } else if (view === "team") {
      setActiveTab("teamAssessments");
    } else if (view === "myAssessments" || userType === 3) {
      setActiveTab("myAssessments");
    } else {
      setActiveTab("catalogue");
    }
  }, [userType]);

  const renderContent = () => {
    switch (activeTab) {
      case "catalogue":
        if (userType === 1 || userType === 2) {
          return (
            <AssessmentsCatalogue
              onViewAll={(view: any) => {
                switch (view) {
                  case "individual":
                    setActiveTab("individualAssessments");
                    break;
                  case "recommended":
                    setActiveTab("recommendedAssessments");
                    break;
                  case "organization":
                    if (userType === 2) {
                      setActiveTab("organizationAssessments");
                    }
                    break;
                  case "team":
                    if (userType === 2) {
                      setActiveTab("teamAssessments");
                    }
                    break;
                  default:
                    break;
                }
              }}
            />
          );
        }
      case "individualAssessments":
        return <IndividualAssessments />;
      case "recommendedAssessments":
        return <RecommendedAssessments />;
      case "organizationAssessments":
        return userType === 2 ? <OrganizationAssessments /> : null;
      case "teamAssessments":
        return userType === 2 ? <TeamAssessments /> : null;
      case "myAssessments":
        return <MyAssessments />;
      case "results":
        return <AssessmentResults />;
      default:
        return null; // Handle default case
    }
  };

  useEffect(() => {
    setLoading(true); // Start loading when the active tab changes
    const timer = setTimeout(() => {
      setLoading(false); // Stop loading after a delay
    }, 500); // Simulate loading time (adjust as needed)

    return () => clearTimeout(timer);
  }, [activeTab]);

  return (
    <div className="lg:my-0 5xl:my-0">
      <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 justify-start items-start my-2">
        {/* Assessment Catalogue Button */}
        {(userType === 1 || userType === 2) && (
          <Button
            className="text-md md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6"
            color={
              activeTab === "catalogue" ||
              activeTab === "individualAssessments" ||
              activeTab === "recommendedAssessments" ||
              activeTab === "TeamAssessments" ||
              activeTab === "OrganizationAssesments"
                ? "primary"
                : "default"
            }
            onClick={() => setActiveTab("catalogue")}
          >
            Assessment Catalogue
          </Button>
        )}

        {/* My Assessments Button */}
        <Button
          className="text-md md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6"
          color={activeTab === "myAssessments" ? "primary" : "default"}
          onClick={() => setActiveTab("myAssessments")}
        >
          My Assessments
        </Button>

        {/* Assessment Results Button */}
        <Button
          className="text-md md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6"
          color={activeTab === "results" ? "primary" : "default"}
          onClick={() => setActiveTab("results")}
        >
          Assessment Results
        </Button>
      </div>
      {/* Render Content Based on Active Tab */}
      <div className="content border border-[#62626280] rounded-xl h-full w-full p-3 md:p-6 relative">
        {renderContent()}
      </div>
    </div>
  );
};

export default Assessments;
