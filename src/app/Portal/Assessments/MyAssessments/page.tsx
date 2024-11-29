"use client";
import AssessmentTaskTracker from "@/app/components/assessmentTaskTracker";
import EmployeeassessmentTaskTracker from "@/app/components/EmployeeassessmentTaskTracker";
import { fetchEmployeeAssessments } from "@/redux/slices/employeemyassessment.slice";
import { RootState } from "@/redux/store";
import { root } from "postcss";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const MyAssessments = () => {
  type Assessment = {
    id: number;
    status: string;
    completed: boolean;
    // Add other fields as needed
  };

  const [pendingAssessments, setPendingAssessments] = useState([]);
  const [completedAssessments, setCompletedAssessments] = useState([]);
  const [completedEmployeeAssess, setCompletedEmployeeAssess] = useState<
    Assessment[]
  >([]);
  const [pendingEmployeeAssess, setpendingEmployeeAssess] = useState<
    Assessment[]
  >([]);
  const { getemployeeaseesments } = useSelector(
    (state: RootState) => state.employeeMyAssessment
  );
  const { userData } = useSelector((state: RootState) => state.auth);
  const dispatch: any = useDispatch();
  const employee_id = userData?.employee_id;
  const userType = userData?.user_type_id;
  //Employee Assessments

  useEffect(() => {
    if (employee_id) {
      dispatch(fetchEmployeeAssessments({ employee_id }));
    }
  }, [employee_id, dispatch]);

  useEffect(() => {
    if (getemployeeaseesments && getemployeeaseesments.length > 0) {
      const completedAssessments = getemployeeaseesments.filter(
        (assessment) => assessment.status === "completed"
      );
      setCompletedEmployeeAssess(completedAssessments);
    }
  }, [getemployeeaseesments]);

  useEffect(() => {
    if (getemployeeaseesments && getemployeeaseesments.length > 0) {
      // Filter assessments where status is either "notStarted" or false (or any other condition for pending assessments)
      const pendingEmployeeAssess = getemployeeaseesments.filter(
        (assessment) =>
          assessment.status === "notStarted" || assessment.status === false
      );
      setpendingEmployeeAssess(pendingEmployeeAssess);
    }
  }, [getemployeeaseesments]);

  //Employee Assessments

  //Indvidual Assessments

  useEffect(() => {
    if (userData) {
      const pendingAssessmentsData = userData?.purchased_assessments?.filter(
        (assessment: any) => !assessment?.completed
      );
      setPendingAssessments(pendingAssessmentsData);
    }
  }, [userData]);

  useEffect(() => {
    if (userData) {
      const completedAssessmentsData = userData?.purchased_assessments?.filter(
        (assessment: any) => assessment?.completed
      );
      setCompletedAssessments(completedAssessmentsData);
    }
  }, [userData]);

  //Indvidual Assessments

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Individuals Sections */}

      {(userType === 1 || userType === 2) && (
        <>
          <AssessmentTaskTracker
            showPurchased={true}
            showCompleted={false}
            showTooltip={false}
            label={"Assessments"}
            isClickable={false}
            purchasedAssessments={pendingAssessments}
          />

          <AssessmentTaskTracker
            showPurchased={false}
            showCompleted={true}
            showTooltip={false}
            label={"Assessments"}
            isClickable={false}
            completedAssessments={completedAssessments}
          />
        </>
      )}

      {/* Individuals Sections */}

      {/* Employee Sections */}

      <div style={{ display: userData?.user_type_id === 3 ? "block" : "none" }}>
        <EmployeeassessmentTaskTracker
          showPending={true}
          showCompleted={false}
          showSaved={false}
          showTooltip={false}
          label={"Assessments"}
          isClickable={false}
          pendingAssessments={pendingEmployeeAssess}
        />
      </div>

      <div style={{ display: userData?.user_type_id === 3 ? "block" : "none" }}>
        <EmployeeassessmentTaskTracker
          showPending={false}
          showCompleted={true}
          showSaved={false}
          showTooltip={false}
          label={"Assessments"}
          isClickable={false}
          completedAssessments={completedEmployeeAssess}
        />
      </div>
      {/* Employee Sections */}
    </div>
  );
};

export default MyAssessments;