import React from "react";
import SidebarContent from "@/app/components/sidebar-content";
import { SidebarToggle } from "./sidebar-toggle";
import { MenuClassic } from "@/app/components/menu";

const Sidebar = () => {
  return (
    <SidebarContent>
      <MenuClassic />
    </SidebarContent>
  );
};

export default Sidebar;
