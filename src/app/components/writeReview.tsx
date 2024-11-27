"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/app/components/utility-icon";
import { Button } from "./button-sidebar";

const WriteReviewModal = ({
  open,
  onClose,
  employeeName,
}: {
  open: boolean;
  onClose: () => void;
  employeeName?: string;
}) => {
  const router = useRouter();
  const [rating, setRating] = useState<number>(0); // State to handle star rating
  const [review, setReview] = useState<string>(""); // State to handle review text

  if (!open) return null; // Conditional rendering for modal visibility

  const handleStarClick = (index: number) => {
    setRating(index + 1); // Set the rating based on star clicked
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log("Rating:", rating);
    console.log("Review:", review);
    onClose(); // Close the modal
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="relative p-5 bg-white rounded-3xl w-3/4 md:w-1/3 flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-3 text-gray-700 hover:text-red-500"
        >
          <Icon icon="ic:outline-close" className="text-3xl" />
        </button>
        {/* Title Section */}
        <div className="px-5 py-4 text-center">
          <h1 className="text-3xl font-bold text-black">
            Write a Review for {employeeName}
          </h1>
        </div>
        {/* Rating Section */}
        <div className="flex justify-center space-x-2 py-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleStarClick(index)}
              className={`text-4xl ${
                index < rating ? "text-yellow-500" : "text-gray-300"
              }`}
            >
              ★
            </button>
          ))}
        </div>
        {/* Review Textbox */}
        <div className="px-5">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400"
            rows={4}
            placeholder="Write your review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
        </div>
        {/* Submit Button */}
        <div className="flex justify-center py-4">
          <Button
            onClick={handleSubmit}
            color="primary"
            className="rounded-3xl px-5 py-2"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WriteReviewModal;
