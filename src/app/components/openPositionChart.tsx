"use client";
import { useConfig } from "@/app/hooks/use-config";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/Card";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchDepartmentsWithCounts } from "@/redux/slices/employeee.slice";
import Spinner from "./Spinner";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface PrevResultsTrackerProps {
  height?: number;
  chartType?: "bar" | "area";
}

const OpenPositionChart = ({
  height = 300,
  chartType = "bar",
}: PrevResultsTrackerProps) => {
  const dispatch = useDispatch<any>();
  const [config] = useConfig();
  const { isRtl } = config;
  const { theme: mode } = useTheme();
  const { userData } = useSelector((state: RootState) => state.auth);
  const { departmentCounts } = useSelector((state: RootState) => state.employee);
  const [allDepartments, setAllDepartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // Loading state to show the loader initially

  const organization_id = userData?.organization_id;

  useEffect(() => {
    if (organization_id) {
      setLoading(true); // Start loading
      dispatch(fetchDepartmentsWithCounts(organization_id))
        .unwrap()
        .then(() => setLoading(false)) // Stop loading on success
        .catch(() => setLoading(false)); // Stop loading on error
    }
  }, [dispatch, organization_id]);

  // Inside your component, update the data processing logic
  useEffect(() => {
    if (departmentCounts) {
      // Sort departments by position_count in descending order and take the top 3
      const topDepartments = [...departmentCounts]
        .sort((a, b) => b.position_count - a.position_count)
        .slice(0, 3);
      setAllDepartments(topDepartments);
    }
  }, [departmentCounts]);

  // Map allDepartments data to categories and data for the chart
  const categories = allDepartments.map((dept) => dept.department_name);
  const data = allDepartments.map((dept) => dept.position_count);

  const series = [
    {
      name: "Open Positions",
      data: data.map((value, index) => ({
        x: categories[index],
        y: value,
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
        columnWidth: "30%",
        borderRadius: 5,
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["#FFFFFF"],
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
        colors: "#FFFFFF",
      },
      itemMargin: {
        horizontal: 15,
        vertical: 0,
      },
    },
    title: {
      align: "left",
      offsetY: 13,
      offsetX: isRtl ? "0%" : 0,
      floating: false,
      style: {
        fontSize: "20px",
        fontWeight: "500",
        color: "#FFFFFF",
      },
    },
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      labels: {
        style: {
          colors: "#FFFFFF",
        },
      },
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          colors: "#FFFFFF",
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
      colors: ["#FFFFFF"],
      opacity: 1,
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: function (val: number) {
          return val + " Positions";
        },
      },
    },
    grid: {
      show: false,
      borderColor: "#62626280",
      strokeDashArray: 10,
      position: "back",
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
    <Card className="border border-[#62626280] rounded-3xl h-full">
      <>
        <CardHeader className="mb-2 bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80] rounded-3xl">
          <CardTitle>Open Positions By Department</CardTitle>
        </CardHeader>
        <CardContent className="p-1">
          {loading ? (
            <div className="flex justify-center items-center py-40">
              <Spinner height="30px" width="30px" />
            </div>
          ) : (
            <Chart
              options={options}
              series={series}
              type={chartType}
              height={height}
              width={"100%"}
            />
          )}
        </CardContent>
      </>
    </Card>
  );
};

export default OpenPositionChart;