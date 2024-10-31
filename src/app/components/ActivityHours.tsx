"use client";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { colors } from "@/app/lib/colors";
import { useTheme } from "next-themes";
import { useConfig } from "@/app/hooks/use-config";
import Spinner from "@/app/components/Spinner";
import {
  getGridConfig,
  getYAxisConfig,
  getLabel,
} from "@/app/lib/appex-chart-options";

const ActivityHours = ({ height = 250 }) => {
  const [config] = useConfig();
  const { theme: mode } = useTheme();

  const isLoading = false; // Set this to true while loading data (e.g., fetching from an API)
  const data = [4, 5, 7, 6, 1, 8, 3]; // Example data; this could come from an API

  const isDataEmpty = !data || data.length === 0;

  const series = [
    {
      name: "Hours",
      data: data,
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
    colors: ["#FF0700"],
    tooltip: {
      enabled: false,
    },
    grid: getGridConfig(),
    yaxis: {
      ...getYAxisConfig(
        mode === "light" ? colors["default-600"] : colors["default-300"]
      ),
      labels: {
        formatter: (value: any) => `${value}h`,
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
    <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] 4xl:h-[240px] lg:h-[260px]">
      {isLoading ? (
        <Spinner height="25vh" />
      ) : isDataEmpty ? (
        <div className="text-gray-500">No data found</div>
      ) : (
        <Chart
          options={options}
          series={series}
          type="bar"
          height="100%"
          width="100%"
        />
      )}
    </div>
  );
};

export default ActivityHours;
