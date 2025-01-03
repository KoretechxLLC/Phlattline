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
  fetchOrganizationAssessments,
  fetchTeamAssessments,
} from "@/redux/slices/individualassessment.slice";

import Spinner from "@/app/components/Spinner";

const AssessmentsCatalogue: React.FC<any> = ({ onViewAll }) => {
  const [assessmentCatalogueData, setAssessmentCatalogueData] = useState([]);
  const [teamAssessmentCatalogueData, setTeamAssessmentCatalogueData] =
    useState([]);
  const [
    organizationAssessmentCatalogueData,
    setOrganzationAssessmentCatalogueData,
  ] = useState([]);
  const [recommendedCatalogueData, setRecommendedCatalogueData] = useState([]);
  const {
    assessments,
    loading,
    assessmentsSuccess,
    recommendedAssessment,
    recommendedAssessmentLoading,
    recommendedAssessmentSuccess,
    teamAssessmentsSuccess,
    teamLoading,
    teamAssessments,
    organizationAssessmentsSuccess,
    organizationLoading,
    organizationAssessments,
  }: any = useSelector((state: RootState) => state.assessment);
  const { userData } = useSelector((state: RootState) => state.auth);
  const userType = userData?.user_type_id;
  const categoryId = userData?.categoryId;
  const userId = userData?.id;

  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(
      fetchAssessments({
        filter: { page: 1, size: 12, assessmentFor: "individual", userId },
      })
    );
    if (userType == 2) {
      dispatch(
        fetchTeamAssessments({
          filter: { page: 1, size: 12, assessmentFor: "team", userId },
        })
      );
      dispatch(
        fetchOrganizationAssessments({
          filter: { page: 1, size: 12, assessmentFor: "organization", userId },
        })
      );
    }
  }, [dispatch, userData]);

  useEffect(() => {
    dispatch(
      fetchRecommendedAssessments({
        filter: {
          page: 1,
          size: 12,
          categoryId: categoryId,
          userId,
        },
      })
    );
  }, [dispatch, categoryId, userData]);

  useEffect(() => {
    if (recommendedAssessmentSuccess) {
      const recommendedassessmentDataArray = recommendedAssessment?.filter(
        (e: any) =>
          userData?.purchased_assessments?.every(
            (item: any) => item?.individual_assessments_id != e.id
          )
      );
      setRecommendedCatalogueData(recommendedassessmentDataArray);
    }
  }, [recommendedAssessmentSuccess, recommendedAssessment, userData]);

  useEffect(() => {
    if (assessmentsSuccess) {
      const assessmentData = assessments?.filter((e: any) =>
        userData?.purchased_assessments?.every(
          (item: any) => item?.individual_assessments_id != e.id
        )
      );
      setAssessmentCatalogueData(assessmentData);
    }
  }, [assessments, assessmentsSuccess, userData]);

  useEffect(() => {
    if (teamAssessmentsSuccess) {
      const teamAssessmentData = teamAssessments?.filter((e: any) =>
        userData?.purchased_assessments?.every(
          (item: any) => item?.individual_assessments_id != e.id
        )
      );
      setTeamAssessmentCatalogueData(teamAssessmentData);
    }
  }, [teamAssessments, teamAssessmentsSuccess, userData]);

  useEffect(() => {
    if (organizationAssessmentsSuccess) {
      const OrganizationAssessmentData = organizationAssessments?.filter(
        (e: any) =>
          userData?.purchased_assessments?.every(
            (item: any) => item?.individual_assessments_id != e.id
          )
      );
      setOrganzationAssessmentCatalogueData(OrganizationAssessmentData);
    }
  }, [organizationAssessments, organizationAssessmentsSuccess, userData]);

  return (
    <div className="px-0 md:px-4 grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-4 w-full h-full">
      {/* Individual Assessments Section */}
      <div className="bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] rounded-xl p-5 w-full">
        {loading ? (
          <div className="text-center text-gray-300 py-12">
            <Spinner height="30px" width="30px" />
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
            No Individual Assessments Found!
          </div>
        )}
      </div>

      {/* Recommended Assessments Section */}
      <div className="bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] rounded-xl 4xl:p-3 p-5 w-full">
        {recommendedAssessmentLoading ? (
          <div className="text-center text-gray-300 py-12">
            <Spinner height="30px" width="30px" />
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

      {userType === 2 && (
        <>
          {/* Team Assessments Section */}
          <div className="bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] rounded-xl p-5 w-full">
            {teamLoading ? (
              <div className="text-center text-gray-300 py-12">
                <Spinner height="30px" width="30px" />
              </div>
            ) : teamAssessmentCatalogueData &&
              teamAssessmentCatalogueData.length > 0 ? (
              <>
                <CardTitle className="text-xl">Team Assessments</CardTitle>
                <HoverEffect
                  items={teamAssessmentCatalogueData?.slice(0, 2)} // Show subset
                  className="grid grid-cols-1 md:grid-cols-2 gap-2"
                />
                <Button
                  className="text-white px-5 flex w-full justify-center items-center rounded-3xl mt-4"
                  size="default"
                  color="primary"
                  onClick={() => onViewAll("team")}
                >
                  View All
                </Button>
              </>
            ) : (
              <div className="text-center text-gray-300 py-24">
                No Team Assessments Found!
              </div>
            )}
          </div>

          {/* Organization Assessments Section */}
          <div className="bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] rounded-xl 4xl:p-3 p-5 w-full h-full">
            {organizationLoading ? (
              <div className="text-center text-gray-300 py-12">
                <Spinner height="30px" width="30px" />
              </div>
            ) : organizationAssessmentCatalogueData &&
              organizationAssessmentCatalogueData.length > 0 ? (
              <>
                <CardTitle className="text-xl">
                  Organization Assessments
                </CardTitle>
                <HoverEffect
                  items={organizationAssessmentCatalogueData.slice(0, 2)} // Show subset
                  className="grid grid-cols-1 md:grid-cols-2 gap-2"
                />
                <Button
                  className="text-white px-5 flex w-full justify-center items-center rounded-3xl mt-4"
                  size="default"
                  color="primary"
                  onClick={() => onViewAll("organization")}
                >
                  View All
                </Button>
              </>
            ) : (
              <div className="flex justify-center align-center text-gray-300 py-24">
                No Organization Assessments Found!
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AssessmentsCatalogue;
