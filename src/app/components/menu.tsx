"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import MenuItem from "@/app/components/menu-item";
import { useMediaQuery } from "@/app/hooks/use-media-query";
import { useRouter, usePathname } from "next/navigation";
import MenuWidget from "./Widget";

export function MenuClassic() {
  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const router = useRouter();
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState(pathname);

  useEffect(() => {
    setActiveMenu(pathname);
  }, [pathname]);

  const menus = [
    {
      href: "Dashboard",
      label: "Dashboard",
      icon: "/assets/DashboardLogo.png",
    },
    { href: "/Courses", label: "Courses", icon: "/assets/CoursesLogo.png" },
    {
      href: "DailyDose",
      label: "Daily Dose",
      icon: "/assets/CalendarLogo.png",
    },
    {
      href: "Assessments",
      label: "Assessments",
      icon: "/assets/AssessmentsLogo.png",
    },
    {
      href: "PerformanceManagement",
      label: "Performance Management",
      icon: "/assets/PerformanceLogo.png",
    },
    { href: "Reports", label: "Reports", icon: "/assets/ReportsLogo.png" },
  ];

  const handleMenuClick = (href: string) => {
    setActiveMenu(href);
    router.push(href);
  };

  return (
    <nav className="theme-gradient rounded-3xl h-full w-full transition-all duration-300 z-40 flex flex-col">
      <div className="flex justify-center items-center my-12">
        <div className="flex justify-center">
          <Image
            src="/assets/WhiteLogo.png"
            alt="Website Logo"
            width={150}
            height={150}
            className="w-24 sm:w-36"
          />
        </div>
      </div>

      <ul className="flex flex-col space-y-4 pl-8 py-8 w-[17em] flex-grow">
        {menus.map((menu, index) => (
          <li className="w-full" key={index}>
            <div className="w-[90%]">
              <MenuItem label={menu.label} href={menu.href} icon={menu.icon} />
            </div>
          </li>
        ))}
      </ul>
      <li className="w-full">
        <MenuWidget
          isActive={activeMenu === "/Portal/ODaas"}
          onClick={() => handleMenuClick("/Portal/ODaas")}
        />
      </li>
      {isDesktop && (
        <div className="pl-8 pb-8 w-full">
          {" "}
          {/* Anchors to the bottom */}
          <MenuItem
            label="Settings"
            href="Settings"
            icon="/assets/SettingsLogo.png"
          />
        </div>
      )}
    </nav>
  );
}
