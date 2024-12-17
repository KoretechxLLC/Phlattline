"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import RedBadge from "@/app/components/RedBadge";
import ProfileInfo from "@/app/components/profile-info";
import Notifications from "@/app/components/notifications";
import { Hamburger } from "./hamburger";
import Icon from "@/app/components/utility-icon";
import { Button } from "@/app/components/button-sidebar";
import EditWidget from "./EditWidget";

interface HeaderProps {
  HeadingText: string;
  HeadingDesc?: string;
  widgets?: { id: string; name: string; isVisible: boolean }[]; // Optional widgets
  onToggleWidget?: (id: string) => void; // Optional toggle handler
}

const Header = ({
  HeadingText,
  HeadingDesc,
  widgets,
  onToggleWidget,
}: HeaderProps) => {
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
      <div className="flex flex-wrap items-center justify-between py-4 xl:pl-64 gap-5">
        <div className="flex items-center gap-3 flex-1">
          {showBackButton && (
            <Button onClick={() => router.back()} color="default">
              <Icon icon="weui:back-outlined" className="w-8 h-8 text-white" />
            </Button>
          )}
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

        <div className="flex gap-2 mx-5 items-start">
          {/* Conditionally render EditWidget */}

          {path === "/Portal/Dashboard" && widgets && onToggleWidget && (
            <EditWidget widgets={widgets} onToggleWidget={onToggleWidget} />
          )}
          <div className="hidden xl:block">
            <ProfileInfo />
          </div>
          <div className="block xl:hidden">
            <Hamburger />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
