"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/app/components/button-sidebar";
import { CardTitle } from "@/app/components/Card";
import { HoverEffect } from "@/app/components/card-hover-effect";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { fetchAssessments } from "@/redux/slices/individualassessment.slice";
import GraphLoader from "@/app/components/graphLoader";

const recommendedAssessments: any[] = [
  {
    imageLink: "/assets/AssessmentBanner.svg",
    title: "Cognitive Ability Test",
    link: "#",
    price: 45,
  },
  {
    imageLink: "/assets/AssessmentBanner.svg",
    title: "Career Interest and Values",
    link: "#",
    price: 55,
  },
];

const AssessmentsCatalogue: React.FC<any> = ({ onViewAll }) => {
  const [assessmentCatalogueData, setAssessmentCatalogueData] = useState([]);
  const { assessments, loading, error, assessmentsSuccess }: any = useSelector(
    (state: RootState) => state.assessment
  );
  const dispatch: any = useDispatch();
  useEffect(() => {
    if (!assessments || assessments?.length == 0) {
      dispatch(fetchAssessments({ size: 9 }));
    }
  }, [assessments, dispatch]);
  useEffect(() => {
    if (assessmentsSuccess) {
      setAssessmentCatalogueData(assessments);
    }
  }, [assessments, assessmentsSuccess]);

  return (
    <div className="px-0 md:px-4 grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-4  w-full h-full">
      {/* Individual Assessments Section */}
      <div className="bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] rounded-xl p-5 w-full">
        {loading ? (
          <div className="text-center text-gray-300 pt-20">
            <GraphLoader />
          </div>
        ) : (
          <>
            <CardTitle className="text-xl">Individual Assessments</CardTitle>
            <HoverEffect
              items={assessmentCatalogueData.slice(0, 2)} // Show subset
              className="grid grid-cols-1 md:grid-cols-2 gap-2"
            />
            <Button
              className="text-white px-5 flex w-full justify-center items-center rounded-3xl mt-4"
              size="default"
              color="primary"
              onClick={() => onViewAll("individual")}
            >
              View All
            </Button>
          </>
        )}
      </div>

      {/* Recommended Assessments Section */}
      <div className="bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] rounded-xl 4xl:p-3 p-5 w-full">
        <CardTitle className="text-xl">Recommended Assessments</CardTitle>
        <HoverEffect
          items={recommendedAssessments} // Show subset
          className="grid grid-cols-1 md:grid-cols-2 gap-2"
        />
        <Button
          className="text-white px-5 flex w-full justify-center items-center rounded-3xl mt-4"
          size="default"
          color="primary"
          onClick={() => onViewAll("recommended")}
        >
          View All
        </Button>
      </div>
    </div>
  );
};

export default AssessmentsCatalogue;
