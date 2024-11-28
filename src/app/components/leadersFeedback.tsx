"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";
import { Button } from "./button-sidebar";
import Spinner from "./Spinner"; // Assuming you have a spinner component

const LeadersFeedback = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true); // Show loader while submitting
    setTimeout(() => {
      // Simulate API call or submission process
      setIsLoading(false); // Hide loader after submission is complete
    }, 2000); // Simulate a 2-second delay
  };

  return (
    <div>
      <Card className="border border-[#62626280] rounded-3xl shadow-md w-full h-full bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80]">
        <CardHeader>
          <CardTitle>Leaders Feedback</CardTitle>
        </CardHeader>
        <CardContent className="relative p-16">
          {/* Show loader while submitting */}
          {isLoading ? (
            <div className="absolute top-0 left-0 w-full h-full bg-[#00000080] flex justify-center items-center z-50">
              <Spinner height="40px" width="40px" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Dropdowns */}
              <div className="flex flex-col space-y-4">
                <select className="w-full p-2 rounded-xl h-14 bg-[#2d2c2c] text-white focus:outline-none focus:ring-1 focus:ring-[#626262]">
                  <option value="">Department</option>
                  <option value="IT">IT</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Financial">Financial</option>
                </select>
                <select className="w-full p-2 rounded-xl h-14 bg-[#2d2c2c] text-white focus:outline-none focus:ring-1 focus:ring-[#626262]">
                  <option value="">Employee Name</option>
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
          )}

          {/* Submit Button */}
          <Button
            color="primary"
            className="absolute bottom-2 right-4 rounded-3xl"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadersFeedback;
