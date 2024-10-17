"use client";
import React from "react";
import { Badge } from "@/app/components/badge";

interface BadgeProps {
  text: string;
}

const RedBadge: React.FC<BadgeProps> = ({ text }) => {
  return (
    <Badge className="font-bold rounded-2xl text-md bg-red-600 text-white ">
      <span className="px-6 py-1" style={{ fontFamily: "Sansation" }}>
        {text}
      </span>
    </Badge>
  );
};

export default RedBadge;
