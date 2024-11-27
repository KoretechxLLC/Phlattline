"use client";
import React from "react";
import { Badge } from "./badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";

const EmpRating = ({ rating }: { rating: number }) => {
  const maxStars = 5; // Total number of stars

  return (
    <Card>
      <CardHeader className="bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] rounded-t-3xl py-2 border border-gray-900">
        <CardTitle className="text-center text-white text-xs sm:text-md mb-0">
          Rating
        </CardTitle>
      </CardHeader>

      {/* Stars */}
      <CardContent className="bg-black border border-[#62626280] flex flex-col items-center justify-center rounded-b-lg p-16">
        {/* Full Stars */}
        <div className="flex justify-center mb-4">
          {[...Array(maxStars)].map((_, index) => (
            <span key={`full-${index}`} className="text-white text-3xl">
              ★
            </span>
          ))}
        </div>

        {/* Rating Badge */}
        <div className="inline-block bg-default-900 text-default-100 px-2.5 py-1 text-xl font-medium rounded-full min-w-[60px]">
          <Badge className="bg-gradient-to-b text-xl from-[#B50D34] to-[#BAA716] whitespace-nowrap">
            {rating.toFixed(1)}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmpRating;
