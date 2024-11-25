"use client";
import React from "react";

const EmpRating = () => {
  const maxStars = 5; // Total number of stars

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
          {/* Display all 5 fully white stars */}
          {[...Array(maxStars)].map((_, index) => (
            <span key={`filled-${index}`} className="text-white text-3xl">
              ★
            </span>
          ))}
        </div>

        {/* Rating Score */}
        <div className="flex justify-center">
          <span className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-red-500 text-white font-bold text-lg rounded-full">
            5.0 / {maxStars}
          </span>
        </div>
      </div> 
    </div>
  );
};

export default EmpRating;
