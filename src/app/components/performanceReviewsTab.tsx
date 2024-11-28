"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Card } from "@/app/components/Card";
import { Badge } from "./badge";
import Icon from "./utility-icon";
import Spinner from "./Spinner";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { fetchAllDepartment } from "@/redux/slices/organization.slice";

const CustomerCard = ({ item }: any) => {
  return (
    <div
      className={`relative z-[1] text-center my-1 rounded before:w-full before:h-[calc(100%-60px)] before:absolute before:left-0 before:top-[60px] before:rounded before:z-[-1] before:bg-opacity-[0.1]`}
    >
      <div className={"h-[70px] w-[70px] rounded-full mx-auto mb-4 relative"}>
        <Image
          src={item.profile_image || "/assets/DummyImg.png"}
          alt={item.first_name}
          width={100}
          height={100}
          className="w-full h-full rounded-full"
          priority
        />
      </div>
      <h4 className="text-sm text-default-600 font-semibold mb-4">
        {item.first_name} {item.last_name}
      </h4>
      <h4 className="text-sm text-yellow-500 font-semibold mb-4">
        {item.designation || "No Designation"}
      </h4>
      <div className="flex items-center gap-1 px-16 mb-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Icon
            key={index}
            icon="ph:star-fill"
            className={
              index <
              (item?.employee_review?.[0]?.no_of_stars
                ? item?.employee_review?.[0]?.no_of_stars
                : item?.employee_review?.no_of_stars || 0)
                ? "text-[#dac73b]"
                : "text-gray-400"
            }
          />
        ))}
      </div>
      <div className="inline-block bg-default-900 text-default-100 px-2.5 py-1.5 text-xs font-medium rounded-full min-w-[60px]">
        <Badge className="bg-gradient-to-b text-sm from-[#B50D34] to-[#BAA716] whitespace-nowrap">
          {item.gender}
        </Badge>
      </div>
    </div>
  );
};

const PerformanceReviews = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [loading, setLoading] = useState(false);
  const { departments } = useSelector((state: RootState) => state.organization);
  const { userData } = useSelector((state: RootState) => state.auth);
  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(fetchAllDepartment({ organizationId: userData?.organization_id }));
  }, []);

  // Combine all employees from departments
  const employees = departments?.flatMap((dept: any) => dept.employees) || [];

  const scrollContainerRef = React.useRef<HTMLDivElement | null>(null);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -250,
        behavior: "smooth",
      });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 250,
        behavior: "smooth",
      });
    }
  };

  // Simulate a loading state for the reviews
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <Card className="w-full py-3">
      <div className="relative w-full">
        {loading ? (
          <div className="flex justify-center items-center py-6">
            <Spinner height="30px" width="30px" />
          </div>
        ) : employees.length === 0 ? (
          <div className="text-center text-lg text-gray-500 py-6">
            No employees found
          </div>
        ) : (
          <>
            <div
              ref={scrollContainerRef}
              className="flex space-x-2 pb-3 w-full overflow-hidden scrollbar-hide"
            >
              {employees.map((item: any, i: number) => (
                <CustomerCard item={item} key={`employee-${i}`} />
              ))}
            </div>

            <button
              onClick={handleScrollLeft}
              className="absolute left-2 z-50 top-1/2 transform -translate-y-1/2 p-2 rounded-full"
            >
              <Icon
                icon="tabler:chevron-left"
                className="w-10 h-10 text-[#B50D34]"
              />
            </button>

            <button
              onClick={handleScrollRight}
              className="absolute right-2 z-50 top-1/2 transform -translate-y-1/2 p-2 rounded-full"
            >
              <Icon
                icon="tabler:chevron-right"
                className="w-10 h-10 text-[#B50D34]"
              />
            </button>
          </>
        )}
      </div>
    </Card>
  );
};

export default PerformanceReviews;
