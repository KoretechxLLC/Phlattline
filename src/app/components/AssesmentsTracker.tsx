"use client";

import { useConfig } from "@/app/hooks/use-config";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface RevenueBarChartProps {
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

const RevenueBarChart = ({
  height = 220,
  chartType = "bar",
  categories = [
    "Timing Issues",
    "Ineffective Leadership",
    "Mismanagement",
    "Project Management",
    "Lack of Innovation",
  ],
}: RevenueBarChartProps) => {
  const [config] = useConfig();
  const { isRtl } = config;
  const { theme: mode } = useTheme();

  const data = [44, 55, 57, 60, 48];

  const chartColors = generateColors(categories.length);

  const series = [
    {
      name: "Assessments",
      data: data.map((value, index) => ({
        x: categories[index],
        y: value,
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
      fontFamily: "Sansation",
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
        fontFamily: "Sansation",
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
          fontFamily: "Sansation",
        },
      },
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          colors: "#ffffff",
          fontFamily: "Sansation",
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
      style: {
        fontFamily: "Sansation",
      },
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

export default RevenueBarChart;
