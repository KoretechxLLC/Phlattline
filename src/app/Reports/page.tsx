import React from "react";
import SideBar from "@/app/components/SideBar";
import Header from "@/app/components/Header";
import EditWidget from "@/app/components/EditWidget";

const Reports = () => {
  return (
    <div className="flex flex-row h-screen">
      <div className="flex-grow">
        {" "}
        <Header HeadingText="Reports" />
      </div>
      <div className="flex-shrink-0">
        {" "}
        <SideBar />
      </div>
    </div>
  );
};

export default Reports;
