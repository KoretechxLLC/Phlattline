import React from "react";
import SideBar from "@/app/components/SideBar";
import Header from "@/app/components/Header";
import EditWidget from "@/app/components/EditWidget";
import Individualassessmentform from "../components/Individualassessmentform";
const Individualassessment = () => {
  return (
    <div>
    <div className="flex flex-row">
      <div className="flex-grow">
        {" "}
        <Header HeadingText="Hey Jack" HeadingDesc="What will you Learn today?" />
      </div>
      <div className="flex-shrink-0">
        {" "}
        <SideBar />
        
      </div>
      
    </div>
    <div>
    <Individualassessmentform/>
    </div>

    </div>
  );
};

export default Individualassessment;
