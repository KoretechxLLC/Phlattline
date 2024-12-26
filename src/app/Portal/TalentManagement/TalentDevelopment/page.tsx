"use client";
import React, { useState } from "react";
import HighPotentialTab from "@/app/components/employeesTab";
import LDStrategyTab from "@/app/components/ldStrategyTab";
import SuccessionPlanningTab from "@/app/components/successionPlanning";
import EmployeesTab from "@/app/components/employeesTab";
import Employeegoal from "@/app/components/Employeegoal";
import TasksTracker from "@/app/components/TasksTracker";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { submitGoal } from "@/redux/slices/performanceManagement.slice";
import { CardHeader, CardTitle } from "@/app/components/Card";
import PerformanceReviews from "@/app/components/performanceReviewsTab";

const highPotentialEmployees = [
  {
    image: "/assets/DummyImg.png",
    name: "John Doe",
    designation: "Software Engineer",
  },
  {
    image: "/assets/DummyImg.png",
    name: "Jane Smith",
    designation: "Product Manager",
  },
  {
    image: "/assets/DummyImg.png",
    name: "Alice Johnson",
    designation: "Team Lead",
  },
];

const TalentDevelopment = () => {
  const dispatch = useDispatch<any>();
  const { success, error } = useSelector((state: RootState) => state.performance);
  const { userData } = useSelector((state: RootState) => state.auth);
  const [selectedGoal, setSelectedGoal] = useState<any | null>(null);

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
      {/* First Row */}
      <div className="md:col-span-1 flex gap-6">
        <div>
          <Employeegoal handleAddGoal={handleAddGoal} success={success} selectedGoal={selectedGoal} />
        </div>
        <div>
          <div className="space-y-5 w-[60em]">
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
          </div>
          <div className=" border border-[#62626280] rounded-3xl mt-10">
            <CardHeader className="h-16 rounded-3xl bg-gradient-to-b from-[#62626280] to-[#2D2C2C80]">
              <CardTitle>Performance Reviews</CardTitle>
            </CardHeader>
            <PerformanceReviews />
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="md:col-span-1">
        <SuccessionPlanningTab />
      </div>
    </div>
  );
};

export default TalentDevelopment;
