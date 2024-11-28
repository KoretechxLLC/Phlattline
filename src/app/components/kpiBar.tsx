import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { colors } from "@/app/lib/colors";
import { useTheme } from "next-themes";
import { useConfig } from "@/app/hooks/use-config";
import { getGridConfig, getYAxisConfig } from "@/app/lib/appex-chart-options";
import { useState, useEffect } from "react";
import Spinner from "@/app/components/Spinner"; // Assuming you have a Spinner component

// Define the type for the data structure
type SeriesData = {
  name: string;
  data: number[];
};

const KeyPerformanceBar = ({ height = 280 }) => {
  const [loading, setLoading] = useState(true);

  // Explicitly define the type of 'data' as SeriesData[]
  const [data, setData] = useState<SeriesData[]>([]);

  const [config] = useConfig();
  const { theme: mode } = useTheme();

  const series: SeriesData[] = [
    {
      name: "Key Performance Indicators",
      data: [44, 50, 60],
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
    colors: [colors.kpi],
    tooltip: {
      theme: "dark",
    },
    grid: getGridConfig(),
    yaxis: getYAxisConfig(
      mode === "light" ? colors["default-600"] : colors["default-300"]
    ),
    xaxis: {
      categories: [
        "Sales Growth",
        "Customer Satisfaction",
        "Employee Performance",
      ],
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

  // Simulate loading and data fetch
  useEffect(() => {
    setTimeout(() => {
      setData(series); // Mocking data fetching
      setLoading(false); // Set loading state to false after data is fetched
    }, 1500);
  }, []);

  return (
    <div>
      {!loading ? (
        <div className="flex justify-center items-center py-24">
          <Spinner height="30px" width="30px" />
        </div>
      ) : data.length === 0 ? (
        <div className="text-center py-6 text-gray-500">No Data Found</div>
      ) : (
        <Chart
          options={options}
          series={data}
          type="bar"
          height={height}
          width="100%"
        />
      )}
    </div>
  );
};

export default KeyPerformanceBar;
