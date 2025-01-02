"use client";

import { useConfig } from "@/app/hooks/use-config";
import {
  fetchAssessments,
  resetSuccess,
} from "@/redux/slices/individualassessment.slice";
import { fetchAssessmentsResponse } from "@/redux/slices/individualAssessmentResponse.slice";
import { RootState } from "@/redux/store";
import dynamic from "next/dynamic";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import GraphLoader from "./graphLoader";
import Spinner from "./Spinner";
import { ImprovementAssessmentResult } from "@/redux/slices/assessmentResults.slice";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface AssessmentTrackerProps {
  height?: number;
  chartType?: "bar" | "area";
  categories?: string[];
}

const generateColors = (numFields: number) => {
  const colors = [];
  for (let i = 0; i < numFields; i++) {
    colors.push(i % 2 === 0 ? "#FF0700" : "#FDF53F");
  }
  return colors;
};

const calculatePercentages = (assessmentsResponse: any, assessments: any) => {
  let calculatedGraph =
    assessments &&
    assessments?.length > 0 &&
    assessments
      .map((index: any) => {
        let responseData = assessmentsResponse
          ?.map((e: any) => {
            if (e?.question?.individual_assessment_id == index?.id) {
              let assessementTrack = e?.question?.individual_assessment_options
                .map((option: any) => {
                  if (e?.selected_option == option?.option_text) {
                    return option.percentage;
                  }
                })
                .filter(Boolean);

              return {
                id: e?.question?.individual_assessment_id,
                percentage: assessementTrack,
              };
            }
          })
          .filter(Boolean);

        let totalPercentage = 0;

        responseData.forEach((item: any) => {
          const currentSum =
            item?.percentage.length > 0
              ? item?.percentage.reduce((sum: any, val: any) => sum + val, 0)
              : 0;

          totalPercentage += currentSum;
        });

        if (responseData && responseData.length > 0) {
          return {
            title: index.title,
            percentage:
              totalPercentage / index.individual_assessment_questions.length,
          };
        }
      })
      .filter(Boolean);

  return calculatedGraph;
};

const InitialAssessmentsReport = ({
  height = 170,
  chartType = "bar",
}: AssessmentTrackerProps) => {
  const [config] = useConfig();
  const { isRtl } = config;

  const [allCategories, setAllCategories] = useState<any>([]);
  const { assessments, loading, error, success } = useSelector(
    (state: RootState) => state.assessment
  );
  const [improveResult, setImproveResult] = useState<any>([]);

  const {
    responseLoading,
    responseError,
    assessmentsResponse,
    responseSuccess,
  } = useSelector((state: RootState) => state.assessmentResponse);

  const {
    improvementResult,
    improvementResultError,
    improvementResultSuccess,
    improvementResultLoading,
  } = useSelector((state: RootState) => state.assessmnentResult);

  const { userData } = useSelector((state: RootState) => state.auth);
  const userId: any = userData?.id;
  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(
      fetchAssessments({
        filter: {
          page: 1,
          size: 5,
          categoryId: 1,
          userId,
        },
        type: "general",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAssessmentsResponse({ userId }));
  }, [dispatch, userId]);

  useEffect(() => {
    if (responseSuccess) {
      dispatch(resetSuccess());
    }
  }, [responseSuccess]);
  useEffect(() => {
    if (assessments && assessments.length > 0) {
      const categories =
        assessments?.length > 0 ? assessments?.map((e: any) => e?.title) : [];
      setAllCategories(categories);
    }
  }, [assessments]);

  useEffect(() => {
    if (userId) {
      dispatch(ImprovementAssessmentResult({ userId }));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (improvementResultSuccess) {
      setImproveResult(improvementResult?.[0]);
    }
  }, [improvementResultSuccess]);

  const data = calculatePercentages(assessmentsResponse, assessments);


  const chartColors = generateColors(allCategories.length);
  const series = [
    {
      name: "Assessments",
      data:
        data &&
        data.length > 0 &&
        data.map((value: any, index: any) => ({
          x: value?.title,
          y: value?.percentage,
          fillColor: chartColors[index],
        })),
    },
    {
      name: "AfterCourseAssessment",
      data:
        improveResult &&
        improveResult.length > 0 &&
        improveResult.map((value: any, index: any) => {
          return {
            x: value?.title,
            y: value?.totalPercentages.toFixed(0), // Replace this with actual logic for "Responses" percentage
            fillColor: "#00FF7F", // Add a unique color for the second series
          };
        }),
    },
  ];

  const options: any = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: "rounded-full",
        columnWidth: "20%",
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "right",
      fontSize: "20px",
      offsetY: -60,
      markers: {
        width: 8,
        height: 8,
        offsetY: -1,
        offsetX: -5,
        radius: 12,
      },
      labels: {
        colors: "#62626280",
      },
      itemMargin: {
        horizontal: 12,
        vertical: 0,
      },
    },
    title: {
      align: "left",
      offsetY: 13,
      offsetX: isRtl ? "0%" : 0,
      floating: false,
      style: {
        fontSize: "20px",
        fontWeight: "500",
        color: "#62626280",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    yaxis: {
      percentage: [0, 10, 30, 70, 100],
      labels: {
        style: {
          colors: "#ffffff",
        },
      },
    },
    xaxis: {
      categories: allCategories,
      labels: {
        style: {
          colors: "#ffffff",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      theme: "dark",
      style: {},
      y: {
        formatter: function (val: number) {
          return val + "%";
        },
      },
    },
    grid: {
      show: false,
      borderColor: "#62626280",
      strokeDashArray: 10,
      position: "back",
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          legend: {
            position: "bottom",
            offsetY: 8,
            horizontalAlign: "center",
          },
          plotOptions: {
            bar: {
              columnWidth: "30%",
            },
            chart: {
              width: "50%",
            },
          },
        },
      },
    ],
  };
  return (
    <>
      {responseLoading || improvementResultLoading ? (
        <div className="text-center text-gray-300">
          <Spinner height="30px" width="30px" />
        </div>
      ) : data && data.length > 0 ? (
        <div className="w-full max-h-[350px] sm:h-[150px] md:h-[180px] lg:h-[250px] ">
          <Chart
            options={options}
            series={series}
            type={chartType}
            height="100%"
            width="100%"
          />
        </div>
      ) : (
        <div className="text-center text-gray-300 py-20">
          Please Submit Assessments First!
        </div>
      )}
    </>
  );
};

export default InitialAssessmentsReport;
