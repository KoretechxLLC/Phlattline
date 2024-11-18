"use client";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

import { colors } from "@/app/lib/colors";
import { useTheme } from "next-themes";
import { hexToRGB } from "@/app/lib/utils";
import { useConfig } from "@/app/hooks/use-config";

const PerformanceChart = ({ height = 350 }) => {
  const [config] = useConfig();
  const { theme: mode } = useTheme();

  const series = [35, 65];

  const options: any = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      width: 0,
    },
    colors: [colors.chartred, colors.chartyellow],
    tooltip: {
      enabled: false,
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
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
      type="pie"
      height={height}
      width={"100%"}
    />
  );
};

export default PerformanceChart;
