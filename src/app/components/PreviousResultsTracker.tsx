"use client";
import { useConfig } from "@/app/hooks/use-config";
import { RootState } from "@/redux/store";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GraphLoader from "./graphLoader";
import { fetchAssessmentResult } from "@/redux/slices/assessmentResults.slice";
import Spinner from "./Spinner";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface AssessmentTrackerProps {
  height?: number;
  chartType?: "bar" | "area";
  categories?: string[];
}

const PreviousResultsTracker = ({
  height = 170,
  chartType = "bar",
}: AssessmentTrackerProps) => {
  const [config] = useConfig();
  const { isRtl } = config;

  const [allCategories, setAllCategories] = useState<any>([]);
  const [data, setData] = useState<any>([]);

  const { userData } = useSelector((state: RootState) => state.auth);
  const { resultLoading, result, resultSuccess, resultError } = useSelector(
    (state: RootState) => state.assessmnentResult
  );
  const userId: any = userData?.id;
  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(
      fetchAssessmentResult({
        userId,
      })
    );
  }, [dispatch]);



  const calculatedGraph = () => {
    let percentages = result.map((e: any) => {
      let trackPercentage =
        e?.percentages?.length > 0 &&
        e?.percentages?.reduce((prev: any, curr: any) => {
          return prev + curr;
        }, 0);
      return {
        title: e?.title,
        percentages: trackPercentage / e?.percentages?.length,
      };
    });
    return percentages;
  };

  useEffect(() => {
    if (resultSuccess && result.length > 0) {
      setData(calculatedGraph().slice(0, 4));
    }
  }, [resultSuccess]);

  const whiteColor = "#ffffff";

  const series = [
    {
      name: "Assessments",
      data:
        data &&
        data.length > 0 &&
        data.map((value: any, index: any) => ({
          x: value?.title,
          y: value?.percentages,
          fillColor: whiteColor,
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
        columnWidth: "20%",
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "right",
      fontSize: "20px",
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
    <>
      {resultLoading ? (
        <div className="flex justify-center items-center w-full h-full py-16">
          <Spinner height="30px" width="30px" />
        </div>
      ) : data && data.length > 0 ? (
        <div className="w-full max-h-[300px] sm:h-[150px] md:h-[180px] lg:h-[250px]">
          <Chart
            options={options}
            series={series}
            type={chartType}
            height="100%"
            width="100%"
          />
        </div>
      ) : (
        <div className="text-center text-gray-500 h-full w-full flex justify-center items-center py-16">
          Please Submit Assessments First!
        </div>
      )}
    </>
  );
};

export default PreviousResultsTracker;
