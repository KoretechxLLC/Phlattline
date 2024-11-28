"use client";
import React, { useState, useEffect } from "react";
import { Avatar, AvatarImage } from "@/app/components/avatar";
import Spinner from "@/app/components/Spinner";
import Image from "next/image";

interface GoalsAchievedTrackerProps {
  showTargetImage?: boolean; // Prop to control the visibility of the target image
}

const GoalsAchievedTracker: React.FC<GoalsAchievedTrackerProps> = ({
  showTargetImage = true,
}) => {
  // Static array of goals data
  const goals = [
    { id: 1, goal: "Complete the onboarding process" },
    { id: 2, goal: "Achieve a 90% task completion rate" },
    { id: 3, goal: "Finish the first module of training" },
  ];

  const [loading, setLoading] = useState(true);
  const [showAvatar] = useState(true); // Set showAvatar as true or false as needed

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust the delay as needed

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-full py-28">
          <Spinner height="30px" width="30px" />
        </div>
      ) : goals.length > 0 ? (
        <div className="flex items-center space-x-4">
          {/* Goals List */}
          <ul className="space-y-1 w-full max-w-md">
            {goals.map((item) => (
              <li
                className="flex w-full items-center gap-2 border-default-100 dark:border-default-300 last:border-b-0 4xl:p-2 py-2"
                key={item.id}
              >
                {showAvatar && (
                  <Avatar className="w-6 h-6">
                    <AvatarImage
                      src={"/assets/greentick.png"}
                      alt="goal-achieved"
                      className="w-full h-full object-cover"
                    />
                  </Avatar>
                )}
                <div className="flex-1 text-start overflow-hidden text-ellipsis whitespace-nowrap">
                  <div className="text-base text-default-600 overflow-hidden text-ellipsis whitespace-nowrap">
                    {item.goal}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Conditionally render Target Image */}
          {showTargetImage && (
            <div className="p-10">
              <Image
                src={"/assets/TargetImage.png"}
                alt="Goals Tracker"
                width={5000}
                height={5000}
                className="w-40 h-40 "
              />
            </div>
          )}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-28">No Goals Found</div>
      )}
    </div>
  );
};

export default GoalsAchievedTracker;
