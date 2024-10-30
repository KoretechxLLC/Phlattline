"use client";
import React, { useEffect, useState } from "react";
import { HoverEffect } from "@/app/components/card-hover-effect";
import { CardTitle } from "@/app/components/Card";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { fetchAssessments } from "@/redux/slices/individualassessment.slice";

const AssessmentsCatalogue = () => {
  const [assessmentData, setAssessmentData] = useState([]);
  const { assessments, loading, error, assessmentsSuccess }: any = useSelector(
    (state: RootState) => state.assessment
  );
  const dispatch: any = useDispatch();
  useEffect(() => {
    dispatch(fetchAssessments({}));
  }, []);
  useEffect(() => {
    if (assessmentsSuccess) {
      setAssessmentData(assessments);
    }
  }, [assessmentsSuccess]);

  return (
    <div className="w-full mx-auto  px-8">
      <CardTitle>Individual Assessments</CardTitle>
      <HoverEffect
        className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2"
        items={assessmentData}
      />
    </div>
  );
};

export default AssessmentsCatalogue;
