"use client";
import dynamic from "next/dynamic";
import { useConfig } from "@/app/hooks/use-config";
import { useMediaQuery } from "@/app/hooks/use-media-query";
import Spinner from "@/app/components/Spinner"; // Adjust the import based on the actual location of your Spinner component.

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const AssessmentResultPie = ({ height = 280 }) => {
  const [config] = useConfig();

  // Use media query to determine if the screen size is below medium
  const isMediumScreen = useMediaQuery("(min-width: 768px)");

  const series = [55, 45]; // This data should be dynamic or fetched
  const isLoading = false; // Set this to true while loading data (e.g., fetching from an API)

  const options: any = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    stroke: {
      width: 0,
    },
    labels: ["Skipped", "Attempted"],
    dataLabels: {
      enabled: true,
      style: {
        fontSize: isMediumScreen ? "17px" : "12px", // Adjust font size based on screen size
      },
    },
    // Assign specific colors for each segment
    colors: ["#BAA716", "#FFFFFF"], // White, Orange, Yellow
    tooltip: {
      enabled: false,
    },
    legend: {
      fontSize: isMediumScreen ? "16px" : "12px", // Adjust legend font size based on screen size
      labels: {
        colors: "#ffffff", // Adjust colors based on mode
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
    <div className="relative  h-[280px] sm:h-[320px] md:h-[400px] 4xl:h-[190px] lg:h-[280px]">
      {isLoading ? (
        <Spinner height="20vh" /> // Show spinner when loading
      ) : series.length === 0 ? (
        <div className="text-gray-500">No data found</div> // Message when no data is found
      ) : (
        <Chart
          options={options}
          series={series}
          type="pie"
          height="100%"
          width="100%"
        />
      )}
    </div>
  );
};

export default AssessmentResultPie;
