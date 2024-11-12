"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { Card } from "@/app/components/Card";
import { Badge } from "./badge";
import Icon from "./utility-icon";

const customers = [
  {
    title: "Nicole Kidman",
    img: "/assets/UserProfile.png",
    designation: "Finance",
    value: 3.8,
    bg: "before:bg-info/30",
    barColor: "info",
    number: 2,
  },
  {
    title: "Monica Bellucci",
    img: "/assets/UserProfile.png",
    designation: "Finance",
    value: 3.8,
    bg: "before:bg-warning/30",
    barColor: "warning",
    active: true,
    number: 1,
  },
  {
    title: "Pamela Anderson",
    img: "/assets/UserProfile.png",
    designation: "Finance",
    value: 3.8,
    bg: "before:bg-success/30",
    barColor: "success",
    number: 3,
  },
  {
    title: "Dianne Russell",
    img: "/assets/UserProfile.png",
    designation: "Finance",
    value: 3.8,
    bg: "before:bg-info/30",
    barColor: "info",
    number: 4,
  },
  {
    title: "Robert De Niro",
    img: "/assets/UserProfile.png",
    designation: "Finance",
    value: 3.8,
    bg: "before:bg-warning/30",
    barColor: "warning",
    number: 5,
  },
  {
    title: "De Niro",
    img: "/assets/UserProfile.png",
    designation: "Finance",
    value: 3.8,
    bg: "before:bg-warning/30",
    barColor: "warning",
    number: 6,
  },
];

const CustomerCard = ({ item }: any) => {
  return (
    <div
      className={`relative z-[1] text-center p-4 rounded before:w-full before:h-[calc(100%-60px)] before:absolute before:left-0 before:top-[60px] before:rounded before:z-[-1] before:bg-opacity-[0.1] ${item.bg}`}
    >
      <div className={"h-[70px] w-[70px] rounded-full mx-auto mb-4 relative"}>
        <Image
          src={item.img}
          alt={item.title}
          width={100}
          height={100}
          className="w-full h-full rounded-full"
          priority
        />
      </div>
      <h4 className="text-sm text-default-600 font-semibold mb-4">
        {item.title}
      </h4>
      <h4 className="text-sm text-yellow-500 font-semibold mb-4">
        {item.designation}
      </h4>
      <div className="flex items-center gap-1 px-16 mb-4">
        <Icon icon="ph:star-fill" className="text-white" />
        <Icon icon="ph:star-fill" className="text-white" />
        <Icon icon="ph:star-fill" className="text-white" />
        <Icon icon="ph:star-fill" className="text-white" />
        <Icon icon="ph:star-fill" className="text-default-300/80" />
      </div>
      <div className="inline-block bg-default-900 text-default-100 px-2.5 py-1.5 text-xs font-medium rounded-full min-w-[60px]">
        <Badge className="bg-gradient-to-b text-sm from-[#B50D34] to-[#BAA716] whitespace-nowrap">
          {item.value}
        </Badge>
      </div>
    </div>
  );
};

const PerformanceReviews = () => {
  return (
    <Card className="w-full pb-2 ">
      <div className="relative w-full">
        <div className="flex space-x-5  pb-3 w-full">
          {customers.map((item, i) => (
            <CustomerCard item={item} key={`customer-${i}`} />
          ))}
        </div>
      </div>
    </Card>
  );
};

export default PerformanceReviews;
