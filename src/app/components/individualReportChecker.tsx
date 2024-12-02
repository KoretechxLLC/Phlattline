"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";
import { Button } from "./button-sidebar";

const IndividualReportChecker = () => {
  return (
    <div>
      <Card className="border border-[#62626280] p-8 rounded-3xl">
        <CardHeader>
          <CardTitle>Check Individual Report</CardTitle>
        </CardHeader>
        <CardContent>
          <select className="w-full p-2 rounded-xl h-14 bg-[#2d2c2c] text-white focus:outline-none focus:ring-1 focus:ring-[#626262]">
            <option value="" disabled>
              Select Employees
            </option>
            <option value="Personal">Personal</option>
            <option value="Professional">Professional</option>
            <option value="Fitness">Fitness</option>
            <option value="Financial">Financial</option>
          </select>
          <Button color="primary" className="my-3">
            Apply
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default IndividualReportChecker;
