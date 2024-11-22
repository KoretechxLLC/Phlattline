"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";
import Spinner from "@/app/components/Spinner"; // Assuming you have a spinner component

const OrganizationGoalsTab: React.FC = () => {
  // Static array of organization goals with their completion percentage
  const goalsData = [
    {
      goal: "Increase Revenue by 20%",
      completion: 15,
    },
    {
      goal: "Improve Employee Retention",
      completion: 35,
    },
    {
      goal: "Launch New Product Line",
      completion: 55,
    },
    {
      goal: "Expand Market Presence",
      completion: 75,
    },
    {
      goal: "Achieve Carbon Neutrality",
      completion: 90,
    },
  ];

  // Simulating loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching delay
    setTimeout(() => {
      setLoading(false);
    }, 1500); // Adjust this time for your desired loading duration
  }, []);

  // Function to determine the color based on completion percentage
  const getCompletionColor = (completion: number) => {
    if (completion >= 0 && completion <= 20) return "text-red-500";
    if (completion > 20 && completion <= 40) return "text-orange-500";
    if (completion > 40 && completion <= 60) return "text-yellow-400";
    if (completion > 60 && completion <= 80) return "text-green-400";
    if (completion > 80 && completion <= 100) return "text-green-600";
    return "";
  };

  return (
    <div>
      <Card className="border w-full border-gray-500 rounded-xl">
        <CardHeader className="mb-2 bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80] rounded-xl">
          <CardTitle>Organization Goals</CardTitle>
        </CardHeader>
        {/* Conditional Rendering */}
        {loading ? (
          <div className="flex justify-center items-center py-6">
            <Spinner height="30px" width="30px" />
          </div>
        ) : goalsData.length === 0 ? (
          <div className="text-center text-lg text-gray-500 py-6">
            No organization goals found
          </div>
        ) : (
          <ul className="flex flex-col p-4">
            {goalsData.map((goal, index) => (
              <li
                key={index}
                className="py-4 border-b border-gray-500 last:border-none"
              >
                <CardContent className="flex justify-between items-center">
                  <div className="text-sm font-semibold">{goal.goal}</div>
                  {/* Percentage display with color coordination */}
                  <div
                    className={`text-sm font-semibold ${getCompletionColor(
                      goal.completion
                    )}`}
                  >
                    {goal.completion}%
                  </div>
                </CardContent>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
};

export default OrganizationGoalsTab;
