"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TasksTracker from "@/app/components/TasksTracker";
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

import PerformanceReviews from "@/app/components/performanceReviewsTab";
import PerformanceDeptsChart from "@/app/components/performanceDeptCharts";
import OrganizationGoalsTab from "@/app/components/orgGoalsTab";
import SmartGoalForm from "@/app/components/SmartGoalForm";
import Employeegoal from "@/app/components/Employeegoal";

export type NotificationType = {
  id: number;
  text: string;
  type: "error" | "success";
};

const Supervisor = () => {
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );
  const { success, error } = useSelector(
    (state: RootState) => state.performance
  );
  const [selectedGoal, setSelectedGoal] = useState<any | null>(null); 
  const { userData } = useSelector((state: RootState) => state.auth);
  const dispatch: any = useDispatch();
  const [loading, setLoading] = useState<boolean>(false); 

  const handleAddGoal = (goalData: any) => {
    const id = userData?.id;
    const formData = new FormData();
    Object.keys(goalData).forEach((key) => {
      formData.append(key, goalData[key]);
    });
    formData.append("id", id);
    dispatch(submitGoal(formData));
  };

  const handleEditGoal = (goal: any) => {
    setSelectedGoal(goal); // Set the selected goal to edit
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
            <Employeegoal handleAddGoal={handleAddGoal} success={success} selectedGoal={selectedGoal} />
          </div>
          <div className="space-y-5">
            
            <TasksTracker
              showPending={true}
              showCompleted={true}
              showSaved={false}
              showTooltip={true}
              label={"Goals"}
              isClickable={false}
              showEditIcon={() => true}
              onEditGoal={handleEditGoal} // Pass edit handler
            />

            <div className=" border border-[#62626280] rounded-3xl ">
              <CardHeader className="h-16 rounded-3xl bg-gradient-to-b from-[#62626280] to-[#2D2C2C80]">
                <CardTitle>Performance Reviews</CardTitle>
              </CardHeader>
              <PerformanceReviews />
            </div>
          </div>
          {/* Combined TasksTracker and PersonalGoals in one column */}
          <div className="space-y-3">
            <OrganizationGoalsTab />
            <PerformanceDeptsChart />
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Supervisor;
