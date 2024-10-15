"use client";
import { Avatar, AvatarImage } from "@/app/components/avatar";
import { Card, CardContent } from "@/app/components/Card";
import { AnimatedTooltip } from "@/app/components/AnimatedTooltip";
import { useState } from "react";

const TasksTracker = () => {
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
    {
      id: 1,
      goal: "Goal 1",
      percentage: 30,
      status: "pending",
      userId: 1,
    },
    {
      id: 2,
      goal: "Goal 2",
      percentage: 60,
      status: "pending",
      userId: 2,
    },
    {
      id: 3,
      goal: "Goal 3",
      percentage: 90,
      status: "pending",
      userId: 3,
    },
  ];

  const completedTasks = [
    {
      id: 4,
      goal: "Goal 4",
      status: "completed",
      userId: 1,
    },
    {
      id: 5,
      goal: "Goal 5",
      status: "completed",
      userId: 2,
    },
    {
      id: 6,
      goal: "Goal 6",
      status: "completed",
      userId: 3,
    },
  ];

  const [activeTab, setActiveTab] = useState("pending");

  const handlePendingTasksClick = () => {
    setActiveTab("pending");
  };

  const handleCompletedTasksClick = () => {
    setActiveTab("completed");
  };

  return (
    <div>
      <div className="flex gap-4 md:gap-4 justify-start md:justify-start w-[100%]">
        <button
          className={`text-xs sm:text-xs w-full rounded-tl-3xl rounded-tr-3xl ${
            activeTab === "pending"
              ? "bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] text-white"
              : "text-default-600"
          }`}
          onClick={handlePendingTasksClick}
        >
          Pending Tasks
        </button>
        <button
          className={`text-xs  sm:text-xs w-full h-12 rounded-tl-3xl rounded-tr-3xl ${
            activeTab === "completed"
              ? "bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] text-white"
              : "text-default-600"
          }`}
          onClick={handleCompletedTasksClick}
        >
          Completed Tasks
        </button>
      </div>
      <ul
        className={`justify-center items-center md:justify-start w-full border border-gray-500 rounded-b-3xl relative ${
          activeTab === "pending" ? "pending-list" : "completed-list"
        }`}
      >
        {activeTab === "pending"
          ? pendingTasks.map((item) => (
              <li
                className={`flex flex-col sm:flex-row justify-center md:justify-start items-center  sm:items-center w-full h-20 gap-2 border-b border-gray-500 pb-2 last:pb-0 last:border-b-0 ${
                  activeTab === "pending" ? "pending-item" : "completed-item"
                }`}
                key={item.id}
                style={{ fontFamily: "Sansation" }}
              >
                <div className="flex items-center md:mx-5 justify-between w-full">
                  <div className="flex items-center">
                    <Avatar className="w-6 h-6">
                      <AvatarImage
                        src={"/assets/ongoing.png"}
                        alt="pending-avatar"
                        className="w-5 h-5"
                      />
                    </Avatar>
                    <span className="text-xs sm:text-sm px-2">{item.goal}</span>
                  </div>
                  <div className="flex justify-center md:items-center ml-3 sm:ml-5">
                    <AnimatedTooltip items={tooltipItems} />
                    <span className="mx-10  md:mx-0 lg:ml-14 sm:ml-10">
                      {item.percentage}%
                    </span>
                  </div>
                </div>
              </li>
            ))
          : completedTasks.map((item) => (
              <li
                className={`flex flex-col  sm:flex-row justify-center md:justify-start items-center sm:items-center w-full h-20 gap-2 border-b border-gray-500 pb-2 last:pb-0 last:border-b-0 ${
                  activeTab === "completed" ? "completed-item" : "pending-item"
                }`}
                key={item.id}
                style={{ fontFamily: "Sansation" }}
              >
                <div className="flex items-center md:mx-5 justify-between w-full">
                  <div className="flex items-center">
                    <Avatar className="w-6 h-6">
                      <AvatarImage
                        src={"/assets/greentick.png"}
                        alt="completed-avatar"
                        className="w-5 h-5"
                      />
                    </Avatar>
                    <span className="text-xs px-2 sm:text-sm">{item.goal}</span>
                  </div>
                  <div className="flex items-center ml-5">
                    <AnimatedTooltip items={tooltipItems} />
                    <span className="mx-7 md:mx-0 lg:ml-14 sm:ml-10">100%</span>
                  </div>
                </div>
              </li>
            ))}
      </ul>
    </div>
  );
};

export default TasksTracker;
