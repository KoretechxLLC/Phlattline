"use client";
import React, { useEffect, useState } from "react";
import SideBar from "@/app/components/SideBar";
import Header from "@/app/components/Header";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter, useSearchParams } from "next/navigation";
import {
  coursesAssessmentResponses,
  fetchusercourses,
  resetError,
  resetSuccess,
} from "@/redux/slices/courses.slice";
import StackedNotifications from "../components/Stackednotification";

export type NotificationType = {
  id: number;
  text: string;
  type: "error" | "success";
};

const Courseassessment = () => {
  const dispatch: any = useDispatch();
  const router: any = useRouter();
  const searchParams = useSearchParams();
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );
  const courseId = searchParams.get("courseId");
  const {
    courses,
    loading,
    error,
    success,
    usercourses,
    courseAssessmentSuccess,
  } = useSelector((state: RootState) => state.courses);
  const { userData } = useSelector((state: RootState) => state.auth);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [responses, setResponses] = useState<{ [key: string]: string }>({});
  const currentCourse = usercourses.find(
    (course: any) => course.course_id === Number(courseId)
  );

  const assessments = currentCourse?.courses?.assessments || [];
  const userId = userData?.id;

  useEffect(() => {
    if (!usercourses || usercourses.length == 0) {
      dispatch(fetchusercourses({ userId }));
    }
  }, [usercourses, dispatch]);

  const handleOptionChange = (questionId: string, selectedOption: string) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: selectedOption,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [questionId]: "",
    }));
  };

  const handlesubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let validationErrors: { [key: string]: string } = {};
    assessments.forEach((assessment: any) => {
      assessment.questions.forEach((question: any) => {
        if (!responses[question.id]) {
          validationErrors[question.id] = "This question is required.";
        }
      });
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      if (courseId) {
        await dispatch(
          coursesAssessmentResponses({
            userId,
            courseId: courseId,
            responses: Object.entries(responses).map(
              ([questionId, answer]) => ({
                questionId,
                answer,
              })
            ),
          })
        );
      } else {
        console.error("courseId is null or undefined");
      }
    }
  };

  useEffect(() => {
    if (courseAssessmentSuccess) {
      setNotification({
        id: Date.now(),
        text: courseAssessmentSuccess,
        type: "success",
      });
      router.push(`/Portal/Courses/CourseModule?courseId=${courseId}`);
      dispatch(resetSuccess());
    }
    if (error) {
      setNotification({
        id: Date.now(),
        text: error,
        type: "error",
      });
      dispatch(resetError());
    }
  }, [courseAssessmentSuccess, error, dispatch, router]);

  return (
    <div>
      <div className="flex flex-row">
        <div className="flex-grow">
          <Header
            HeadingText="Hey Jack"
            HeadingDesc="What will you Learn today?"
          />
        </div>
        <div className="flex-shrink-0">
          <SideBar />
        </div>
      </div>
      <StackedNotifications
        notification={notification}
        setNotification={setNotification}
      />
      <form
        className="space-y-8 overflow-x-auto h-[48em] pr-8 ml-[18em] mr-[1em] mt-[2em]"
        onSubmit={handlesubmit}
      >
        {assessments?.length > 0 &&
          assessments.map((assessment: any) => (
            <div
              key={assessment.id}
              className="mb-6 p-0 bg-black rounded-lg shadow-md"
            >
              <div className="space-y-6">
                {assessment.questions?.map((question: any, index: number) => (
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
                      {question.answer_options.map(
                        (option: string, idx: number) => (
                          <label
                            key={idx}
                            className="flex items-center space-x-3 text-gray-300 cursor-pointer"
                          >
                            <input
                              type="radio"
                              name={question.id.toString()}
                              value={option}
                              checked={responses[question.id] === option}
                              onChange={() =>
                                handleOptionChange(question.id, option)
                              }
                              className="form-radio text-yellow-500 focus:ring-0"
                            />
                            <span className="text-sm">{option}</span>
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
                ))}
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

export default Courseassessment;
