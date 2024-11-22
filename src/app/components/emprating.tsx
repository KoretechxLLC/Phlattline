"use client";
import React from "react";

const EmpRating = ({ rating }: { rating: number }) => {
  const maxStars = 5; // Total number of stars

  return (
    <div className="border-[1px] border-gray-500 rounded-3xl bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] p-12 w-[80%] mx-auto">
      <div className="text-center text-white text-2xl font-bold mb-2">Rating</div>
      {/* Stars */}
      <div className="flex justify-center items-center space-x-1 mb-4">
        {/* Always Full Stars */}
        {[...Array(maxStars)].map((_, index) => (
          <span key={`full-${index}`} className="text-white text-3xl">
            ★
          </span>
        ))}
      </div>

      {/* Rating Score */}
      <div className="flex justify-center">
        <span className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-red-500 text-white font-bold text-lg rounded-full">
          {rating.toFixed(1)} / {maxStars}
        </span>
      </div>
    </div>
  );
};

export default EmpRating;
