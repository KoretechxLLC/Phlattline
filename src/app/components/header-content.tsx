"use client";
import React from "react";
import { useConfig } from "@/app/hooks/use-config";
import { cn } from "@/app/lib/utils";

const HeaderContent = ({ children }: { children: React.ReactNode }) => {
  const [config] = useConfig();
  const headerTheme =
    config.headerTheme !== "light" && config.headerTheme !== "transparent"
      ? `dark theme-${config.headerTheme}`
      : `theme-${config.headerTheme}`;

  // Common header class based on configuration
  const headerClasses = cn("top-0 z-50", config.navbar, {
    "has-sticky-header sticky top-6 px-6": config.navbar === "floating",
    "top-10 has-sticky-header": config.layout === "compact",
    "has-sticky-header":
      config.layout === "semi-box" && config.navbar !== "floating",
    "top-0 px-0": config.layout === "semi-box" && config.navbar === "floating",
  });

  return (
    <header className={headerClasses}>
      <div
        className={cn(
          "flex-none bg-header backdrop-blur-lg md:px-6 px-[15px] py-3 flex items-center justify-between relative",
          headerTheme,
          {
            "xl:ms-[300px]": config.sidebar === "two-column", // Adjust for two-column sidebar
            "xl:ms-[248px]": config.sidebar !== "two-column", // Adjust for other sidebar layouts
            "xl:ms-[72px]": config.collapsed,
            "border-b":
              config.skin === "bordered" && config.layout !== "semi-box",
            border: config.skin === "bordered" && config.layout === "semi-box",
            "shadow-base": config.skin === "default",
            "xl:ms-0": config.menuHidden || config.layout === "horizontal",
            "top-6 rounded-md": config.layout === "semi-box",
            "xl:ms-28":
              config.sidebar === "compact" && config.layout !== "horizontal",
            "rounded-md": config.navbar === "floating",
          }
        )}
      >
        {children}
      </div>
    </header>
  );
};

export default HeaderContent;
