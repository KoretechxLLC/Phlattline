"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";
import { Button } from "./button-sidebar";
import { useDispatch } from "react-redux";
import { assignCourses } from "@/redux/slices/organization.slice";
import StackedNotifications, { NotificationType } from "./Stackednotification";
import Spinner from "./Spinner";

const CoursesAssigner = ({
  coursesData,
  employeesData,
  organizationId,
  userId,
  loading,
  success,
}: any) => {
  const dispatch: any = useDispatch();
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );

  // State to hold selected course and employees
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  // Handle success state for clearing selections
  useEffect(() => {
    if (success) {
      setSelectedCourse(null);
      setSelectedEmployees([]);
    }
  }, [success]);

  const handleAssign = () => {
    if (!selectedCourse || selectedEmployees.length === 0) {
      setNotification({
        id: Date.now(),
        text: "Please select a course and employee",
        type: "error",
      });
      return;
    }

    const payload = {
      organization_id: organizationId,
      course_id: Number(selectedCourse),
      employee_ids: selectedEmployees.map(Number),
      user_id: userId,
      type: "Managing Change",
    };

    dispatch(assignCourses({ data: payload }));
  };
  return (
    <div>
      <StackedNotifications
        notification={notification}
        setNotification={setNotification}
      />
      <Card className="border border-gray-500 rounded-3xl">
        <CardHeader>
          <CardTitle>Assign Courses</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Course Selector */}
          <select
            className="w-full p-2 rounded-xl h-14 bg-[#2d2c2c] text-white focus:outline-none focus:ring-1 focus:ring-[#626262]"
            value={selectedCourse || ""}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="" disabled>
              Select Course
            </option>
            {coursesData && coursesData.length > 0 ? (
              coursesData.map((value: any, index: number) => (
                <option key={index} value={value.courses?.id}>
                  {value.courses?.course_name}
                </option>
              ))
            ) : (
              <option disabled>No courses to show</option>
            )}
          </select>

          {/* Employee Selector */}
          <select
            className="w-full p-2 my-2 rounded-xl h-14 bg-[#2d2c2c] text-white focus:outline-none focus:ring-1 focus:ring-[#626262]"
            value={selectedEmployees}
            onChange={(e) => {
              const options = e.target.options;
              const selected: string[] = [];
              for (let i = 0; i < options.length; i++) {
                if (options[i].selected) selected.push(options[i].value);
              }
              setSelectedEmployees(selected);
            }}
          >
            <option value="" disabled>
              Select Employees
            </option>
            {employeesData && employeesData.length > 0 ? (
              employeesData.map((value: any, index: number) => (
                <option key={index} value={value.id}>
                  {`${value.first_name} ${value.last_name}`} ({value.email})
                </option>
              ))
            ) : (
              <option disabled>No employees to show</option>
            )}
          </select>

          {/* Assign Button */}
          <Button
            onClick={handleAssign}
            color="primary"
            className="my-2 rounded-3xl"
          >
            {loading ? <Spinner height="20px" width="20px" /> : "Assign"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoursesAssigner;
