import React from "react";
import Image from "next/image";
import HeaderSearch from "@/app/components/header-search";
import ProfileInfo from "@/app/components/profile-info";
import Notifications from "@/app/components/notifications";
import EditWidget from "@/app/components/EditWidget";
import { Badge } from "@/app/components/badge";
import RedBadge from "@/app/components/RedBadge";
import { Hamburger } from "./hamburger";

interface HeaderProps {
  HeadingText: string;
  HeadingDesc?: string;
}

const Header = ({ HeadingText, HeadingDesc }: HeaderProps) => {
  return (
    <div className="w-full">
      {/* Full header responsive layout */}
      <div className="flex flex-wrap items-center justify-between py-4  xl:pl-64 gap-5">
        {/* Heading Section */}
        <div className="flex items-center gap-3 flex-1">
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
            {/* <EditWidget /> */}
            {/* <HeaderSearch /> */}
          </div>

          {/* Conditionally render components based on screen size */}
          <div className="hidden xl:block">
            <ProfileInfo /> {/* Show ProfileInfo on screens above xl */}
          </div>
          <div className="block xl:hidden">
            <Hamburger /> {/* Show Example on screens below xl */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
