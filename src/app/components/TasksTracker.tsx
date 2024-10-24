"use client";
import { Avatar, AvatarImage } from "@/app/components/avatar";
import { AnimatedTooltip } from "@/app/components/AnimatedTooltip";
import { useEffect, useState } from "react";
import { Button } from "@/app/components/button-sidebar";

interface TasksTrackerProps {
  showPending?: boolean;
  showCompleted?: boolean;
  showSaved?: boolean;
  showTooltip?: boolean;
  label: string;
  isClickable?: boolean; // New prop to control cursor style
}

const TasksTracker = ({
  showPending = true,
  showCompleted = true,
  showSaved = true,
  showTooltip = true,
  label,
  isClickable = true, // Default to true for cursor-pointer
}: TasksTrackerProps) => {
  const tooltipItems = [
    {
      id: 1,
      name: "John Doe",
      designation: "Software Engineer",
      image: "/assets/User2.png",
    },
    {
      id: 2,
      name: "Jane Smith",
      designation: "Product Manager",
      image: "/assets/User1.png",
    },
    {
      id: 3,
      name: "Bob Johnson",
      designation: "UX Designer",
      image: "/assets/User3.png",
    },
  ];

  const pendingTasks = [
    { id: 1, goal: "Goal 1", percentage: 30, userId: 1 },
    { id: 2, goal: "Goal 2", percentage: 60, userId: 2 },
    { id: 3, goal: "Goal 3", percentage: 90, userId: 3 },
  ];

  const completedTasks = [
    { id: 4, goal: "Goal 4", userId: 1 },
    { id: 5, goal: "Goal 5", userId: 2 },
    { id: 6, goal: "Goal 6", userId: 3 },
  ];

  const savedTasks = [
    { id: 7, goal: "Goal 7", userId: 1 },
    { id: 8, goal: "Goal 8", userId: 2 },
    { id: 9, goal: "Goal 9", userId: 3 },
  ];

  const [activeTab, setActiveTab] = useState("pending");

  // Update activeTab based on visible buttons
  useEffect(() => {
    if (showPending) setActiveTab("pending");
    else if (showCompleted) setActiveTab("completed");
    else if (showSaved) setActiveTab("saved");
  }, [showPending, showCompleted, showSaved]);

  const handlePendingTasksClick = () => setActiveTab("pending");
  const handleCompletedTasksClick = () => setActiveTab("completed");
  const handleSavedTasksClick = () => setActiveTab("saved");

  return (
    <div>
      <div className="flex gap-4 md:gap-4 justify-start md:justify-start w-full">
        {showPending && (
          <button
            className={`text-sm sm:text-lg h-12 w-full rounded-tl-3xl rounded-tr-3xl ${
              activeTab === "pending"
                ? "bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] text-white"
                : "text-default-600"
            } ${isClickable ? "cursor-pointer" : "cursor-default"}`}
            onClick={handlePendingTasksClick}
          >
            Pending {label}
          </button>
        )}
        {showCompleted && (
          <button
            className={`text-sm sm:text-lg w-full h-12 rounded-tl-3xl rounded-tr-3xl ${
              activeTab === "completed"
                ? "bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] text-white"
                : "text-default-600"
            } ${isClickable ? "cursor-pointer" : "cursor-default"}`}
            onClick={handleCompletedTasksClick}
          >
            Completed {label}
          </button>
        )}
        {showSaved && (
          <button
            className={`text-sm sm:text-lg w-full h-12 rounded-tl-3xl rounded-tr-3xl ${
              activeTab === "saved"
                ? "bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] text-white"
                : "text-default-600"
            } ${isClickable ? "cursor-pointer" : "cursor-default"}`}
            onClick={handleSavedTasksClick}
          >
            Saved {label}
          </button>
        )}
      </div>
      <ul
        className={`justify-center items-center md:justify-start w-full border border-gray-500 rounded-b-3xl relative`}
      >
        {activeTab === "pending"
          ? pendingTasks.map((item) => (
              <li
                className="flex flex-col sm:flex-row justify-center md:justify-start items-center sm:items-center w-full h-20 gap-2 border-b border-gray-500 py-2 px-2 last:pb-0 last:border-b-0"
                key={item.id}
              >
                <div className="flex items-center md:mx-5 justify-between w-full">
                  <div className="flex items-center">
                    <Avatar className="w-6 h-6">
                      <AvatarImage
                        src="/assets/ongoing.png"
                        alt="pending-avatar"
                        className="w-5 h-5"
                      />
                    </Avatar>
                    <span className="text-xs sm:text-sm px-2">{item.goal}</span>
                  </div>
                  <div className="flex justify-center md:items-center ml-3 sm:ml-5">
                    {showTooltip && <AnimatedTooltip items={tooltipItems} />}
                    <span className="mx-10 md:mx-0 lg:ml-14 sm:ml-10">
                      {item.percentage}%
                    </span>
                  </div>
                </div>
              </li>
            ))
          : activeTab === "completed"
          ? completedTasks.map((item) => (
              <li
                className="flex flex-col sm:flex-row justify-center md:justify-start items-center sm:items-center w-full h-20 gap-2 border-b border-gray-500 pb-2 px-2 last:py-0 last:border-b-0"
                key={item.id}
              >
                <div className="flex items-center md:mx-5 justify-between w-full">
                  <div className="flex items-center">
                    <Avatar className="w-6 h-6">
                      <AvatarImage
                        src="/assets/greentick.png"
                        alt="completed-avatar"
                        className="w-5 h-5"
                      />
                    </Avatar>
                    <span className="text-xs px-2 sm:text-sm">{item.goal}</span>
                  </div>
                  <div className="flex items-center ml-5">
                    {showTooltip && <AnimatedTooltip items={tooltipItems} />}
                    <span className="mx-7 md:mx-0 lg:ml-14 sm:ml-10">100%</span>
                  </div>
                </div>
              </li>
            ))
          : savedTasks.map((item) => (
              <li
                className="flex flex-col sm:flex-row justify-center md:justify-start items-center sm:items-center w-full h-20 gap-2 border-b border-gray-500 py-2 px-2 last:py-0 last:border-b-0"
                key={item.id}
              >
                <div className="flex items-center md:mx-5 justify-between w-full">
                  <div className="flex items-center">
                    <Avatar className="w-6 h-6">
                      <AvatarImage
                        src="/assets/saved.png"
                        alt="saved-avatar"
                        className="w-5 h-5"
                      />
                    </Avatar>
                    <span className="text-xs px-2 sm:text-sm">{item.goal}</span>
                  </div>
                  <div className="flex items-center ml-5">
                    {showTooltip && <AnimatedTooltip items={tooltipItems} />}
                    <Button color="primary" className="rounded-3xl">
                      Take
                    </Button>
                  </div>
                </div>
              </li>
            ))}
      </ul>
    </div>
  );
};

export default TasksTracker;
