"use client";
import React, { useState, useEffect } from "react";
import { Badge } from "./badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";
import Spinner from "@/app/components/Spinner"; // Assuming you have a Spinner component

const EmpRating = ({ rating }: { rating: number | null }) => {
  const [loading, setLoading] = useState(true); // State to handle loading

  const maxStars = 5; // Total number of stars

  // Simulate loading for a few seconds (e.g., fetching rating data)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Stop loading after 1.5 seconds
    }, 1500);
  }, []);

  return (
    <Card>
      <CardHeader className="bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] rounded-t-3xl py-2 border border-gray-900">
        <CardTitle className="text-center text-white text-xs sm:text-md mb-0">
          Rating
        </CardTitle>
      </CardHeader>

      {/* Stars */}
      <CardContent className="bg-black border border-[#62626280] flex flex-col items-center justify-center rounded-b-lg p-16">
        {loading ? (
          // Show loader while loading
          <div className="flex justify-center items-center">
            <Spinner height="30px" width="30px" />
          </div>
        ) : rating === null ? (
          // Show "Not Rated Yet" when no rating is available
          <div className="text-center text-gray-500">Not Rated Yet</div>
        ) : (
          <>
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
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default EmpRating;
