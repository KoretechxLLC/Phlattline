"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TasksTracker from "@/app/components/TasksTracker";
import SmartGoalForm from "@/app/components/SmartGoalForm";
import TimeManagement from "@/app/components/TimeManangment";
import { useDispatch, useSelector } from "react-redux";
import { CardTitle } from "@/app/components/Card";

import SuggestionTabs from "@/app/components/SuggestionTabs";
import {
  resetError,
  resetSuccess,
  submitGoal,
} from "@/redux/slices/performanceManagement.slice";
import StackedNotifications from "@/app/components/Stackednotification";
import { RootState } from "@/redux/store";
import EmployeesDesiredJobTab from "@/app/components/employeesDesiredJobTab";

export type NotificationType = {
  id: number;
  text: string;
  type: "error" | "success";
};

const Employee = () => {
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );
  const { success, error } = useSelector(
    (state: RootState) => state.performance
  );
  const { userData } = useSelector((state: RootState) => state.auth);
  const dispatch: any = useDispatch();
  const [loading, setLoading] = useState<boolean>(false); // Initialize loading state

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

  const suggestions = [
    "Define Clear Strategic Goals",
    "Improve Time Management Skills",
    "Increase Team Collaboration",
  ];

  return (
    <>
      <div className="px-4 text-zinc-50">
        <StackedNotifications
          notification={notification}
          setNotification={setNotification}
        />
        <motion.div
          initial="initial"
          animate="animate"
          transition={{
            staggerChildren: 0.05,
          }}
          className="mx-auto grid max-w-[100%] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <div>
            <SmartGoalForm handleAddGoal={handleAddGoal} success={success} />
          </div>
          <div className="space-y-5">
            <TasksTracker
              showPending={true}
              showCompleted={true}
              showSaved={false}
              showTooltip={false}
              label={"Goals"}
              isClickable={false}
            />
            <EmployeesDesiredJobTab />
          </div>
          {/* Combined TasksTracker and PersonalGoals in one column */}
          <div>
            <TimeManagement />
          </div>

          {/* Suggestions Section */}
          <div className="my-2 flex flex-col col-span-1  md:col-span-2 lg:col-span-3">
            <CardTitle>Your Desired Personal Goals</CardTitle>
            <div className="flex space-x-4 my-1">
              <SuggestionTabs />
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Employee;
