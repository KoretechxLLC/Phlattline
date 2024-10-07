import React from "react";
import SideBar from "@/app/components/SideBar";
import Header from "@/app/components/Header";
import EditWidget from "@/app/components/EditWidget";

const DailyDose = () => {
  return (
    <div className="flex flex-row h-screen">
      <div className="flex-shrink-0">
        {" "}
        <SideBar />
      </div>
      <div className="flex-grow">
        {" "}
        <Header
          HeadingText="Hey Jack"
          HeadingDesc="What will you Learn today?"
        />
      </div>
    </div>
  );
};

export default DailyDose;
