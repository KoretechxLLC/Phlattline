"use client";
import LayoutProvider from "@/app/providers/layout.provider";
import LayoutContentProvider from "@/app/providers/content.provider";
import Sidebar from "@/app/components/SideBar";
import Header from "@/app/components/Header";
import { usePathname } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();

  const pathContentMap: {
    [key: string]: { heading: string; description: string };
  } = {
    "/Portal/Dashboard": {
      heading: "Dashboard",
      description: "Access and manage your dashboard here.",
    },
    "/Portal/Courses": {
      heading: "Courses",
      description:
        "Empower your growth - access and elevate your organizational developmental courses here.",
    },
    "/Portal/Reports": {
      heading: "Reports",
      description: "View detailed reports and insights to track your progress.",
    },
    "/Portal/Settings": {
      heading: "Settings",
      description: "",
    },
    "/Portal/Settings/PurchaseHistory": {
      heading: "Purchase History",
      description: "",
    },
    // Add more paths as needed
  };

  // Default fallback content if the path is not mapped
  const defaultContent = {
    heading: "Welcome",
    description: "Navigate through your portal to manage your tasks.",
  };

  // Get the content based on the current path, fallback to default
  const { heading, description } = pathContentMap[path] || defaultContent;

  return (
    <LayoutProvider>
      <Sidebar />
      <Header HeadingText={heading} HeadingDesc={description} />
      <LayoutContentProvider>{children}</LayoutContentProvider>
    </LayoutProvider>
  );
};

export default Layout;
