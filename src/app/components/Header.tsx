"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import RedBadge from "@/app/components/RedBadge";
import ProfileInfo from "@/app/components/profile-info";
import Notifications from "@/app/components/notifications";
import { Hamburger } from "./hamburger";
import Icon from "@/app/components/utility-icon"; // Ensure correct Icon component is imported
import { Button } from "@/app/components/button-sidebar"; // Ensure correct Button component is imported

interface HeaderProps {
  HeadingText: string;
  HeadingDesc?: string;
}

const Header = ({ HeadingText, HeadingDesc }: HeaderProps) => {
  const router = useRouter();
  const path = usePathname();

  const pathContentMap: { [key: string]: boolean } = {
    "/Portal/Dashboard": true,
    "/Portal/DailyDose": true,
    "/Portal/Courses": true,
    "/Portal/Reports": true,
    "/Portal/Assessments": true,
    "/Portal/PerformanceManagement": true,
    "/Portal/PerformanceManagementOrg": true,
    "/Portal/TalentManagement": true,
    "/Portal/ODaas": true,
    "/Portal/Settings": true,
    "/Portal/ExploreJobs": true,
  };

  // Check if the current path is in the pathContentMap
  const showBackButton = !pathContentMap[path];

  return (
    <div className="w-full">
      {/* Full header responsive layout */}
      <div className="flex flex-wrap items-center justify-between py-4 xl:pl-64 gap-5">
        {/* Heading Section */}
        <div className="flex items-center gap-3 flex-1">
          {/* Back Button */}
          {showBackButton && (
            <Button onClick={() => router.back()} color="default">
              <Icon icon="weui:back-outlined" className="w-8 h-8 text-white" />
            </Button>
          )}

          {/* Heading and Description */}
          <div className="flex flex-col space-y-2">
            <h1 className="text-xl sm:text-2xl md:text-3xl mx-2 font-bold">
              {HeadingText}
            </h1>
            {HeadingDesc && (
              <h2 className="text-sm sm:text-base mx-2 text-gray-500">
                {HeadingDesc}
              </h2>
            )}
          </div>

          <RedBadge text={"Pro"} />
        </div>

        {/* Action buttons: EditWidget, Search, Notifications, Profile */}
        <div className="flex gap-2 mx-5 items-start">
          {/* Show the EditWidget and HeaderSearch only on medium and larger screens */}
          <div className="hidden md:flex gap-2 my-1">
            <EditWidget />
            {/* <HeaderSearch /> */}
          </div>

          {/* Conditionally render components based on screen size */}
          <div className="hidden xl:block">
            <ProfileInfo /> {/* Show ProfileInfo on screens above xl */}
          </div>
          <div className="block xl:hidden">
            <Hamburger /> {/* Show Hamburger on screens below xl */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
