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
        <CardContent className="relative p-10">
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
