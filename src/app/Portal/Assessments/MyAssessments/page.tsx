"use client";
import AssessmentTaskTracker from "@/app/components/assessmentTaskTracker";
import { RootState } from "@/redux/store";
import { root } from "postcss";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MyAssessments = () => {
  const [pendingAssessments, setPendingAssessments] = useState([]);
  const [completedAssessments, setCompletedAssessments] = useState([]);

  const { userData } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (userData) {
      const pendingAssessmentsData = userData?.purchased_assessments.filter(
        (assessment: any) => !assessment?.completed
      );

      setPendingAssessments(pendingAssessmentsData);
    }
  }, [userData]);

  useEffect(() => {
    if (userData) {
      const completedAssessmentsData = userData?.purchased_assessments.filter(
        (assessment: any) => assessment?.completed
      );

      setCompletedAssessments(completedAssessmentsData);
    }
  }, [userData]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <AssessmentTaskTracker
        showPending={true}
        showCompleted={false}
        showSaved={false}
        showTooltip={false}
        label={"Assessments"}
        isClickable={false}
        pendingAssessments={pendingAssessments}
      />

      <AssessmentTaskTracker
        showPending={false}
        showCompleted={true}
        showSaved={false}
        showTooltip={false}
        label={"Assessments"}
        isClickable={false}
        completedAssessments={completedAssessments}
      />
      {/* <AssessmentTaskTracker
        showPending={false}
        showCompleted={false}
        showSaved={true}
        showTooltip={false}
        label={"Assessments"}
        isClickable={false}
      /> */}
    </div>
  );
};

export default MyAssessments;
