"use client";
import React, { useEffect, useState } from "react";
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
import TabButton from "@/app/components/TabButton";
import NotesCalendar from "../../components/NotesCalendar";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPurchaseAssessment,
  fetchPurchaseCourses,
} from "@/redux/slices/auth.slice";
import { RootState } from "@/redux/store";

const Dashboard = () => {
  const { userData } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const dispatch: any = useDispatch();
  useEffect(() => {
    if (!userData?.user_courses || userData.user_courses.length === 0) {
      dispatch(fetchPurchaseCourses(userData?.id));
    }

    if (
      !userData?.purchased_assessments ||
      userData.purchased_assessments.length === 0
    ) {
      dispatch(fetchPurchaseAssessment(userData?.id));
    }
  }, [dispatch]); // Add dependencies for safety

  return (
    <div className=" grid grid-cols-1 md:grid-cols-[70%_30%] gap-4 w-full h-full 4xl:space-y-0 lg:space-y-24 5xl:space-y-9 overflow-hidden items-end">
      <div className="space-y-4 md:space-y-6">
        <div>
          <AssessmentsBanner />
        </div>
        <div>
          <Card className="border-[1px] border-[#62626280] rounded-3xl h-auto">
            <CardHeader className="h-16 rounded-3xl bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80]">
              <div className="text-sm 4xl:mb-12 mb-16 flex justify-between">
                <CardTitle>Assessments Reports</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="4xl:p-1 p-4">
              <AssessmentsTracker />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="4xl:my-0 space-y-3 md:space-y-3 w-full px-5">
        <div>
          <Card className="shadow-md rounded-3xl w-full h-full">
            <CardHeader>
              <div className="flex justify-between gap-3 items-center">
                <h1 className="text-xs">Upcoming Videos and Blogs</h1>
                <p
                  className="text-sm underline cursor-pointer"
                  onClick={() => router.push("/Portal/DailyDose")}
                >
                  View
                </p>
              </div>
            </CardHeader>
            <CardContent className="w-full bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] text-white rounded-3xl p-4 4xl:p-2">
              <NotesCalendar />
            </CardContent>
          </Card>
        </div>

        <div className="w-full">
          <TasksTracker
            showPending={true}
            showCompleted={true}
            showSaved={false}
            showTooltip={false}
            label={"Goals"}
            isClickable={false}
          />
        </div>

        <div>
          <Card className="border border-[#62626280] rounded-3xl shadow-md w-full h-full">
            <CardHeader>
              <CardTitle>Personal Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <PersonalGoals showAvatar={true} />
            </CardContent>
          </Card>
        </div>

        <div>
          <TabButton
            backgroundColor="#FF0000"
            text="Training-On Demand"
            imageSrc="/assets/LiveIcon.png"
            textColor="#FFFFFF"
            arrowImageSrc="/assets/ArrowRightUp.png"
            showModalOnClick={true}
            isClickable={true}
            modalType="spring"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
