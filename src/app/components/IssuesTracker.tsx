"use client";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

import { useConfig } from "@/app/hooks/use-config";
import { useMediaQuery } from "@/app/hooks/use-media-query";
import Spinner from "@/app/components/Spinner"; // Adjust the import based on the actual location of your Spinner component.

const BasicDonut = ({ height = 200 }) => {
  const [config] = useConfig();

  // Use media query to determine if the screen size is below medium
  const isMediumScreen = useMediaQuery("(min-width: 768px)");

  const series = [66, 40, 18]; // This data should be dynamic or fetched
  const isLoading = false; // Set this to true while loading data (e.g., fetching from an API)

  const options: any = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    labels: ["High", "Medium", "Low"],
    dataLabels: {
      enabled: true,
      style: {
        fontSize: isMediumScreen ? "17px" : "10px", // Adjust font size based on screen size
      },
    },
    stroke: {
      width: 0,
    },
    // Assign specific colors for each segment
    colors: ["#008000", "#FFFF00", "#FF0000"], // Green for High, Yellow for Medium, Red for Low
    tooltip: {
      enabled: false,
    },
    legend: {
      fontSize: isMediumScreen ? "16px" : "12px", // Adjust legend font size based on screen size
      labels: {
        colors: "#fff",
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

  // Check if the series data is empty or undefined
  const isDataEmpty = !series || series.length === 0;

  return (
    <div className="relative w-full h-[280px] sm:h-[320px] md:h-[400px] 4xl:h-[190px] lg:h-[200px]">
      {isLoading ? (
        <Spinner height="20vh" /> // Show spinner when loading
      ) : isDataEmpty ? (
        <div className="text-gray-500">No data found</div> // Message when no data is found
      ) : (
        <Chart
          options={options}
          series={series}
          type="donut"
          height="100%"
          width="100%"
        />
      )}
    </div>
  );
};

export default BasicDonut;
