"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";
import { Button } from "./button-sidebar";

const LeadersFeedback = () => {
  return (
    <div>
      <Card className="border border-[#62626280] rounded-3xl shadow-md w-full h-full bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80]">
        <CardHeader>
          <CardTitle>Leaders Feedback</CardTitle>
        </CardHeader>
        <CardContent className="relative p-16">
          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column: Dropdowns */}
            <div className="flex flex-col space-y-4">
              <select className="w-full p-2 rounded-xl h-14 bg-[#2d2c2c] text-white focus:outline-none focus:ring-1 focus:ring-[#626262]">
                <option value="" disabled>
                  Department
                </option>
                <option value="Personal">Personal</option>
                <option value="Professional">Professional</option>
                <option value="Fitness">Fitness</option>
                <option value="Financial">Financial</option>
              </select>
              <select className="w-full p-2 rounded-xl h-14 bg-[#2d2c2c] text-white focus:outline-none focus:ring-1 focus:ring-[#626262]">
                <option value="" disabled>
                  Employee Name
                </option>
                <option value="John Doe">John Doe</option>
                <option value="Jane Smith">Jane Smith</option>
                <option value="Alex Johnson">Alex Johnson</option>
                <option value="Emily Davis">Emily Davis</option>
              </select>
            </div>

            {/* Right Column: Textarea */}
            <div>
              <textarea
                className="bg-transparent border border-gray-400 p-4 w-full h-32 rounded-md"
                placeholder="Type......"
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button color="primary" className="absolute bottom-2 right-4">
            Submit
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadersFeedback;
