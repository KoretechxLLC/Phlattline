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
  const userId = userData?.user_type_id;

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <AssessmentTaskTracker
        showPurchased={false}
        showCompleted={true}
        showTooltip={false}
        label={"Assessments"}
        isClickable={false}
        completedAssessments={completedAssessments}
      />
      {userId === 2 && (
        <AssessmentTaskTracker
          showPurchased={false}
          showCompleted={true}
          showTooltip={true}
          label={"Assessments"}
          isClickable={false}
          completedAssessments={completedAssessments}
        />
      )}

      <AssessmentTaskTracker
        showPurchased={true}
        showCompleted={false}
        showTooltip={false}
        label={"Assessments"}
        isClickable={false}
        purchasedAssessments={pendingAssessments}
      />
    </div>
  );
};

export default MyAssessments;
