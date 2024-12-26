"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { colors } from "@/app/lib/colors";
import { useTheme } from "next-themes";
import { useConfig } from "@/app/hooks/use-config";
import { getGridConfig, getYAxisConfig } from "@/app/lib/appex-chart-options";
import Spinner from "./Spinner";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { fetchWorkLoad } from "@/redux/slices/organization.slice";

const WorkLoadBar = ({ height = 180 }) => {
  const [config] = useConfig();
  const { theme: mode } = useTheme();
  const [loading, setLoading] = useState<boolean>(true);
  const [series, setSeries] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [completedGoals, setCompletedGoals] = useState<string[]>([]);
  const [remainingGoals, setRemainingGoals] = useState<string[]>([]);
  const [overDue, setOverDue] = useState<string[]>([]);

  const dispatch: any = useDispatch();
  const { userData } = useSelector((state: RootState) => state.auth);
  const { workLoadLoading, workLoadSuccess, workLoad } = useSelector(
    (state: RootState) => state.organization
  );
  const userId = userData?.id;
  useEffect(() => {
    dispatch(fetchWorkLoad({ userId }));
  }, []);

  useEffect(() => {
    if (workLoad && workLoad?.length > 0) {
      let completedGoalsData: any = [];
      let dueGoalsData: any = [];
      let remainingGoalsData: any = [];
      let allCategories: any = [];
      workLoad.forEach((item: any) => {
        allCategories.push(item?.name || null);
        completedGoalsData.push(item?.completedGoals || 0);
        dueGoalsData.push(item?.dueGoals || 0);
        remainingGoalsData.push(item?.remainingGoals || 0);
      });

      setCategories(allCategories);
      setCompletedGoals(completedGoalsData);
      setOverDue(dueGoalsData);
      setRemainingGoals(remainingGoalsData);

      setSeries([
        {
          name: "Completed",
          data: completedGoalsData || completedGoals,
        },
        {
          name: "Remaining",
          data: remainingGoalsData || remainingGoals,
        },
        {
          name: "Overdue",
          data: dueGoalsData || overDue,
        },
      ]);
    }

    const loadData = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(loadData);
  }, [workLoad, workLoadSuccess]);

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
      categories: categories,
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
      {workLoadLoading || loading ? (
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
