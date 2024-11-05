"use client";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { colors } from "@/app/lib/colors";
const moment = require('moment');
import { useTheme } from "next-themes";
import { useConfig } from "@/app/hooks/use-config";
import Spinner from "@/app/components/Spinner";
import {
  getGridConfig,
  getYAxisConfig,
  getLabel,
} from "@/app/lib/appex-chart-options";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { fetchtimelog } from "@/redux/slices/performanceManagement.slice";
import { duration } from "moment";
import HoursDropdown from "./HoursDropdown";

const ActivityHours = ({ height = 250 }) => {
  const dispatch: any = useDispatch();
  const { userData } = useSelector((state: RootState) => state.auth);
  const { loading, error, success, logSuccess, timeLogs }: any = useSelector((state: RootState) => state.performance);
  const [selectedOption, setSelectedOption] = useState("Weekly");
  const [timelogsData, setTimeLogsData] = useState<any>([]);
  const [timeLogSpent, setTimeLogSpent] = useState(0);
  const [series, setSeries] = useState<any>([
    {
      name: "Hours",
      data: [],
    },
  ]);

  const userId: any = userData?.id;

  useEffect(() => {

    if (userId) {
      if (selectedOption == "Weekly") {
        dispatch(fetchtimelog({ userId: userId, duration: "week" }));
      }
      else if (selectedOption == "Monthly") {
        dispatch(fetchtimelog({ userId: userId, duration: "month" }));
      }
      else if (selectedOption == "Yearly") {
        dispatch(fetchtimelog({ userId: userId, duration: "year" }));
      }
    }
  }, [selectedOption, userId])




  // useEffect(() => {
  //   if (userId) {
  //     dispatch(fetchtimelog({ userId: userId, duration: "week" }));
  //   }
  // }, [dispatch, userId]);

  useEffect(() => {
    if (logSuccess) {
      let logData = timeLogs?.timelogs


      if (logData && logData?.length > 0) {

        let updatedLogData = logData.map((logData: any) => {

          const dayOfWeek = moment(logData?.date).format('dddd');


          return {
            ...logData,
            day: dayOfWeek
          }
        })


        setTimeLogsData(updatedLogData)
        setTimeLogSpent(timeLogs?.totalTimeSpent);
      }
    }
  }, [logSuccess]);

  useEffect(() => {


    if (timelogsData && timelogsData?.length > 0) {

      if (selectedOption?.toLowerCase() == "weekly") {
        let seriesData = timelogsData?.map((data: any) => {
          return (Number(data?.timeSpent) / 60 / 60)
        })


        setSeries([{
          name: "Hours",
          data: seriesData
        }])
      }
      else if (selectedOption?.toLowerCase() == "monthly") {


        const startOfMonth = moment().startOf('month');
        const endOfMonth = moment().endOf('month');

        // Calculate the number of weeks in the month
        const totalWeeksInMonth = endOfMonth.diff(startOfMonth, 'weeks') + 1; // +1 because it includes the starting week

        // Initialize an array with the appropriate number of weeks (4 or 5)
        const weeklyData = Array(totalWeeksInMonth).fill(0);

        // Accumulate time spent for each week
        timelogsData.forEach((log: any) => {
          const logDate = moment(log.date);
          const weekOfMonth = logDate.diff(startOfMonth, 'weeks'); // Calculate the week index within the month

          // Ensure only the weeks in the current month are counted
          if (weekOfMonth >= 0 && weekOfMonth < totalWeeksInMonth) {
            weeklyData[weekOfMonth] += Number(log.timeSpent) / 3600; // Convert seconds to hours
          }
        });




        setSeries([{
          name: "Week",
          data: weeklyData
        }])


      }

      else if (selectedOption?.toLowerCase() === "yearly") {
        const startOfYear = moment().startOf('year');
        const endOfYear = moment().endOf('year');

        const monthlyData = Array(12).fill(0); // 12 months

        timelogsData.forEach((log: any) => {
          const logDate = moment(log.date);
          const monthOfYear = logDate.month(); // Get the month index (0-11)

          if (logDate.isBetween(startOfYear, endOfYear, null, '[]')) {
            monthlyData[monthOfYear] += Number(log.timeSpent) / 3600; // Convert seconds to hours
          }
        });

        setSeries([{
          name: "Month",
          data: monthlyData
        }]);

      }

    }

  }, [timelogsData, timelogsData?.length])

  const [config] = useConfig();
  const { theme: mode } = useTheme();



  const options: any = {
    chart: {
      toolbar: { show: false },
    },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 2 },
    colors: ["#FF0700"],
    tooltip: { enabled: false },
    grid: getGridConfig(),
    yaxis: {
      ...getYAxisConfig(mode === "light" ? colors["default-600"] : colors["default-300"]),
      labels: {
        formatter: (value: any) => `${value}h`,
        style: { colors: mode === "light" ? colors["default-600"] : colors["default-300"] },
      },
    },
    plotOptions: { bar: { horizontal: false, columnWidth: "15%", endingShape: "rounded" } },
    xaxis: {
      categories: selectedOption === "Weekly"
        ? ["S", "M", "T", "W", "T", "F", "S"]
        : selectedOption === "Monthly"
          ? ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"]
          : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      labels: getLabel(mode === "light" ? colors["default-600"] : colors["default-300"]),
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    legend: {
      labels: { colors: mode === "light" ? colors["default-600"] : colors["default-300"] },
      itemMargin: { horizontal: 5, vertical: 5 },
      markers: { width: 10, height: 10, radius: 10, offsetX: config.isRtl ? 5 : -5 },
    },
  };

  return (
    <div>
      <div className="ml-[30em]">
        <HoursDropdown
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      </div>
      <Chart options={options} series={series} type="bar" height={height} width="100%" />
    </div>
  );
};

export default ActivityHours;
