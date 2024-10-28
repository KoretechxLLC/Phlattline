"use client";
import React from "react";
import { Badge } from "@/app/components/badge";

interface BadgeProps {
  text: string;
}

const RedBadge: React.FC<BadgeProps> = ({ text }) => {
  return (
    <Badge className="font-bold rounded-2xl text-md bg-red-600 text-white p-0">
      <span className="pt-0 pl-3 pb-0 pr-3" style={{ fontFamily: "Sansation" }}>
        {text}
      </span>
    </Badge>
  );
};

export default RedBadge;
