"use client";
import React, { useEffect, useState, useMemo } from "react";
import LayoutProvider from "@/app/providers/layout.provider";
import LayoutContentProvider from "@/app/providers/content.provider";
import Sidebar from "@/app/components/SideBar";
import Header from "@/app/components/Header";
import { usePathname } from "next/navigation";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { userData } = useSelector((state: RootState) => state.auth);
  const path = usePathname();

  const allWidgets = [
    { id: "assessmentsBanner", name: "Assessments Banner", isVisible: true },
    { id: "assessmentsReports", name: "Assessments Reports", isVisible: true },
    {
      id: "upcomingVideos",
      name: "Upcoming Videos and Blogs",
      isVisible: true,
    },
    { id: "tasksTracker", name: "Tasks Tracker", isVisible: true },
    { id: "personalGoals", name: "Personal Goals", isVisible: true },
    { id: "trainingOnDemand", name: "Training-On Demand", isVisible: true },
    { id: "courseResults", name: "Course Results", isVisible: true },
    {
      id: "recommendedAssesments",
      name: "Recommended Assesments",
      isVisible: true,
    },
    {
      id: "previousResultsTracker",
      name: "Previous Results Tracker",
      isVisible: true,
    },
    {
      id: "assessmentsResults",
      name: "Assesments Results",
      isVisible: true,
    },
    {
      id: "activityHours",
      name: "Activity Hours",
      isVisible: true,
    },
  ];

  if (userData?.user_type_id === 2) {
    allWidgets.push(
      {
        id: "performanceReviews",
        name: "Performance Reviews",
        isVisible: true,
      },
      {
        id: "interviewScheduler",
        name: "Interview Scheduler",
        isVisible: true,
      },
      {
        id: "addPositionForm",
        name: "Add Position Form",
        isVisible: true,
      },
      {
        id: "successionPlanning",
        name: "Succession Planning",
        isVisible: true,
      },
      {
        id: "employeeList",
        name: "Employee List",
        isVisible: true,
      },
      {
        id: "employeeData",
        name: "Employee Data",
        isVisible: true,
      }
    );
  }

  // Memoize path-to-content map to prevent re-calculation on every render
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
    "/Portal/ExploreJobs": {
      heading: "Hey Jack",
      description:
        "Discover Opportunities, Explore Careers—Your Next Job Awaits!",
    },
    // Add more paths as needed
  };

  if (userData?.user_type_id == 2) {
    pathContentMap["/Portal/Odaas"] = {
      heading: "Odaas",
      description: "",
    };
  }

  const defaultContent = {
    heading: "Welcome",
    description: "Navigate through your portal to manage your tasks.",
  };

  const { heading, description } = pathContentMap[path] || defaultContent;

  const [widgets, setWidgets] = useState<any[]>(allWidgets);

  // Load widgets for the current path from localStorage
  useEffect(() => {
    const savedWidgets = localStorage.getItem(`dashboard_widgets`);
    if (savedWidgets) {
      const parsedWidgets = JSON.parse(savedWidgets);

      // Merge saved widgets with any newly added widgets in allWidgets
      const mergedWidgets = allWidgets.map((widget) => {
        const savedWidget = parsedWidgets.find((w: any) => w.id === widget.id);
        return savedWidget ? { ...widget, ...savedWidget } : widget;
      });

      if (JSON.stringify(mergedWidgets) !== JSON.stringify(widgets)) {
        setWidgets(mergedWidgets);
      }
    }
  }, [path]);

  const handleToggleWidget = (id: string) => {
    const updatedWidgets = widgets.map((widget) =>
      widget.id === id ? { ...widget, isVisible: !widget.isVisible } : widget
    );
    setWidgets(updatedWidgets);
    localStorage.setItem(`dashboard_widgets`, JSON.stringify(updatedWidgets));
  };
  return (
    <LayoutProvider>
      <Sidebar />
      <Header
        HeadingText={heading}
        HeadingDesc={description}
        {...(widgets.length > 0 && {
          widgets,
          onToggleWidget: handleToggleWidget,
        })}
      />
      <LayoutContentProvider>{children}</LayoutContentProvider>
    </LayoutProvider>
  );
};

export default Layout;
