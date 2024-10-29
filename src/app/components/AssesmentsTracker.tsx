"use client";

import { useConfig } from "@/app/hooks/use-config";
import { fetchAssessments } from "@/redux/slices/individualassessment.slice";
import { fetchAssessmentsResponse } from "@/redux/slices/individualAssessmentResponse.slice";
import { RootState } from "@/redux/store";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  let calculatedGraph = assessments.map((index: any) => {
    let responseData = assessmentsResponse
      .map((e: any) => {
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

    return {
      title: index.title,
      percentage:
        totalPercentage / index.individual_assessment_questions.length,
    };
  });
  return calculatedGraph;
};

const AsessmentTracker = ({
  height = 220,
  chartType = "bar",
}: AssessmentTrackerProps) => {
  const [config] = useConfig();
  const { isRtl } = config;

  const [allCategories, setAllCategories] = useState<any>([]);
  const { assessments, loading, error, success } = useSelector(
    (state: RootState) => state.assessment
  );

  const {
    responseLoading,
    responseError,
    assessmentsResponse,
    responseSuccess,
  } = useSelector((state: RootState) => state.assessmentResponse);

  const dispatch: any = useDispatch();

  useEffect(() => {
    if (!assessments || assessments?.length == 0) {
      dispatch(fetchAssessments());
    }
  }, []);

  useEffect(() => {
    if (!assessmentsResponse || assessmentsResponse.length == 0) {
      dispatch(fetchAssessmentsResponse());
    }
  }, [success]);

  useEffect(() => {
    if (assessments && assessments.length > 0) {
      const categories =
        assessments?.length > 0 ? assessments?.map((e: any) => e?.title) : [];
      setAllCategories(categories);
    }
  }, [assessments.length, success]);

  const data = calculatePercentages(assessmentsResponse, assessments);

  const chartColors = generateColors(allCategories.length);

  const series = [
    {
      name: "Assessments",
      data: data.map((value: any, index: any) => ({
        x: value.title || allCategories[index],
        y: value.percentage,
        fillColor: chartColors[index],
      })),
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
        endingShape: "rounded",
        columnWidth: "5%",
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "right",
      fontSize: "10px",
      offsetY: -30,
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
        horizontal: 15,
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
      percentage: [0, 10, 40, 70, 100],
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
    <Chart
      options={options}
      series={series}
      type={chartType}
      height={height}
      width={"100%"}
    />
  );
};

export default AsessmentTracker;
