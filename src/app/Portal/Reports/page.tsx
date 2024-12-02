"use client";
import React, { useState } from "react";
import { Button } from "@/app/components/button-sidebar";
import AssessmentsReport from "@/app/Portal/Reports/AssessmentsReport/page";
import CoursesReport from "@/app/Portal/Reports/CourseReport/page";
import PerformanceManagementReport from "@/app/Portal/Reports/PerformanceManagementReport/page";
import Spinner from "@/app/components/Spinner";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ODaasReport from "./ODaasReport/page";
import TalentManagementReport from "./TalentManagementReport/page";

const Reports = () => {
  const { userData } = useSelector((state: RootState) => state.auth);
  const [activeTab, setActiveTab] = useState<string>("Courses");
  const [loading, setLoading] = useState<boolean>(false);

  const userType = userData?.user_type_id;

  const handleTabChange = (tab: string) => {
    setLoading(true);
    setActiveTab(tab);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Courses":
        return <CoursesReport />;
      case "Assessments":
        return <AssessmentsReport />;
      case "PerformanceManagement":
        return <PerformanceManagementReport />;
      case "TalentManagement":
        return userType === 2 ? <TalentManagementReport /> : null;
      case "ODaas":
        return userType === 2 ? <ODaasReport /> : null;
      default:
        return null;
    }
  };

  const renderButtons = () => {
    const buttons = [
      { label: "Courses", value: "Courses" },
      { label: "Assessments", value: "Assessments" },
      { label: "Performance Management", value: "PerformanceManagement" },
    ];

    if (userType === 2) {
      buttons.push({ label: "Talent Management", value: "TalentManagement" });
      buttons.push({ label: "ODaas", value: "ODaas" });
    }

    return buttons.map((button) => (
      <Button
        key={button.value}
        className="text-md md:text-2xl w-full sm:w-auto rounded-2xl px-4 py-2 sm:px-6"
        color={activeTab === button.value ? "primary" : "default"}
        onClick={() => handleTabChange(button.value)}
      >
        {button.label}
      </Button>
    ));
  };

  return (
    <div className="4xl:my-0 lg:my-24 5xl:my-0 relative">
      {loading ? (
        <div className="flex justify-center items-center w-full h-full py-72">
          <Spinner height="30px" width="30px" />
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 justify-start items-start my-2">
            {renderButtons()}
          </div>

          <div className="content border border-[#62626280] rounded-xl h-full w-full 4xl:p-3 p-3 md:p-3">
            {renderContent()}
          </div>
        </>
      )}
    </div>
  );
};

export default Reports;
