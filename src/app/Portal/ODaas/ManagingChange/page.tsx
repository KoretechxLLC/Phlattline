"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";
import IssuesTracker from "@/app/components/IssuesTracker";
import TaskMonitoring from "@/app/components/taskMonitoring";
import IndividualReportChecker from "@/app/components/individualReportChecker";
import CoursesAssigner from "@/app/components/coursesAssigner";
import Workshops from "@/app/components/workshops";
import { fetchcourses } from "@/redux/slices/courses.slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  fetchAllEmployee,
  resetError,
  resetSuccess,
} from "@/redux/slices/organization.slice";
import StackedNotifications from "@/app/components/Stackednotification";
import CoursesResults from "@/app/components/CoursesResults";

export type NotificationType = {
  id: number;
  text: string;
  type: "error" | "success";
};

const ManagingChange = () => {
  const { userData } = useSelector((state: RootState) => state.auth);
  const {
    employee,
    assignCoursesSuccess,
    assignCoursesError,
    assignCoursesLoading,
  } = useSelector((state: RootState) => state.organization);
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );
  const dispatch: any = useDispatch();
  useEffect(() => {
    dispatch(fetchAllEmployee({ organizationId: userData.organization_id }));
  }, []);

  useEffect(() => {
    if (assignCoursesSuccess) {
      setNotification({
        id: Date.now(),
        text: assignCoursesSuccess,
        type: "success",
      });
      dispatch(resetSuccess());
    } else if (assignCoursesError) {
      setNotification({
        id: Date.now(),
        text: assignCoursesError,
        type: "error",
      });
      dispatch(resetError());
    }
  }, [assignCoursesSuccess, assignCoursesError]);

  return (
    <div className="grid grid-cols-1 gap-3 max-h-[120vh] min-h-[40vh]">
      <StackedNotifications
        notification={notification}
        setNotification={setNotification}
      />
      {/* Top Row: Individual Report Checker and Courses Assigner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <IndividualReportChecker />
        </div>
        <div>
          <CoursesAssigner
            coursesData={userData?.user_courses}
            employeesData={employee}
            organizationId={userData?.organization_id}
            userId={userData?.id}
            loading={assignCoursesLoading}
            success={assignCoursesSuccess}
          />
        </div>
      </div>

      {/* Second Row: Task Monitoring */}
      <div className=" flex space-x-2 border border-[#62626280] rounded-3xl">
        <TaskMonitoring />
      </div>

      {/* Third Row: Issues Reported and Workshops */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Card className="border-[1px] border-[#62626280] rounded-3xl h-full bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80]">
          <CardHeader className=" rounded-3xl">
            <div className="text-sm flex justify-center">
              <CardTitle>Courses Results</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CoursesResults />
          </CardContent>
        </Card>
        <div>
          <Workshops />
        </div>
      </div>
    </div>
  );
};

export default ManagingChange;
