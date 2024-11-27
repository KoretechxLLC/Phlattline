"use client";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { colors } from "@/app/lib/colors";
import { useTheme } from "next-themes";
import { useConfig } from "@/app/hooks/use-config";
import Spinner from "@/app/components/Spinner"; // Adjust the import based on your project's structure
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const CoursesResults = ({ height = 280 }) => {
  const [config] = useConfig();
  const dispatch: any = useDispatch();
  const { usercourses } = useSelector((state: RootState) => state.courses);

  const { userData } = useSelector((state: RootState) => state.auth);
  const { theme: mode } = useTheme();

  const isLoading = false;

  const courseStatusCounts = {
    notStarted: 0,
    inProgress: 0,
    completed: 0,
  };

  usercourses.forEach((course: any) => {
    if (course.status === "notStarted") courseStatusCounts.notStarted++;
    else if (course.status === "inprogress") courseStatusCounts.inProgress++;
    else if (course.status === "completed") courseStatusCounts.completed++;
  });

  const series = [
    courseStatusCounts.notStarted,
    courseStatusCounts.inProgress,
    courseStatusCounts.completed,
  ];

  // Check if data is empty
  const isDataEmpty = !series || series.every((value) => value === 0);

  const options: any = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    labels: ["Not Started", "In Progress", "Completed"],
    theme: {
      monochrome: {
        enabled: false, // Disable monochrome theme
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
      formatter(val: number) {
        return [val.toFixed(1) + "%"];
      },
    },
    stroke: {
      width: 0,
    },
    fill: {
      colors: ["#FF0700", "#FDF53F", "#1AB700"], // Red for Not Started, Yellow for In Progress, Green for Completed
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
        vertical: 7,
      },
      markers: {
        width: 10,
        height: 2,
        radius: 2,
        offsetX: config.isRtl ? 4 : -5,
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
    <div className="relative w-full min-h-[200px]  md:h-[250px] 4xl:h-[220px] lg:h-[330px]">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <Spinner height="30px" width="30px" />
        </div>
      ) : isDataEmpty ? (
        <div className="flex items-center justify-center h-full">
          <span className="text-gray-500">No data found</span>
        </div>
      ) : (
        <>
          <Chart
            options={options}
            series={series}
            type="donut"
            height="100%"
            width="100%"
          />
          {/* Custom labels */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-white text-xl font-bold">inProgress</span>
            <span className="text-[#FDF53F] text-xl">
              {courseStatusCounts.inProgress}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default CoursesResults;
