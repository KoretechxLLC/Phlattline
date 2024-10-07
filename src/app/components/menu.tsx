"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import MenuItem from "@/app/components/menu-item";
import MenuWidget from "@/app/components/Widget";
import { useMediaQuery } from "@/app/hooks/use-media-query";
import { useRouter, usePathname } from "next/navigation";

export function MenuClassic({}) {
  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const router = useRouter();
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState(pathname);
  const [sidebarOpen, setSidebarOpen] = useState(true); // State to control sidebar visibility

  useEffect(() => {
    setActiveMenu(pathname);
  }, [pathname]);

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
    {
      href: "/PerformanceManagement",
      label: "Performance Management",
      icon: "/assets/PerformanceLogo.png",
    },
    {
      href: "/TalentManagement",
      label: "Talent Management",
      icon: "/assets/TalentLogo.png",
    },
    { href: "/Reports", label: "Reports", icon: "/assets/ReportsLogo.png" },
  ];

  const handleMenuClick = (href: string) => {
    setActiveMenu(href);
    router.push(href);
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <nav
      className={`theme-gradient rounded-3xl h-full w-full transition-all duration-300 ${
        !sidebarOpen ? "hidden" : ""
      }`}
    >
      <div className="flex justify-center items-center mt-4 mb-4">
        <div className="flex justify-center">
          <Image
            src="/assets/WhiteLogo.png"
            alt="Website Logo"
            width={150}
            height={150}
            className="w-24 sm:w-36" // Responsive logo size
          />
        </div>
      </div>
      {/* Navbar Items */}
      {sidebarOpen && (
        <ul className="flex flex-col h-[calc(100vh-80px)] justify-between space-y-1 px-4 overflow-y-auto">
          {menus.map((menu, index) => (
            <li className="w-full" key={index}>
              <div className="w-full mb-2 last:mb-0">
                <MenuItem
                  label={menu.label}
                  href={menu.href}
                  icon={menu.icon}
                />
              </div>
            </li>
          ))}
          <li className="w-full">
            <MenuWidget
              isActive={activeMenu === "/OdaasStrategic"}
              onClick={() => handleMenuClick("/OdaasStrategic")}
            />
          </li>
          {isDesktop && (
            <li className="py-10">
              <MenuItem
                label="Settings"
                href="/settings-profile"
                icon="/assets/SettingsLogo.png"
              />
            </li>
          )}
        </ul>
      )}
    </nav>
  );
}
