"use client";
import React, { CSSProperties } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

// for dnd

interface MenuItemProps {
  href: string;
  label: string;
  icon: string;
}

import { useConfig } from "@/app/hooks/use-config";
import { useMediaQuery } from "@/app/hooks/use-media-query";
import { useMobileMenuConfig } from "@/app/hooks/use-mobile-menu";
import { useMenuHoverConfig } from "@/app/hooks/use-menu-hover";

const MenuItem = ({ href, label, icon }: MenuItemProps) => {
  const [config] = useConfig();
  const [hoverConfig] = useMenuHoverConfig();
  const { hovered } = hoverConfig;
  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const [mobileMenuConfig, setMobileMenuConfig] = useMobileMenuConfig();
  const router = useRouter();
  const pathname = usePathname();
  const pathWithoutPortal =
    typeof pathname === "string" ? pathname.replace("/Portal", "") : "";
  const isSelected = pathWithoutPortal === href;

  return (
    <div
      className={`justify-start text-sm font-medium capitalize h-auto py-3 md:px-3 px-3 transition-all duration-300  ${
        isSelected
          ? "bg-black  rounded-l-3xl w-l-54"
          : "hover:bg-black hover:text-white hover:rounded-l-3xl hover:rounded-r-none hover:pl-5"
      }`}
    >
      <button
        onClick={() => {
          router.push(`/Portal${href}`);
        }}
        className={`flex items-center mr-2`}
      >
        <div className="flex items-center">
          <Image
            src={icon}
            alt={label}
            width={60}
            height={60}
            className={"h-5 w-5 mb-1 mx-5"}
          />
          {(!config.collapsed || hovered) && (
            <p className={"w-28 text-sm flex items-start text-start"}>
              {label}
            </p>
          )}
        </div>
      </button>
    </div>
  );
};

export default MenuItem;
