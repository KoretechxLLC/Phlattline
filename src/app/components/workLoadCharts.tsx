"use client";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { colors } from "@/app/lib/colors";
import { useTheme } from "next-themes";

import { useConfig } from "@/app/hooks/use-config";
import { getGridConfig, getYAxisConfig } from "@/app/lib/appex-chart-options";

const WorkLoadBar = ({ height = 180 }) => {
  const [config] = useConfig();
  const { theme: mode } = useTheme();

  const series = [
    {
      name: "Completed",
      data: [44, 55, 41, 37, 22, 43, 21],
    },
    {
      name: "Remaining",
      data: [53, 32, 33, 52, 13, 43, 32],
    },
    {
      name: "Overdue",
      data: [12, 17, 11, 9, 15, 11, 20],
    },
  ];
  const options: any = {
    chart: {
      toolbar: {
        show: false,
      },
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          total: {
            enabled: false,
          },
        },
      },
    },
    dataLabels: {
      enabled: true,
      offsetX: 0,
      style: {
        fontSize: "12px",
        colors: [
          mode === "light" ? colors["default-600"] : colors["default-300"],
        ],
      },
    },
    stroke: {
      show: false,
      width: 1,
      colors: [
        mode === "light" ? colors["default-600"] : colors["default-300"],
      ],
    },
    colors: [colors.completed, colors.overdue, colors.remaining],
    tooltip: {
      theme: mode === "dark" ? "dark" : "light",
    },
    grid: getGridConfig(),
    yaxis: getYAxisConfig(
      mode === "light" ? colors["default-600"] : colors["default-300"]
    ),
    xaxis: {
      categories: ["Mike", "John", "Jennifer", "Brandon", "Sam"],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: [
            mode === "light" ? colors["default-600"] : colors["default-300"],
          ],
        },
      },
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },

    legend: {
      position: "top",
      horizontalAlign: "left",
      offsetX: 40,
      labels: {
        colors:
          mode === "light" ? colors["default-600"] : colors["default-300"],
      },
      itemMargin: {
        horizontal: 5,
        vertical: 5,
      },
      markers: {
        width: 12,
        height: 12,
        radius: 2,
        offsetX: config.isRtl ? 5 : -5,
      },
    },
  };
  return (
    <Chart
      options={options}
      series={series}
      type="bar"
      height={height}
      width={"100%"}
    />
  );
};

export default WorkLoadBar;
