"use client";

import { useConfig } from "@/app/hooks/use-config";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface PrevResultsTrackerProps {
  height?: number;
  chartType?: "bar" | "area";
  categories?: string[];
}

const PreviousResultsTracker = ({
  height = 215,
  chartType = "bar",
  categories = [
    "Lack of Interest",
    "Focus Problem",
    "Time Management",
    "Operational",
    "Role Specification",
  ],
}: PrevResultsTrackerProps) => {
  const [config] = useConfig();
  const { isRtl } = config;
  const { theme: mode } = useTheme();

  const data = [44, 55, 57, 60, 48];

  const series = [
    {
      name: "Assessments",
      data: data.map((value, index) => ({
        x: categories[index],
        y: value,
        fillColor: "#FFFFFF", // Bar fill color
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
        columnWidth: "15%",
        borderRadius: 5, // Adds rounded corners to the bars
      },
    },
    // Adds stroke (border) to each bar
    stroke: {
      show: true,
      width: 2, // Border thickness
      colors: ["#000000"], // Border color (black)
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
    yaxis: {
      percentage: [0, 10, 40, 70, 100],
      labels: {
        style: {
          colors: "#ffffff",
        },
      },
    },
    xaxis: {
      categories: categories,
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
      opacity: 1, // Ensures the bars are fully filled
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

export default PreviousResultsTracker;
