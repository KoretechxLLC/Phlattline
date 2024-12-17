"use client";
import dynamic from "next/dynamic";
import { useConfig } from "@/app/hooks/use-config";
import { useMediaQuery } from "@/app/hooks/use-media-query";
import Spinner from "./Spinner";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const calculatePercentages = (assessmentsResponse: any, assessments: any) => {
  if (!Array.isArray(assessmentsResponse) || !Array.isArray(assessments)) {
    console.error("Invalid data structures", {
      assessmentsResponse,
      assessments,
    });
    return [];
  }

  return assessments
    .map((index: any) => {
      const responseData = assessmentsResponse
        .map((e: any) => {
          if (e?.question?.individual_assessment_id === index?.id) {
            const assessementTrack = Array.isArray(
              e?.question?.individual_assessment_options
            )
              ? e?.question?.individual_assessment_options
                  .map((option: any) => {
                    if (e?.selected_option === option?.option_text) {
                      return option.percentage;
                    }
                  })
                  .filter(Boolean)
              : [];

            return {
              id: e?.question?.individual_assessment_id,
              percentage: assessementTrack,
            };
          }
        })
        .filter(Boolean);

      let totalPercentage = 0;

      responseData.forEach((item: any) => {
        const currentSum = Array.isArray(item?.percentage)
          ? item?.percentage.reduce((sum: number, val: number) => sum + val, 0)
          : 0;

        totalPercentage += currentSum;
      });

      if (responseData && responseData.length > 0) {
        return {
          title: index.title,
          percentage:
            totalPercentage /
            (index.individual_assessment_questions?.length || 1),
        };
      }
    })
    .filter(Boolean);
};

const AssessmentResultPie = ({ height = 280 }) => {
  const [config] = useConfig();
  const isMediumScreen = useMediaQuery("(min-width: 768px)");
  const { assessments, loading } = useSelector(
    (state: RootState) => state.assessment
  );
  const { assessmentsResponse, responseLoading } = useSelector(
    (state: RootState) => state.assessmentResponse
  );
  const { improvementResultLoading } = useSelector(
    (state: RootState) => state.assessmnentResult
  );

  const [improvePer, setImprovePer] = useState<number>(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (assessmentsResponse && assessments) {
      // Call the calculatePercentages function instead of inline logic
      const percentages = calculatePercentages(
        assessmentsResponse,
        assessments
      );

      const total = percentages.reduce(
        (acc: any, curr: any) => acc + curr.percentage,
        0
      );
      setImprovePer(Math.round(total / (percentages.length || 1)));
    }
  }, [assessmentsResponse, assessments]);

  const other = 100 - improvePer;
  const series = [improvePer, other];
  const isLoading = loading || responseLoading || improvementResultLoading;

  const options: any = {
    chart: {
      toolbar: { show: false },
    },
    stroke: { width: 0 },
    labels: ["Achievement Progress", "Skill Gap"],
    dataLabels: {
      enabled: true,
      style: {
        fontSize: isMediumScreen ? "17px" : "12px",
      },
    },
    colors: ["#BAA716", "#FFFFFF"],
    tooltip: { enabled: false },
    legend: {
      fontSize: isMediumScreen ? "16px" : "12px",
      labels: { colors: "#ffffff" },
      itemMargin: { horizontal: 5, vertical: 5 },
      markers: { width: 12, height: 12, radius: 12 },
    },
  };

  return (
    <div className="relative h-[280px]">
      {isLoading ? (
        <Spinner height="30px" width="30px" />
      ) : isClient && improvePer ? (
        <Chart
          options={options}
          series={series}
          type="pie"
          height="100%"
          width="100%"
        />
      ) : (
        <div className="text-center   text-gray-300 py-20">
          Please Submit Assessments First!
        </div>
      )}
    </div>
  );
};

export default AssessmentResultPie;
