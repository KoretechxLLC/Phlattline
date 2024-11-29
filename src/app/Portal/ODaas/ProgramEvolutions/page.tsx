"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";

import GoalsAchievedTracker from "@/app/components/goalsAchievedTracker";
import LeadersFeedback from "@/app/components/leadersFeedback";
import CoursesResults from "@/app/components/CoursesResults";
import SuggestionTabs from "@/app/components/SuggestionTabs";

const ProgramEvolutions = () => {
  return (
    <div className="max-h-[120vh] min-h-[40vh] space-y-4">
      {/* Dropdown at the top */}
      <div className="mb-4">
        <select className="w-full p-2 rounded-xl h-14 bg-[#2d2c2c] text-white focus:outline-none focus:ring-1 focus:ring-[#626262]">
          <option value="" disabled>
            Select Organizations
          </option>
          <option value="Personal">Personal</option>
          <option value="Professional">Professional</option>
          <option value="Fitness">Fitness</option>
          <option value="Financial">Financial</option>
        </select>
      </div>

      {/* Components below the dropdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Card className="border-[1px] border-gray-500 rounded-3xl h-full bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80]">
          <CardHeader className=" rounded-3xl">
            <div className="text-sm flex justify-center">
              <CardTitle>Courses Results</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CoursesResults />
          </CardContent>
        </Card>

        <Card className="border border-[#62626280] rounded-3xl shadow-md w-full h-full">
          <CardHeader className="bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80] h-16 rounded-3xl">
            <CardTitle>Goals Achieved</CardTitle>
          </CardHeader>
          <CardContent>
            <GoalsAchievedTracker />
          </CardContent>
        </Card>

        <div className="col-span-2">
          <LeadersFeedback />
        </div>

        <div className="col-span-2 p-2">
          <CardTitle>Need to more actions for fast growth</CardTitle>
          <SuggestionTabs />
        </div>
      </div>
    </div>
  );
};

export default ProgramEvolutions;
