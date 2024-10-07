import React from "react";
import SideBar from "@/app/components/SideBar";
import Header from "@/app/components/Header";
import EditWidget from "@/app/components/EditWidget";

const TalentManagement = () => {
  return (
    <div className="flex flex-row h-screen">
      <div className="flex-grow">
        {" "}
        <Header
          HeadingText="Hey Jack"
          HeadingDesc="Complete this assessment to measure your progress and refine your skills"
        />
      </div>
      <div className="flex-shrink-0 ">
        {" "}
        <SideBar />
      </div>
    </div>
  );
};

export default TalentManagement;
