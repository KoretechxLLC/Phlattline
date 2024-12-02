"use client";

import SideBar from "@/app/components/SideBar";
import Header from "@/app/components/Header";

import {
  fetchAssessments,
  fetchSingleAssessments,
  resetSuccess,
  submitAssessmentResponses,
} from "@/redux/slices/individualassessment.slice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store"; // Import types
import StackedNotifications from "../components/Stackednotification";
import { useRouter, useSearchParams } from "next/navigation";
import {
  setSuccess,
  setError,
  setAssessmentUpdate,
  setUpdateUserData,
} from "@/redux/slices/auth.slice";
import Spinner from "../components/Spinner";

export type NotificationType = {
  id: number;
  text: string;
  type: "error" | "success";
};

const PaidAssessment = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const {
    singleAssessment,
    singleAssessmentLoading,
    singleAssessmentSuccess,
    singleAssessmentError,
    success,
    error,
    loading,
    submitAssessment,
  } = useSelector((state: RootState) => state.assessment);
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );
  const { userData } = useSelector((state: RootState) => state.auth);
  const [responses, setResponses] = useState<any>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({}); // State for validation errors
  const userId = userData?.id; // Replace with actual userId
  const usertype =userData?.user_type_id;
  const searchParams = useSearchParams();
  const assessmentId: any = searchParams.get("assessmentId");

  useEffect(() => {
    if(usertype==3){
    dispatch(
      fetchSingleAssessments({
        filter: {
          userId: userId,
          assessmentId: assessmentId,
          user_type_id: usertype,
        },
      })
    );

  }else{
    dispatch(
      fetchSingleAssessments({
        filter: {
          userId: userId,
          assessmentId: assessmentId,
         
        },
      })
    );
  }
  }, [dispatch]);

  const handleOptionChange = (individual_assessment_id: any, questionId: string, optionText: string) => {

    let resp = {
      assessmentsid: individual_assessment_id,
      selectedOption: optionText,
      questionId: questionId
    };

    if (responses && responses?.length > 0) {

      if (responses.some((resp: any) => resp.questionId == questionId)) {
        let response = responses.map((res: any) => {

          if (res.questionId == resp.questionId) {
            return resp
          } else {
            return res
          }
        })
        setResponses(response)
      } else {
        setResponses([...responses, resp])
      }
    } else {
      setResponses([...responses, resp])
    }


    setErrors((prevErrors) => ({
      ...prevErrors,
      [questionId]: "",
    }));
  };

  useEffect(() => {
    if (assessmentId) {
      userData?.purchased_assessments?.find((item: any) => {
        if (item.individual_assessments_id == assessmentId && item?.completed) {
          router.push("/Portal/Assessments");
        }
      });
    }
  }, [dispatch, assessmentId]);
  useEffect(() => {
    if (success) {
      setNotification({
        id: Date.now(),
        text: success,
        type: "success",
      });
      dispatch(setSuccess());
      dispatch(resetSuccess());

      const updatedUserAssessment = [...userData?.purchased_assessments];
      const assessmentSuccessResponse = updatedUserAssessment.map(
        (item: any) => {
          if (item.individual_assessments_id == assessmentId) {
            return { ...item, completed: true };
          } else {
            return item;
          }
        }
      );

      dispatch(
        setUpdateUserData({
          ...userData,
          purchased_assessments: assessmentSuccessResponse,
        })
      );
    }
    if (error !== null) {
      setNotification({
        id: Date.now(),
        text: error,
        type: "error",
      });
      dispatch(setError());
    }
  }, [error, success, dispatch]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newErrors: { [key: string]: string } = {};

    singleAssessment.individual_assessment_questions.forEach(
      (question: any) => {
        if (responses?.every((resp: any) => resp.questionId != question.id)) {
          newErrors[question.id] = "This question is required.";
        }
      }
    );

    // Check if there are any errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Don't submit if there are errors
    }


    let assessmentId = singleAssessment?.id


    if(usertype==3){
      dispatch(
        submitAssessmentResponses({
          userId,
          assessmentId:
          [assessmentId],
          responses: responses,
          user_type_id:usertype,
        })
      );

    }
    else{
    dispatch(
      submitAssessmentResponses({
        userId,
        assessmentId:
        [assessmentId],
        responses: responses,
        user_type_id:usertype,
      })
    )
  }
  };

  return (
    <>
      {loading || singleAssessmentLoading ? (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spinner height="30px" width="30px" />
        </div>
      ) : (
        <>
          <div className="flex flex-row">
            <div className="flex-grow">
              {" "}
              <Header
                HeadingText="Hey Jack"
                HeadingDesc="What will you Learn today?"
              />
            </div>
            <div className="flex-shrink-0">
              {" "}
              <SideBar />
            </div>
          </div>
          <div className="text-white ml-[18em] mr-[2em] p-6 bg-black border-[2px] border-neutral-800 rounded-lg">
            <StackedNotifications
              notification={notification}
              setNotification={setNotification}
            />
            <form
              onSubmit={handleSubmit}
              className="space-y-8 overflow-x-auto h-[48em] pr-8"
            >
              {singleAssessment?.individual_assessment_questions &&
                singleAssessment?.individual_assessment_questions.length > 0 &&
                singleAssessment?.individual_assessment_questions.map(
                  (question: any, index: number) => {
                    return (
                      <div key={question.id} className="space-y-6">
                        <div
                          className={`p-4 rounded-lg bg-gradient-to-b whitespace-nowrap from-[#6262624f] to-[#2D2C2C80] pt-8 pb-8 ${
                            errors[question.id] ? "border border-red-500" : ""
                          }`}
                        >
                          <label className="text-1xl text-gray-100 mb-2 block pt-0 pb-3 pl-3">
                            {`${index + 1}. ${question.question_text}`}
                          </label>
                          <div className="grid grid-cols-2 gap-0 md:grid-cols-3 lg:grid-cols-6 mt-4 pl-3">
                            {question.individual_assessment_options.map(
                              (option: any) => (
                                <label
                                  key={option.id}
                                  className="flex items-center space-x-3 text-gray-300 cursor-pointer"
                                >
                                  <input
                                    type="radio"
                                    name={question.id.toString()}
                                    value={option.option_text}
                                    checked={
                                      responses && responses?.length > 0 && responses?.find((res: any) => res.questionId == question?.id)?.selectedOption === option.option_text
                                    }
                                    onChange={() =>
                                      handleOptionChange(
                                        question.individual_assessment_id,
                                        question.id,
                                        option.option_text,
    
                                      )
                                    }
                                    className="form-radio text-yellow-500 focus:ring-0"
                                  />
                                  <span className="text-sm">
                                    {option.option_text}
                                  </span>
                                </label>
                              )
                            )}
                          </div>
                          {errors[question.id] && (
                            <p className="text-red-500 text-sm mt-2">
                              {errors[question.id]}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  }
                )}

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
        </>
      )}
    </>
  );
};

export default PaidAssessment;
