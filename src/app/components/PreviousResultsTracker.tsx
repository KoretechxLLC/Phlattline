"use client";

import { useConfig } from "@/app/hooks/use-config";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import Spinner from "@/app/components/Spinner"; // Adjust the import based on your project's structure

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

  const data = [44, 55, 57, 60, 48]; // This data could be fetched dynamically
  const isLoading = false; // Set this to true while loading data (e.g., fetching from an API)

  const isDataEmpty = !data || data.length === 0;

  const series = [
    {
      name: "Assessments",
      data: data.map((value, index) => ({
        x: categories[index],
        y: value,
        fillColor: "#FFFFFF",
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
        borderRadius: 5,
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["#000000"],
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
    dataLabels: {
      enabled: false,
    },
    yaxis: {
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
      opacity: 1,
    },
    tooltip: {
      theme: mode === "dark" ? "dark" : "light",
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
          },
        },
      },
    ],
  };

  return (
    <div className="relative w-full h-[215px] sm:h-[280px] md:h-[320px] 4xl:h-[205px] lg:h-[215px]">
      {isLoading ? (
        <Spinner height="20vh" /> // Show spinner when loading
      ) : isDataEmpty ? (
        <div className="text-gray-500">No data found</div> // Message when no data is found
      ) : (
        <Chart
          options={options}
          series={series}
          type={chartType}
          height="100%"
          width="100%"
        />
      )}
    </div>
  );
};

export default PreviousResultsTracker;
