"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";
import { Button } from "./button-sidebar";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllDepartment,
  fetchEmployeeByDepartment,
  resetError,
  resetSuccess,
  submitFeedback,
} from "@/redux/slices/organization.slice";
import StackedNotifications, { NotificationType } from "./Stackednotification";

const LeadersFeedback = () => {
  const [deptId, setDeptId] = useState();
  const [errors, setErrors] = useState({
    department: false,
    employee: false,
    feedback: false,
  });
  const [employeeId, setEmployeeId] = useState();
  const [feedback, setFeedback] = useState("");
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );
  const { userData } = useSelector((state: RootState) => state.auth);
  const {
    departments,
    responseLoading,
    responseSuccess,
    responseError,
    leaderFeedbackSuccess,
    leaderFeedbackError,
  }: any = useSelector((state: RootState) => state.organization);
  const organization_id = userData?.organization_id;
  const dispatch: any = useDispatch();

  useEffect(() => {
    if (!departments || departments.length == 0) {
      dispatch(fetchAllDepartment({ organizationId: organization_id }));
    }
  }, []);

  const handleDepChange = (id: any) => {
    dispatch(fetchEmployeeByDepartment({ departmentId: id }));
    setDeptId(id);
  };
  const handleEmployeeChange = (id: any) => {
    setEmployeeId(id);
  };

  const handleSubmitFeedback = () => {
    const newErrors = {
      department: !deptId,
      employee: !employeeId,
      feedback: !feedback.trim(),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    dispatch(
      submitFeedback({
        filter: {
          department_id: deptId,
          organization_id: organization_id,
          employee_id: employeeId,
          feedback: feedback,
        },
      })
    );
  };

  useEffect(() => {
    if (leaderFeedbackSuccess) {
      setFeedback("");
      setDeptId(undefined);
      setNotification({
        id: Date.now(),
        text: leaderFeedbackSuccess,
        type: "success",
      });
      dispatch(resetSuccess());
    }
    if (leaderFeedbackError) {
      setNotification({
        id: Date.now(),
        text: leaderFeedbackError,
        type: "error",
      });
      dispatch(resetError());
    }
  }, [leaderFeedbackSuccess, leaderFeedbackError]);
  return (
    <div>
      <StackedNotifications
        notification={notification}
        setNotification={setNotification}
      />
      <Card className="border border-[#62626280] rounded-3xl shadow-md w-full h-full bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80]">
        <CardHeader>
          <CardTitle>Leaders Feedback</CardTitle>
        </CardHeader>
        <CardContent className="relative 4xl:p-16 p-16">
          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column: Dropdowns */}
            <div className="flex flex-col space-y-4">
              <select
                value={deptId || ""}
                onChange={(dep: any) => {
                  handleDepChange(dep.target.value);
                }}
                className="w-full p-2 rounded-xl h-14 bg-[#2d2c2c] text-white focus:outline-none focus:ring-1 focus:ring-[#626262]"
              >
                <option value="">Department</option>
                {departments &&
                  departments?.length > 0 &&
                  departments?.map((dep: any) => (
                    <option key={dep?.id} value={dep?.id}>
                      {dep?.name}
                    </option>
                  ))}
              </select>
              {errors.department && (
                <p className="text-red-500 text-sm mt-1">
                  Please select a department.
                </p>
              )}

              {departments &&
                departments?.length > 0 &&
                departments
                  ?.filter((item: any) => item.id == deptId)
                  .map((dep: any) => {
                    let employees = dep.employees;
                    return (
                      <>
                        <select
                          onChange={(dep: any) => {
                            handleEmployeeChange(dep.target.value);
                          }}
                          key={dep.id}
                          disabled={!employees || employees.length === 0} // Disable dropdown if no employees
                          className={`w-full p-2 rounded-xl h-14 bg-[#2d2c2c] text-white focus:outline-none ${
                            !employees || employees.length === 0
                              ? "opacity-50 cursor-not-allowed"
                              : "focus:ring-1 focus:ring-[#626262]"
                          }`}
                        >
                          <option value="">Employee Name</option>
                          {employees && employees.length > 0 ? (
                            employees.map((data: any) => (
                              <option key={data?.id} value={data?.id}>
                                {data?.first_name + " " + data?.last_name}
                              </option>
                            ))
                          ) : (
                            <option value="">No Data Found</option>
                          )}
                        </select>
                        {errors.employee && (
                          <p className="text-red-500 text-sm mt-1">
                            Please select an employee.
                          </p>
                        )}
                      </>
                    );
                  })}
            </div>

            <div>
              <textarea
                value={feedback}
                className={`bg-transparent border p-4 w-full h-32 rounded-md ${
                  errors.feedback ? "border-red-500" : "border-gray-400"
                }`}
                placeholder="Type......"
                onChange={(e: any) => setFeedback(e.target.value)}
              />
              {errors.feedback && (
                <p className="text-red-500 text-sm mt-1">
                  Feedback cannot be empty.
                </p>
              )}
            </div>
          </div>

          <Button
            onClick={handleSubmitFeedback}
            color="primary"
            className="absolute bottom-2 right-4 rounded-3xl"
          >
            Submit
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadersFeedback;
