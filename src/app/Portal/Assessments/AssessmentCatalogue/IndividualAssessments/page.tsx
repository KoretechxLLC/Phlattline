"use client";
import React, { useEffect, useState } from "react";
import { HoverEffect } from "@/app/components/card-hover-effect";
import { CardTitle } from "@/app/components/Card";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { fetchAssessments } from "@/redux/slices/individualassessment.slice";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/app/components/button-sidebar";

const AssessmentsCatalogue = () => {
  const [assessmentData, setAssessmentData] = useState([]);
  const { assessments, loading, error, assessmentsSuccess }: any = useSelector(
    (state: RootState) => state.assessment
  );
  const dispatch: any = useDispatch();
  useEffect(() => {
    dispatch(fetchAssessments({}));
  }, [dispatch]);
  useEffect(() => {
    if (assessmentsSuccess) {
      setAssessmentData(assessments);
    }
  }, [assessmentsSuccess, assessments]);

  return (
    <div className="w-full mx-auto  px-8">
      <CardTitle>Individual Assessments</CardTitle>
      <HoverEffect
        className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2"
        items={assessmentData}
      />
      <div className="flex items-center justify-center gap-2 py-4">
        <Button
          variant="outline"
          size="icon"
          className="w-8 h-8 border-transparent hover:bg-transparent"
        >
          <ChevronLeft className="w-5 h-5 text-default-900" />
        </Button>
        <span className="text-sm font-medium text-default-900">1</span>
        <Button
          variant="outline"
          size="icon"
          className="w-8 h-8 border-transparent hover:bg-transparent"
        >
          <ChevronRight className="w-5 h-5 text-default-900" />
        </Button>
      </div>
    </div>
  );
};

export default AssessmentsCatalogue;
