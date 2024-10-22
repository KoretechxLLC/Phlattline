"use client";
import React from "react";
import { motion } from "framer-motion";
import TasksTracker from "@/app/components/TasksTracker";
import SmartGoalForm from "@/app/components/SmartGoalForm";
import TimeManagement from "@/app/components/TimeManangment";

const PerformanceManagement = () => {
  return (
    <div className="px-4 text-zinc-50">
      <motion.div
        initial="initial"
        animate="animate"
        transition={{
          staggerChildren: 0.05,
        }}
        className="mx-auto grid max-w-[100%] grid-flow-dense grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <div>
          <SmartGoalForm />
        </div>
        <div>
          <TasksTracker />
        </div>
        <div>
          <TimeManagement />
        </div>
      </motion.div>
    </div>
  );
};

export default PerformanceManagement;
