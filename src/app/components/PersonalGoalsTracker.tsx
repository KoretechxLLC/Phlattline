"use client";
import React, { useState, useEffect } from "react";
import { Avatar, AvatarImage } from "@/app/components/avatar";
import Spinner from "@/app/components/Spinner"; // Import the Spinner component

interface PersonalGoalsProps {
  goals: { id: number; goal: string }[];
  showAvatar: boolean;
}

const PersonalGoals: React.FC<PersonalGoalsProps> = ({ goals, showAvatar }) => {
  const [loading, setLoading] = useState(true);

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
        <div className="flex justify-center items-center h-full">
          <Spinner height="10vh" />
        </div>
      ) : goals && goals.length === 0 ? (
        <ul className="space-y-1 w-full justify-center">
          {goals.map((item) => (
            <li
              className="flex w-full items-center gap-2 border-default-100 dark:border-default-300 last:border-b-0 4xl:p-2 py-2 "
              key={item.id}
            >
              {showAvatar && (
                <Avatar className="w-6 h-6">
                  <AvatarImage
                    src={"/assets/greentick.png"}
                    alt="next-avatar"
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
      ) : (
        <div className="text-center text-gray-500 py-8">No Goals Found</div>
      )}
    </div>
  );
};

export default PersonalGoals;
