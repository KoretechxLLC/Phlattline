import React from "react";
import Image from "next/image";
import HeaderContent from "@/app/components/header-content";
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
    <>
      <HeaderContent>
        <div className="flex flex-col gap-3 items-start">
          <div className="flex items-center gap-3">
            <h1
              className="text-3xl font-bold"
              style={{ fontFamily: "Sansation" }}
            >
              {HeadingText}
            </h1>
            <Image
              src={"/assets/proIcon.svg"}
              alt={"Pro Logo"}
              width={100}
              height={100}
              className="md:block ml-8"
            />
          </div>
          {HeadingDesc && (
            <h2
              className="text-sm text-gray-500 w-full md:w-80"
              style={{ fontFamily: "Sansation" }}
            >
              {HeadingDesc}
            </h2>
          )}
        </div>

        {/* Content below the heading */}
        <div className="flex justify-between items-center mb-5 px-5 md:px-20 lg:ml-80 md:gap-5 gap-2">
          {/* SidebarToggle only visible on small screens */}
          <div className="block lg:hidden">
            <SidebarToggle />
          </div>

          <EditWidget />
          <HeaderSearch />
          <Notifications />
          <ProfileInfo />
        </div>
      </HeaderContent>
    </>
  );
};

export default Header;
