"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TasksTracker from "@/app/components/TasksTracker";
import SmartGoalForm from "@/app/components/SmartGoalForm";
import TimeManagement from "@/app/components/TimeManangment";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGoals,
  resetError,
  resetSuccess,
  submitGoal,
} from "@/redux/slices/performanceManagement.slice";
import StackedNotifications from "@/app/components/Stackednotification";
import { RootState } from "@/redux/store";

export type NotificationType = {
  id: number;
  text: string;
  type: "error" | "success";
};

const PerformanceManagement = () => {
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );
  const { success, error, goals } = useSelector(
    (state: RootState) => state.PerformanceManagement
  );
  const { userData } = useSelector((state: RootState) => state.auth);

  const dispatch: any = useDispatch();

  const handleAddGoal = (goalData: any) => {
    const id = userData?.id;
    // Create a new FormData object
    const formData = new FormData();
    // Dynamically append all fields from goalData to the FormData object
    Object.keys(goalData).forEach((key) => {
      formData.append(key, goalData[key]);
    });
    formData.append("id", id);

    // Dispatch the FormData to Redux or submit to an API
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
        className="mx-auto grid max-w-[100%] grid-flow-dense grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <div>
          <SmartGoalForm handleAddGoal={handleAddGoal} success={success} />
        </div>
        <div>
          <TasksTracker
            showPending={true}
            showCompleted={true}
            showSaved={false}
            showTooltip={false}
            label={"Assessments"}
            isClickable={false}
          />
        </div>
        <div>
          <TimeManagement />
        </div>
      </motion.div>
    </div>
  );
};

export default PerformanceManagement;
