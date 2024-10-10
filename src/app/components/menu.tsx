"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import MenuItem from "@/app/components/menu-item";
import MenuWidget from "@/app/components/Widget";
import { SidebarToggle } from "@/app/components/sidebar-toggle";
import { useMediaQuery } from "@/app/hooks/use-media-query";
import { useRouter, usePathname } from "next/navigation";

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

  return (
    <nav className="theme-gradient hidden md:block rounded-3xl h-full w-full transition-all duration-300 z-40">
      <div className="flex justify-center items-center mt-4 mb-4">
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

      <ul className="flex flex-col h-[calc(90vh-80px)] justify-between space-y-0 px-4">
        {menus.map((menu, index) => (
          <li className="w-full" key={index}>
            <div className="w-full mb-1 last:mb-0">
              <MenuItem label={menu.label} href={menu.href} icon={menu.icon} />
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
          <li className="pt-14">
            <MenuItem
              label="Settings"
              href="/SettingsProfile"
              icon="/assets/SettingsLogo.png"
            />
          </li>
        )}
      </ul>
    </nav>
  );
}
