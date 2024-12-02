"use client";
import React, { useState, useEffect } from "react";
import { Badge } from "./badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";
import Spinner from "@/app/components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { fetchEmployeeReviewById } from "@/redux/slices/employeee.slice";

const EmpRating = () => {
  const dispatch: any = useDispatch();
  const [loading, setLoading] = useState(true);
  const [Rate, setRate] = useState<any>(null); // Update type to handle mapped data
  const { review } = useSelector((state: RootState) => state.employee);
  const { userData } = useSelector((state: RootState) => state.auth);
  const employeeId = userData.employee_id;
  const organizationId = userData.organization_id;

  useEffect(() => {
    if (employeeId && organizationId) {
      dispatch(fetchEmployeeReviewById({ employee_id: employeeId, organization_id: organizationId }));
    }
  }, [dispatch, employeeId, organizationId]);

  useEffect(() => {
    if (review) {
      setRate(review); // Update state when review changes
    }
  }, [review]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Simulate loading
    }, 1500);
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader className="bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] rounded-t-3xl py-2 border border-gray-900">
          <CardTitle className="text-center text-white text-xs sm:text-md mb-0">
            Rating
          </CardTitle>
        </CardHeader>
        <CardContent className="bg-black flex justify-center items-center p-16">
          <Spinner height="30px" width="30px" />
        </CardContent>
      </Card>
    );
  }

  if (!Rate) {
    return (
      <Card>
        <CardHeader className="bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] rounded-t-3xl py-2 border border-gray-900">
          <CardTitle className="text-center text-white text-xs sm:text-md mb-0">
            Rating
          </CardTitle>
        </CardHeader>
        <CardContent className="bg-black flex justify-center items-center p-16">
          <div className="text-center text-gray-500">No Rating Available</div>
        </CardContent>
      </Card>
    );
  }

  const { no_of_stars, review: reviewText, employees } = Rate;

  return (
    <Card>
      <CardHeader className="bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] rounded-t-3xl py-2 border border-gray-900">
        <CardTitle className="text-center text-white text-xs sm:text-md mb-0 capitalize">
          {employees.first_name}&apos;s Rating
        </CardTitle>
      </CardHeader>

      <CardContent className="bg-black border border-[#62626280] flex flex-col items-center justify-center rounded-b-lg p-16">
        {/* Map Stars */}
        <div className="flex justify-center mb-4">
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className={`text-3xl ${index < no_of_stars ? "text-yellow-400" : "text-gray-600"}`}
            >
              ★
            </span>
          ))}
        </div>

        {/* Display Review Text */}
        <div className="text-white text-center mb-4">{reviewText}</div>

        {/* Employee Details */}


        {/* Rating Badge */}
        <div className="inline-block bg-default-900 text-default-100 px-2.5 py-1 text-xl font-medium rounded-full min-w-[60px]">
          <Badge className="bg-gradient-to-b text-xl from-[#B50D34] to-[#BAA716] whitespace-nowrap">
            {no_of_stars.toFixed(1)} / 5
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmpRating;
