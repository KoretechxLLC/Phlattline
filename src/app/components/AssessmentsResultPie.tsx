"use client";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

import { useConfig } from "@/app/hooks/use-config";
import { useMediaQuery } from "@/app/hooks/use-media-query";

const AssessmentResultPie = ({ height = 200 }) => {
  const [config] = useConfig();

  // Use media query to determine if the screen size is below medium
  const isMediumScreen = useMediaQuery("(min-width: 768px)");

  const series = [13, 55, 44];

  const options: any = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    stroke: {
      width: 0,
    },
    labels: ["Ongoing", "Skipped", "Attempted"],
    dataLabels: {
      enabled: true,
      style: {
        fontSize: isMediumScreen ? "17px" : "10px", // Adjust font size based on screen size
      },
    },
    // Assign specific colors for each segment
    colors: ["#C4421B", "#BAA716", "#FFFFFF"], // White, Orange, Yellow
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
      fontSize: isMediumScreen ? "18px" : "15px", // Adjust legend font size based on screen size
      labels: {
        colors: "#fff", // Adjust colors based on mode
        fontSize: isMediumScreen ? "18px" : "15px", // Adjust legend font size
      },
      itemMargin: {
        horizontal: 5,
        vertical: 5,
      },
      markers: {
        width: 12, // Increase marker size
        height: 12, // Increase marker size
        radius: 12,
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

export default AssessmentResultPie;
