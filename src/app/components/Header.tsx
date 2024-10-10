import React from "react";
import Image from "next/image";
import HeaderSearch from "@/app/components/header-search";
import ProfileInfo from "@/app/components/profile-info";
import Notifications from "@/app/components/notifications";
import { SidebarToggle } from "@/app/components/sidebar-toggle";
import EditWidget from "@/app/components/EditWidget";

interface HeaderProps {
  HeadingText: string;
  HeadingDesc?: string;
}

const Header = ({ HeadingText, HeadingDesc }: HeaderProps) => {
  return (
    <div className="w-full px-4 sm:px-8">
      {/* Full header responsive layout */}
      <div className="flex flex-wrap items-center justify-between py-4 md:pl-72 gap-5">
        {/* Heading Section */}
        <div className="flex items-center gap-3 flex-1">
          {/* Heading and Description */}
          <div className="flex flex-col">
            <h1
              className="text-xl sm:text-2xl md:text-3xl font-bold"
              style={{ fontFamily: "Sansation" }}
            >
              {HeadingText}
            </h1>
            {HeadingDesc && (
              <h2
                className="text-sm sm:text-base md:text-lg text-gray-500"
                style={{ fontFamily: "Sansation" }}
              >
                {HeadingDesc}
              </h2>
            )}
          </div>

          {/* Pro Logo (visible only on larger screens) */}
          <Image
            src={"/assets/proIcon.svg"}
            alt={"Pro Logo"}
            width={60}
            height={60}
          />
        </div>

        {/* Action buttons: EditWidget, Search, Notifications, Profile */}
        <div className="flex gap-2 items-start">
          {/* Show the EditWidget and HeaderSearch only on medium and larger screens */}
          <div className="hidden md:flex gap-2">
            <EditWidget />
            <HeaderSearch />
          </div>

          <Notifications />
          <ProfileInfo />
        </div>
      </div>
    </div>
  );
};

export default Header;
