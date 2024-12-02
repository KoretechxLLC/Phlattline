"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";
import {
  resetError,
  resetSuccess,
  submitGoal,
} from "@/redux/slices/performanceManagement.slice";
import StackedNotifications from "@/app/components/Stackednotification";
import { RootState } from "@/redux/store";
import EmployeeCourseInfo from "@/app/components/employeeCourseInfo";
import IssuesTracker from "@/app/components/IssuesTracker";
import AssessmentResultPie from "@/app/components/AssessmentsResultPie";
import KeyPerformanceBar from "@/app/components/kpiBar";

export type NotificationType = {
  id: number;
  text: string;
  type: "error" | "success";
};

const Report = () => {
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );
  const { success, error } = useSelector(
    (state: RootState) => state.performance
  );
  const { userData } = useSelector((state: RootState) => state.auth);
  const dispatch: any = useDispatch();

  const handleAddGoal = (goalData: any) => {
    const id = userData?.id;
    const formData = new FormData();
    Object.keys(goalData).forEach((key) => {
      formData.append(key, goalData[key]);
    });
    formData.append("id", id);
    dispatch(submitGoal(formData));
  };

  useEffect(() => {
    if (success !== null) {
      setNotification({
        id: Date.now(),
        text: success,
        type: "success",
      });
      dispatch(resetSuccess());
    }
    if (error !== null) {
      setNotification({
        id: Date.now(),
        text: error,
        type: "error",
      });
      dispatch(resetError());
    }
  }, [success, error, dispatch]);

  return (
    <>
      {/* Dropdown */}
      <div className="mb-4">
        <select className="w-full p-2 rounded-xl h-14 bg-[#2d2c2c] text-white focus:outline-none focus:ring-1 focus:ring-[#626262]">
          <option value="">Select Departments</option>
          <option value="Personal">Personal</option>
          <option value="Professional">Professional</option>
          <option value="Fitness">Fitness</option>
          <option value="Financial">Financial</option>
        </select>
      </div>

      {/* Grid Layout */}
      <motion.div
        initial="initial"
        animate="animate"
        transition={{
          staggerChildren: 0.05,
        }}
        className="grid max-w-[100%] grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4"
      >
        {/* Row 1: Employee Course Info & Issues Reported */}
        <div className="space-y-5">
          <EmployeeCourseInfo />
        </div>
        <div className="space-y-5">
          <Card className="border-[1px] border-[#62626280] bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] rounded-3xl h-full">
            <CardHeader className="h-16 rounded-3xl">
              <div className="text-sm flex justify-between">
                <CardTitle>Issues Reported</CardTitle>
                <CardTitle>124 Open Issues</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-2">
              <IssuesTracker />
            </CardContent>
          </Card>
        </div>

        {/* Row 2: Assessment Results & Key Performance Indicators */}
        <div className="space-y-5">
          <Card className="border-[1px] border-[#62626280] bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] rounded-3xl h-full">
            <CardHeader className="h-16 rounded-3xl">
              <CardTitle>Assessment Results</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <AssessmentResultPie />
            </CardContent>
          </Card>
        </div>
        <div className="space-y-5">
          <Card className="border-[1px] border-[#62626280]  rounded-3xl h-full">
            <CardHeader className="h-16 rounded-3xl">
              <CardTitle>Key Performance Indicators</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <KeyPerformanceBar />
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </>
  );
};

export default Report;
