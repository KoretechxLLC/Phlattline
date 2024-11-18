"use client";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { colors } from "@/app/lib/colors";
import { useTheme } from "next-themes";

import { useConfig } from "@/app/hooks/use-config";

const LeadershipAssessmentChart = ({ height = 300 }) => {
  const [config] = useConfig();
  const { theme: mode } = useTheme();

  const series = [44, 55];

  const options: any = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    labels: ["Poor", "Good"],
    theme: {
      monochrome: {
        enabled: false, // Disabled monochrome to reflect custom colors
      },
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 90,
        offsetY: 10,
      },
    },
    dataLabels: {
      formatter(val: number, opts: any) {
        const name = opts.w.globals.labels[opts.seriesIndex];
        return [name, val.toFixed(1) + "%"];
      },
    },
    stroke: {
      width: 0,
    },
    fill: {
      colors: [colors.chartyellow, colors.chartred], // Custom colors applied here
    },
    tooltip: {
      theme: mode === "dark" ? "dark" : "light",
    },
    legend: {
      show: true,
      position: "bottom",
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
        fillColors: [colors.chartyellow, colors.chartred], // Ensure markers match chart colors
      },
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  };

  return (
    <div className="relative flex flex-col items-center">
      <Chart
        options={options}
        series={series}
        type="donut"
        height={height}
        width="100%"
      />
    </div>
  );
};

export default LeadershipAssessmentChart;
