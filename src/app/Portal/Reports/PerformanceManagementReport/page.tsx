"use client";
import React from "react";

// Accept `rating` prop
const EmpRating = ({ rating }: { rating: number }) => {
  const maxStars = 5; // Total number of stars
  const fullStars = Math.floor(rating); // Full stars based on rating
  const hasHalfStar = rating % 1 !== 0; // Check if there's a half star

  return (
    <div className="border-[1px] border-[#62626280] rounded-3xl bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] w-[100%] mx-auto">
      {/* Title Section */}
      <div className="bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] rounded-t-3xl py-2">
        <h2 className="text-center text-white text-lg font-bold mb-0">Rating</h2>
      </div>

      {/* Stars and Button Section */}
      <div className="bg-black p-4 rounded-b-3xl">
        {/* Stars */}
        <div className="flex justify-center items-center space-x-1 mb-4">
          {/* Render Full Stars */}
          {[...Array(fullStars)].map((_, index) => (
            <span key={`full-${index}`} className="text-white text-3xl">
              ★
            </span>
          ))}
          {/* Render Half Star */}
          {hasHalfStar && (
            <span
              className="text-white text-3xl relative"
              style={{
                display: "inline-block",
                width: "1em",
                position: "relative",
              }}
            >
              <span
                className="absolute inset-0 text-white"
                style={{
                  clipPath: "polygon(0 0, 50% 0, 50% 100%, 0% 100%)",
                }}
              >
                ★
              </span>
              <span
                className="absolute inset-0 text-black"
                style={{
                  clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)",
                }}
              >
                ★
              </span>
            </span>
          )}
          {/* Render Empty Stars */}
          {[...Array(maxStars - fullStars - (hasHalfStar ? 1 : 0))].map(
            (_, index) => (
              <span key={`empty-${index}`} className="text-gray-500 text-3xl">
                ★
              </span>
            )
          )}
        </div>

        {/* Rating Score */}
        <div className="flex justify-center">
          <span className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-red-500 text-white font-bold text-lg rounded-full">
            {rating.toFixed(1)} / {maxStars}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EmpRating;
