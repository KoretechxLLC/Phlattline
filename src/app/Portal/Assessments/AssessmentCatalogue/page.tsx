"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/app/components/button-sidebar";
import { CardTitle } from "@/app/components/Card";
import { HoverEffect } from "@/app/components/card-hover-effect";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  fetchAssessments,
  fetchRecommendedAssessments,
} from "@/redux/slices/individualassessment.slice";
import GraphLoader from "@/app/components/graphLoader";

const AssessmentsCatalogue: React.FC<any> = ({ onViewAll }) => {
  const [assessmentCatalogueData, setAssessmentCatalogueData] = useState([]);
  const [recommendedCatalogueData, setRecommendedCatalogueData] = useState([]);
  const {
    assessments,
    loading,
    error,
    assessmentsSuccess,
    recommendedAssessment,
    recommendedAssessmentLoading,
    recommendedAssessmentSuccess,
    recommendedAssessmentError,
  }: any = useSelector((state: RootState) => state.assessment);
  const { userData } = useSelector((state: RootState) => state.auth);
  const categoryId = userData?.categoryId;

  const dispatch: any = useDispatch();
  useEffect(() => {
    dispatch(
      fetchAssessments({
        filter: { page: 1, size: 12 },
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchRecommendedAssessments({
        filter: {
          page: 1,
          size: 12,
          categoryId: categoryId,
        },
      })
    );
  }, [dispatch, categoryId]);

  useEffect(() => {
    if (recommendedAssessmentSuccess) {
      setRecommendedCatalogueData(recommendedAssessment);
    }
  }, [recommendedAssessmentSuccess, recommendedAssessment]);

  useEffect(() => {
    if (assessmentsSuccess) {
      setAssessmentCatalogueData(assessments);
    }
  }, [assessments, assessmentsSuccess]);

  return (
    <div className="px-0 md:px-4 grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-4 w-full h-full">
      {/* Individual Assessments Section */}
      <div className="bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] rounded-xl p-5 w-full">
        {loading ? (
          <div className="text-center text-gray-300 py-12">
            <GraphLoader />
          </div>
        ) : assessmentCatalogueData && assessmentCatalogueData.length > 0 ? (
          <>
            <CardTitle className="text-xl">Individual Assessments</CardTitle>
            <HoverEffect
              items={assessmentCatalogueData?.slice(0, 2)} // Show subset
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
        ) : (
          <div className="text-center text-gray-300 py-24">
            No Assessments Found!
          </div>
        )}
      </div>

      {/* Recommended Assessments Section */}
      <div className="bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] rounded-xl 4xl:p-3 p-5 w-full">
        {recommendedAssessmentLoading ? (
          <div className="text-center text-gray-300 py-12">
            <GraphLoader />
          </div>
        ) : recommendedCatalogueData && recommendedCatalogueData.length > 0 ? (
          <>
            <CardTitle className="text-xl">Recommended Assessments</CardTitle>
            <HoverEffect
              items={recommendedCatalogueData.slice(0, 2)} // Show subset
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
          </>
        ) : (
          <div className="text-center text-gray-300 py-24">
            No Recommended Assessments Found!
          </div>
        )}
      </div>
    </div>
  );
};

export default AssessmentsCatalogue;
