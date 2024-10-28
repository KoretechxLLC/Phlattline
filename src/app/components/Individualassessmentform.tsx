"use client";
import { fetchAssessments, submitAssessmentResponses } from "@/redux/slices/individualassessment.slice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store"; // Import types
import StackedNotifications from "./Stackednotification";
import { useRouter } from "next/navigation";
import { setSuccess, setError, setAssessmentUpdate } from "@/redux/slices/auth.slice";
import Spinner from "./Spinner";

export type NotificationType = {
  id: number;
  text: string;
  type: "error" | "success";
};

const IndividualAssessmentForm = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const { assessments, loading, error, success } = useSelector(
    (state: RootState) => state.assessment
  );
  const [notification, setNotification] = useState<NotificationType | null>(null);
  const { userData } = useSelector((state: RootState) => state.auth);
  const [responses, setResponses] = useState<{ [key: string]: string }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({}); // State for validation errors
  const userId = userData?.id; // Replace with actual userId

  useEffect(() => {
    dispatch(fetchAssessments());
  }, [dispatch]);

  const handleOptionChange = (questionId: string, optionText: string) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: optionText,
    }));

    // Clear the error for the specific question when an option is selected
    setErrors((prevErrors) => ({
      ...prevErrors,
      [questionId]: "",
    }));
  };

  useEffect(() => {
    if (success !== null) {
      setNotification({
        id: Date.now(),
        text: success,
        type: "success",
      });
      dispatch(setSuccess());
      dispatch(setAssessmentUpdate());
    }
    if (error !== null) {
      setNotification({
        id: Date.now(),
        text: error,
        type: "error",
      });
      dispatch(setError());
    }
  }, [success, router, error,dispatch]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newErrors: { [key: string]: string } = {};

    // Validate that all questions are answered
    assessments.forEach((assessment:any) => {
      assessment.individual_assessment_questions.forEach((question:any) => {
        if (!responses[question.id]) {
          newErrors[question.id] = "This question is required.";
        }
      });
    });

    // Check if there are any errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Don't submit if there are errors
    }

    const assessmentId = assessments[0]?.id; // Replace with actual logic if needed

    // Dispatch the form submission with userId, assessmentId, and responses
    dispatch(
      submitAssessmentResponses({
        userId,
        assessmentId,
        responses: Object.entries(responses).map(([questionId, answer]) => ({
          questionId,
          answer,
        })),
      })
    );
  };

  if (loading) {
    return <div className="text-center text-gray-300"><Spinner/></div>;
  }



  return (
    <div className="text-white ml-[18em] mr-[2em] p-6 bg-black border-[2px] border-neutral-800 rounded-lg">
      <StackedNotifications
        notification={notification}
        setNotification={setNotification}
      />
      <form onSubmit={handleSubmit} className="space-y-8 overflow-x-auto h-[48em] pr-8">
        {assessments?.length > 0 && assessments?.map((assessment: any) => (
          <div key={assessment.id} className="mb-6 p-0 bg-black rounded-lg shadow-md">
            <div className="space-y-6">
              {assessment.individual_assessment_questions.map(
                (question: any, index: number) => (
                  <div
                    key={question.id}
                    className={`p-4 rounded-lg bg-gradient-to-b whitespace-nowrap from-[#6262624f] to-[#2D2C2C80] pt-8 pb-8 ${
                      errors[question.id] ? "border border-red-500" : ""
                    }`}
                  >
                    <label className="text-1xl text-gray-100 mb-2 block pt-0 pb-3 pl-3">
                      {`${index + 1}. ${question.question_text}`}
                    </label>
                    <div className="grid grid-cols-2 gap-0 md:grid-cols-3 lg:grid-cols-6 mt-4 pl-3">
                      {question.individual_assessment_options.map((option: any) => (
                        <label
                          key={option.id}
                          className="flex items-center space-x-3 text-gray-300 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name={question.id.toString()}
                            value={option.option_text}
                            checked={responses[question.id] === option.option_text}
                            onChange={() =>
                              handleOptionChange(question.id, option.option_text)
                            }
                            className="form-radio text-yellow-500 focus:ring-0"
                          />
                          <span className="text-sm">{option.option_text}</span>
                        </label>
                      ))}
                    </div>
                    {errors[question.id] && (
                      <p className="text-red-500 text-sm mt-2">{errors[question.id]}</p>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        ))}

        <div className="flex justify-end">
          <button
            type="submit"
            className="w-[16%] py-3 mt-4 bg-gradient-to-r from-red-500 to-yellow-500 text-white rounded-lg font-semibold shadow-lg hover:bg-gradient-to-r hover:from-red-600 hover:to-yellow-600 transition-all duration-300"
          >
            Submit Assessment
          </button>
        </div>
      </form>
    </div>
  );
};

export default IndividualAssessmentForm;
