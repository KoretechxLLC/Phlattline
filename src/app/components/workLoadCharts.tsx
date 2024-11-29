"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { colors } from "@/app/lib/colors";
import { useTheme } from "next-themes";

import { useConfig } from "@/app/hooks/use-config";
import { getGridConfig, getYAxisConfig } from "@/app/lib/appex-chart-options";
import Spinner from "./Spinner"; // Assuming you have a spinner component

const WorkLoadBar = ({ height = 180 }) => {
  const [config] = useConfig();
  const { theme: mode } = useTheme();
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [series, setSeries] = useState<any[]>([]); // Data state for the chart

  useEffect(() => {
    // Simulate data fetching or processing delay
    const loadData = setTimeout(() => {
      // Simulate empty or available data
      setSeries([
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
      ]); // Replace this with an empty array `[]` to simulate no data
      setLoading(false); // Set loading to false after data is set
    }, 2000); // Simulate 2 seconds delay

    return () => clearTimeout(loadData); // Cleanup on unmount
  }, []);

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
    tooltip: {
      enabled: false,
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
    <div>
      {loading ? (
        // Show spinner while loading
        <div className="flex justify-center items-center h-[180px]">
          <Spinner height="30px" width="30px" />
        </div>
      ) : series.length > 0 ? (
        // Show "No workload found" message if no data is present
        <Chart
          options={options}
          series={series}
          type="bar"
          height={height}
          width={"100%"}
        />
      ) : (
        // Render chart once loading is complete and data is present
        <div className="text-center text-gray-500 py-8">No workload Found</div>
      )}
    </div>
  );
};

export default WorkLoadBar;
