"use client";
import React, { useEffect, useState } from "react";
import { HoverEffect } from "@/app/components/card-hover-effect";
import { CardTitle } from "@/app/components/Card";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  fetchOrganizationAssessments,
  fetchassessmentsCount,
} from "@/redux/slices/individualassessment.slice";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/app/components/button-sidebar";
import GraphLoader from "@/app/components/graphLoader";
import Spinner from "@/app/components/Spinner";

const OrganizationAssessments = () => {
  const [assessmentData, setAssessmentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const assessmentsPerPage = 12;

  const {
    organizationAssessments,
    organizationLoading,
    organizationError,
    organizationAssessmentsSuccess,
    assessmentsCount,
    assessmentsCountLoading,
    assessmentsCountSuccess,
  }: any = useSelector((state: RootState) => state.assessment);
  const { userData } = useSelector((state: RootState) => state.auth);
  const dispatch: any = useDispatch();
  const user_Id = userData?.id;
  useEffect(() => {
    if (user_Id) {
      dispatch(
        fetchassessmentsCount({
          filter: { userId: user_Id, assessmentFor: "organization" },
        })
      );
    }
  }, [dispatch, userData]);

  useEffect(() => {
    if (assessmentsCountSuccess) {
      const pages = Math.ceil(assessmentsCount / assessmentsPerPage);
      setTotalPage(pages);
    }
  }, [assessmentsCountSuccess, assessmentsCount]);

  useEffect(() => {
    dispatch(
      fetchOrganizationAssessments({
        filter: {
          page: currentPage,
          size: assessmentsPerPage,
          userId: user_Id,
          assessmentFor: "organization",
        },
      })
    );
  }, [dispatch, currentPage, userData]);

  useEffect(() => {
    if (organizationAssessmentsSuccess) {
      setAssessmentData(organizationAssessments);
    }
  }, [organizationAssessmentsSuccess, organizationAssessments]);

  const handleNextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="w-full mx-auto px-8">
      {organizationLoading ? (
        <div className="text-center text-gray-300 py-12">
          <Spinner height="30px" width="30px" />
        </div>
      ) : assessmentData && assessmentData.length > 0 ? (
        <>
          <CardTitle>Organization Assessments</CardTitle>
          <HoverEffect
            className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2"
            items={assessmentData}
          />
          {assessmentsCount > assessmentsPerPage && (
            <div className="flex items-center justify-center gap-2 py-4">
              <Button
                variant="outline"
                size="icon"
                className="w-8 h-8 border-transparent hover:bg-transparent"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-5 h-5 text-default-900" />
              </Button>
              <span className="text-sm font-medium text-default-900">
                Page {currentPage} of {totalPage}
              </span>
              <Button
                variant="outline"
                size="icon"
                className="w-8 h-8 border-transparent hover:bg-transparent"
                onClick={handleNextPage}
                disabled={currentPage >= totalPage}
              >
                <ChevronRight className="w-5 h-5 text-default-900" />
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center text-gray-300 py-24">
          No Organization Assessment Found!
        </div>
      )}
    </div>
  );
};

export default OrganizationAssessments;
