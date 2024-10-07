import React from "react";
import SideBar from "@/app/components/SideBar";
import Header from "@/app/components/Header";
import EditWidget from "@/app/components/EditWidget";

const OdaasStrategic = () => {
  return (
    <div className="flex flex-row h-screen">
      <div className="flex-grow">
        {" "}
        <Header
          HeadingText="Welcome Koretechx"
          HeadingDesc="Welcome to Odaas Strategic Platform"
        />
      </div>
      <div className="flex-shrink-0 ">
        {" "}
        <SideBar />
      </div>
    </div>
  );
};

export default OdaasStrategic;
