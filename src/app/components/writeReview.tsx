"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/app/components/utility-icon";
import { Button } from "./button-sidebar";
import Spinner from "@/app/components/Spinner"; // Assuming you have a Spinner component
import { useDispatch, useSelector } from "react-redux";
import {
  addReview,
  resetError,
  resetSuccess,
} from "@/redux/slices/organization.slice";
import StackedNotifications from "./Stackednotification";
import { RootState } from "@/redux/store";

export type NotificationType = {
  id: number;
  text: string;
  type: "error" | "success";
};

const WriteReviewModal = ({
  open,
  onClose,
  employeeName,
  employeeID,
  organizationID,
  data,
}: {
  open: boolean;
  onClose: () => void;
  employeeName?: string;
  employeeID?: number;
  organizationID?: string;
  data?: any;
}) => {
  const router = useRouter();
  const [rating, setRating] = useState<number>(
    data?.no_of_stars ? data?.no_of_stars : 0
  ); // State to handle star rating
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );
  const { responseSuccess, responseError } = useSelector(
    (state: RootState) => state.organization
  );
  const [review, setReview] = useState<string>(
    data?.review ? data?.review : ""
  ); // State to handle review text
  const [loading, setLoading] = useState<boolean>(false); // State to handle loading during submission
  const dispatch: any = useDispatch();
  if (!open) return null; // Conditional rendering for modal visibility

  const handleStarClick = (index: number) => {
    setRating(index + 1); // Set the rating based on star clicked
  };

  const handleSubmit = () => {
    // Perform validation
    if (!organizationID || !employeeID || !review || !rating) {
      setNotification({
        id: Date.now(),
        text: "Please fill in all fields.",
        type: "error",
      });
      return;
    }

    if (typeof rating !== "number" || rating < 1 || rating > 5) {
      setNotification({
        id: Date.now(),
        text: "Rating should be a number between 1 and 5.",
        type: "error",
      });
      return;
    }

    // All validations passed, prepare data
    let data = {
      organization_id: organizationID,
      employee_id: employeeID,
      review: review,
      no_of_stars: rating,
    };

    dispatch(addReview({ data }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <StackedNotifications
        notification={notification}
        setNotification={setNotification}
      />
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
          {rating
            ? Array.from({ length: 5 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleStarClick(index)}
                  className={`text-4xl ${
                    index < rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))
            : Array.from({ length: 5 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleStarClick(index)}
                  className={`text-4xl ${
                    index < (data?.no_of_stars || rating)
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
        </div>
        {/* Review Textbox */}
        <div className="px-5">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 text-black"
            rows={4}
            placeholder="Write your review here..."
            value={data?.review ? data?.review : review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
        </div>
        {/* Submit Button */}
        <div className="flex justify-center py-4">
          {loading ? (
            <Spinner height="30px" width="30px" /> // Display loader while submitting
          ) : (
            <Button
              onClick={handleSubmit}
              color="primary"
              className="rounded-3xl px-5 py-2"
            >
              Submit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WriteReviewModal;
