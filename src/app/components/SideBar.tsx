import React from "react";
import SidebarContent from "@/app/components/sidebar-content";
import { SidebarToggle } from "./sidebar-toggle";
import { MenuClassic } from "@/app/components/menu";

const Sidebar = () => {
  return (
    <div className="hidden md:block">
      <SidebarContent>
        <MenuClassic />
      </SidebarContent>
    </div>
  );
};

export default Sidebar;
