"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import MenuItem from "@/app/components/menu-item";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useMediaQuery } from "@/app/hooks/use-media-query";
import { useRouter, usePathname } from "next/navigation";
import MenuWidget from "./Widget";

// Define the type for menu items
interface MenuItem {
  href: string;
  label: string;
  icon: string;
}

export function MenuClassic() {
  const { userData } = useSelector((state: RootState) => state.auth);
  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const router = useRouter();
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState(pathname);

  useEffect(() => {
    setActiveMenu(pathname);
  }, [pathname]);

  // Define menus dynamically based on user type
  const menus = [
    {
      href: "/Dashboard",
      label: "Dashboard",
      icon: "/assets/DashboardLogo.png",
    },
    { href: "/Courses", label: "Courses", icon: "/assets/CoursesLogo.png" },
    {
      href: "/DailyDose",
      label: "Daily Dose",
      icon: "/assets/CalendarLogo.png",
    },
    {
      href: "/Assessments",
      label: "Assessments",
      icon: "/assets/AssessmentsLogo.png",
    },
  ];

  // Add "Odaas" if user_type_id is 3
  if (userData?.user_type_id === 2) {
    menus.push(
      {
        href: "/PerformanceManagementOrg",
        label: "Performance Management",
        icon: "/assets/PerformanceLogo.png",
      },
      {
        href: "/TalentManagement",
        label: "Talent Management",
        icon: "/assets/TalentLogo.png",
      },
      { href: "/Reports", label: "Reports", icon: "/assets/ReportsLogo.png" }
    );
  }

  if (userData?.user_type_id === 1) {
    menus.push(
      {
        href: "/PerformanceManagement",
        label: "Performance Management",
        icon: "/assets/PerformanceLogo.png",
      },
      {
        href: "/ExploreJobs",
        label: "Explore Jobs",
        icon: "/assets/ExploreJobsLogo.png",
      },
      { href: "/Reports", label: "Reports", icon: "/assets/ReportsLogo.png" }
    );
  }
  if (userData?.user_type_id === 3) {
    menus.push(
      {
        href: "/PerformanceManagement",
        label: "Performance Management",
        icon: "/assets/PerformanceLogo.png",
      },

      { href: "/Reports", label: "Reports", icon: "/assets/ReportsLogo.png" }
    );
  }

  const handleMenuClick = (href: string) => {
    setActiveMenu(href);
    router.push(href);
  };

  return (
    <nav className="theme-gradient rounded-3xl h-full w-full transition-all duration-300 z-40 flex flex-col">
      <div className="flex justify-center items-center 4xl:my-5 my-12">
        <div className="flex justify-center">
          <Image
            src="/assets/WhiteLogo.png"
            alt="Website Logo"
            width={150}
            height={150}
            className="w-24 4xl:w-32 sm:w-36"
          />
        </div>
      </div>

      <ul className="flex flex-col space-y-4 pl-8 4xl:py-1 py-8 w-[17em] flex-grow">
        {menus.map((menu, index) => (
          <li className="w-full" key={index}>
            <div className="w-[90%]">
              <MenuItem label={menu.label} href={menu.href} icon={menu.icon} />
            </div>
          </li>
        ))}
      </ul>

      {/* Menu Widget without list dot */}
      {userData && userData?.user_type_id === 2 && (
        <li className="w-full list-none pl-3 4xl:pb-3 pb-8">
          <MenuWidget
            isActive={activeMenu === "/Portal/ODaas"}
            onClick={() => handleMenuClick("/Portal/ODaas")}
          />
        </li>
      )}

      {isDesktop && (
        <div className="pl-8 pb-12 w-full">
          <MenuItem
            label="Settings"
            href="/Settings"
            icon="/assets/SettingsLogo.png"
          />
        </div>
      )}
    </nav>
  );
}
