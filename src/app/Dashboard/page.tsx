"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";
import AssessmentsBanner from "@/app/components/AssessmentsBanner";
import AssessmentsTracker from "@/app/components/AssesmentsTracker";
import PersonalGoals from "@/app/components/PersonalGoalsTracker";
import TasksTracker from "@/app/components/TasksTracker";
import LiveButton from "@/app/components/LiveButton";
import NotesCalendar from "../components/NotesCalendar";

const Dashboard = () => {
  const router = useRouter();
  return (
    <div className="p-3 grid grid-cols-1 md:grid-cols-[80%_20%] gap-6 w-full h-full space-y-5 lg:space-y-24 5xl:space-y-0 overflow-hidden items-end">
      {/* Left side: Assessments */}
      <div className="space-y-4 md:space-y-6">
        <div>
          <AssessmentsBanner />
        </div>
        <div>
          <Card className="border-[1px] border-gray-500 rounded-3xl h-full">
            <CardHeader
              className="h-16 rounded-3xl bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80]"
              style={{ fontFamily: "Sansation" }}
            >
              <div className="text-sm mb-16 flex justify-between">
                <CardTitle>Assessments Reports</CardTitle>
                <CardTitle>Total Employees: 115</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <AssessmentsTracker />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-8 md:space-y-3">
        <div>
          <Card
            className="shadow-md rounded-3xl h-full"
            style={{ fontFamily: "Sansation" }}
          >
            <CardHeader>
              <div className="flex justify-start gap-3 items-center">
                <CardTitle className="text-sm">
                  Upcoming Videos and Blogs
                </CardTitle>
                <p
                  className="text-xs underline cursor-pointer"
                  onClick={() => router.push("")}
                >
                  View all
                </p>
              </div>
            </CardHeader>
            <CardContent className="w-full sm:w-72 bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] text-white rounded-2xl p-4">
              <NotesCalendar />
            </CardContent>
          </Card>
        </div>

        <div style={{ fontFamily: "Sansation" }}>
          <TasksTracker />
        </div>

        <div>
          <Card
            className="border border-gray-500 rounded-3xl shadow-md w-72 h-full"
            style={{ fontFamily: "Sansation" }}
          >
            <CardHeader>
              <CardTitle>Personal Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <PersonalGoals />
            </CardContent>
          </Card>
        </div>

        <div>
          <LiveButton />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
