"use client";
import React from "react";
import { cn } from "@/app/lib/utils";
import { useConfig } from "@/app/hooks/use-config";
import { useMediaQuery } from "@/app/hooks/use-media-query";
import { useMenuHoverConfig } from "@/app/hooks/use-menu-hover";

const SidebarContent = ({ children }: { children: React.ReactNode }) => {
  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const [config] = useConfig();
  const [hoverConfig, setHoverConfig] = useMenuHoverConfig();

  const sidebarTheme =
    config.sidebarTheme !== "light"
      ? `dark theme-${config.sidebarTheme}`
      : `theme-${config.sidebarTheme}`;

  return (
    <aside
      onMouseEnter={() =>
        config.sidebar === "classic" && setHoverConfig({ hovered: true })
      }
      onMouseLeave={() =>
        config.sidebar === "classic" && setHoverConfig({ hovered: false })
      }
      className={cn("fixed z-50 h-full bg-sidebar shadow-base", sidebarTheme, {
        "w-[248px]": !config.collapsed || hoverConfig.hovered,
        "w-[72px]": config.collapsed && config.sidebar !== "compact",
        "border-b": config.skin === "bordered",
        "shadow-base": config.skin === "default",
        "h-full start-0":
          config.layout !== "semi-box" && config.layout !== "compact",
        "m-6 bottom-0 top-0 start-0 rounded-md": config.layout === "semi-box",
        "m-8 bottom-0 top-0": config.layout === "compact",
        "w-28": config.sidebar === "compact",
      })}
    >
      <div className="relative flex flex-col h-full px-2 py-2">
        {config.sidebarBgImage !== undefined && (
          <div
            className="absolute left-0 top-0 z-[-1] w-full h-full bg-cover bg-center opacity-[0.07]"
            style={{ backgroundImage: `url(${config.sidebarBgImage})` }}
          ></div>
        )}
        {children}
      </div>
    </aside>
  );
};

export default SidebarContent;
