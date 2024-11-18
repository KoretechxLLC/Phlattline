"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";
import { Button } from "./button-sidebar";

const CoursesAssigner = () => {
  return (
    <div>
      <Card className="border border-gray-500 rounded-3xl">
        <CardHeader>
          <CardTitle>AssignCourses</CardTitle>
        </CardHeader>
        <CardContent>
          <select className="w-full p-2 rounded-xl h-14 bg-[#2d2c2c] text-white focus:outline-none focus:ring-1 focus:ring-[#626262]">
            <option value="" disabled>
              Select Courses
            </option>
            <option value="Personal">Personal</option>
            <option value="Professional">Professional</option>
            <option value="Fitness">Fitness</option>
            <option value="Financial">Financial</option>
          </select>
          <select className="w-full p-2 my-2 rounded-xl h-14 bg-[#2d2c2c] text-white focus:outline-none focus:ring-1 focus:ring-[#626262]">
            <option value="" disabled>
              Select Employees
            </option>
            <option value="Personal">Personal</option>
            <option value="Professional">Professional</option>
            <option value="Fitness">Fitness</option>
            <option value="Financial">Financial</option>
          </select>
          <Button color="primary" className="my-2">
            Assign
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoursesAssigner;
