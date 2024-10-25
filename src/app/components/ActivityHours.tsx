"use client";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { colors } from "@/app/lib/colors";
import { useTheme } from "next-themes";
import { hexToRGB } from "@/app/lib/utils";
import { useConfig } from "@/app/hooks/use-config";
import {
  getGridConfig,
  getYAxisConfig,
  getLabel,
} from "@/app/lib/appex-chart-options";

const ActivityHours = ({ height = 250 }) => {
  const [config] = useConfig();
  const { theme: mode } = useTheme();

  const series = [
    {
      name: "Hours",
      data: [4, 5, 7, 6, 1, 8, 3],
    },
  ];

  const options: any = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: ["#FF0700"], // Set the bar color to red
    tooltip: {
      enabled: false,
    },
    grid: getGridConfig(),

    yaxis: {
      ...getYAxisConfig(
        mode === "light" ? colors["default-600"] : colors["default-300"]
      ),
      labels: {
        formatter: function (value: any) {
          return `${value}h`; // Append "h" to represent hours
        },
        style: {
          colors:
            mode === "light" ? colors["default-600"] : colors["default-300"],
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "15%",
        endingShape: "rounded",
      },
    },
    xaxis: {
      categories: ["S", "M", "T", "W", "T", "F", "S"],
      labels: getLabel(
        mode === "light" ? colors["default-600"] : colors["default-300"]
      ),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    legend: {
      labels: {
        colors:
          mode === "light" ? colors["default-600"] : colors["default-300"],
      },
      itemMargin: {
        horizontal: 5,
        vertical: 5,
      },
      markers: {
        width: 10,
        height: 10,
        radius: 10,
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

export default ActivityHours;
