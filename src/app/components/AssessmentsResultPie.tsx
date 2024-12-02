"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Spinner from "./Spinner";
import { fetchAssessmentResult } from "@/redux/slices/assessmentResults.slice";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const AssessmentResultPie = ({ height = 280 }) => {
  const dispatch = useDispatch<any>();
  const { userData } = useSelector((state: RootState) => state.auth);
  const { result, improvementResultLoading } = useSelector(
    (state: RootState) => state.assessmnentResult
  );
  const { assessments, loading } = useSelector(
    (state: RootState) => state.assessment
  );
  const { assessmentsResponse, responseLoading } = useSelector(
    (state: RootState) => state.assessmentResponse
  );

  const [averagePercentage, setAveragePercentage] = useState<number>(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (userData?.id) {
      dispatch(fetchAssessmentResult({ userId: userData.id }));
    }
  }, [userData]);

  useEffect(() => {
    if (userData?.user_type_id === 1 && result && Array.isArray(result)) {
      // Handle the logic for user_type_id === 3 using result
      const totalPercentages = result
        .map((item) =>
          Array.isArray(item.percentages)
            ? item.percentages.reduce((sum:any, val:any) => sum + val, 0) /
              item.percentages.length
            : 0
        )
        .filter((average) => average > 0);

      const overallAverage =
        totalPercentages.reduce((sum, val) => sum + val, 0) /
        (totalPercentages.length || 1);

      setAveragePercentage(Math.round(overallAverage));
    } else if (assessmentsResponse && assessments) {
      // Handle the logic for other user types (default behavior)
      const percentages = assessments.map((index: any) => {
        const responseData = assessmentsResponse
          .map((e: any) => {
            if (e?.question?.individual_assessment_id === index?.id) {
              const assessmentTrack = Array.isArray(
                e?.question?.individual_assessment_options
              )
                ? e?.question?.individual_assessment_options
                    .map((option: any) =>
                      e?.selected_option === option?.option_text
                        ? option.percentage
                        : null
                    )
                    .filter(Boolean)
                : [];
              return {
                id: e?.question?.individual_assessment_id,
                percentage: assessmentTrack,
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
          return totalPercentage / (index.individual_assessment_questions?.length || 1);
        }
      });

      const total = percentages.reduce(
        (acc: any, curr: any) => acc + curr,
        0
      );

      setAveragePercentage(Math.round(total / (percentages.length || 1)));
    }
  }, [userData, result, assessmentsResponse, assessments]);

  const skillGap = 100 - averagePercentage;
  const series = [averagePercentage, skillGap];
  const isLoading = improvementResultLoading || loading || responseLoading;

  const options: any = {
    chart: {
      toolbar: { show: false },
    },
    stroke: { width: 0 },
    labels: ["Achievement Progress", "Skill Gap"],
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "14px",
      },
    },
    colors: ["#BAA716", "#FFFFFF"],
    tooltip: { enabled: false },
    legend: {
      fontSize: "14px",
      labels: { colors: "#ffffff" },
      itemMargin: { horizontal: 5, vertical: 5 },
      markers: { width: 12, height: 12, radius: 12 },
    },
  };

  return (
    <div className="relative h-[280px]">
      {isLoading ? (
        <Spinner height="30px" width="30px" />
      ) : isClient && averagePercentage > 0 ? (
        <Chart
          options={options}
          series={series}
          type="pie"
          height="100%"
          width="100%"
        />
      ) : (
        <div>No data found</div>
      )}
    </div>
  );
};

export default AssessmentResultPie;
