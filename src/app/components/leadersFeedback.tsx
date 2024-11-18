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
        <CardContent className="relative p-7">
          <div className="mb-4">
            <select className="w-full p-2 rounded-xl h-14 bg-[#2d2c2c] text-white focus:outline-none focus:ring-1 focus:ring-[#626262]">
              <option value="" disabled>
                Department
              </option>
              <option value="Personal">Personal</option>
              <option value="Professional">Professional</option>
              <option value="Fitness">Fitness</option>
              <option value="Financial">Financial</option>
            </select>
          </div>
          <div className="mb-4">
            <select className="w-full p-2 rounded-xl h-14 bg-[#2d2c2c] text-white focus:outline-none focus:ring-1 focus:ring-[#626262]">
              <option value="" disabled>
                Employee Name
              </option>
              <option value="Personal">Personal</option>
              <option value="Professional">Professional</option>
              <option value="Fitness">Fitness</option>
              <option value="Financial">Financial</option>
            </select>
          </div>
          {/* Transparent background for the input */}
          <textarea
            className="bg-transparent border border-gray-400 p-2 w-full h-32 rounded-md mb-10"
            placeholder="Type......"
          />

          {/* Position the submit button at the bottom-right */}
          <Button color="primary" className="absolute bottom-2 right-4">
            Submit
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadersFeedback;
