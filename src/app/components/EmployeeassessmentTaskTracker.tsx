"use client";
import { Avatar, AvatarImage } from "@/app/components/avatar";
import { AnimatedTooltip } from "@/app/components/AnimatedTooltip";
import { useEffect, useState } from "react";
import { Button } from "@/app/components/button-sidebar";

import Spinner from "@/app/components/Spinner";
import { SlCalender } from "react-icons/sl";
import { useRouter } from "next/navigation";

interface AssessmentTaskTrackerProps {
  showPending?: boolean;
  showCompleted?: boolean;
  showSaved?: boolean;
  showTooltip?: boolean;
  label: string;
  isClickable?: boolean;
  completedAssessments?: any;
  pendingAssessments?: any;
}

const EmployeeassessmentTaskTracker = ({
  showPending = true,
  showCompleted = true,
  showSaved = true,
  showTooltip = true,
  label,
  isClickable = true,
  completedAssessments,
  pendingAssessments,
}: AssessmentTaskTrackerProps) => {
  const tooltipItems = [
    {
      id: 1,
      name: "John Doe",
      designation: "Software Engineer",
      image: "/assets/User2.png",
    },
    {
      id: 2,
      name: "Jane Smith",
      designation: "Product Manager",
      image: "/assets/User1.png",
    },
    {
      id: 3,
      name: "Bob Johnson",
      designation: "UX Designer",
      image: "/assets/User3.png",
    },
  ];

  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const [activeTab, setActiveTab] = useState("pending");

  useEffect(() => {
    if (showPending) setActiveTab("pending");
    else if (showCompleted) setActiveTab("completed");
    else if (showSaved) setActiveTab("saved");
  }, [showPending, showCompleted, showSaved]);

  const handlePendingTasksClick = () => setActiveTab("pending");
  const handleCompletedTasksClick = () => setActiveTab("completed");
  const handleSavedTasksClick = () => setActiveTab("saved");

  const handleButtonClick = (id: any) => {
    if (id) {
      router.push(`/paidAssessment?assessmentId=${id}`);
    }
  };

  return (
    <div className="">
      <div className="flex gap-4 md:gap-4 justify-start md:justify-start w-full">
        {showPending && (
          <button
            className={`text-xs sm:text-[16px] h-12 w-full rounded-tl-3xl rounded-tr-3xl ${
              activeTab === "pending"
                ? "bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] text-white"
                : "text-default-600"
            } ${isClickable ? "cursor-pointer" : "cursor-default"}`}
            onClick={handlePendingTasksClick}
          >
            Assigned {label}
          </button>
        )}
        {showCompleted && (
          <button
            className={`text-xs sm:text-[16px] w-full h-12 rounded-tl-3xl rounded-tr-3xl ${
              activeTab === "completed"
                ? "bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] text-white"
                : "text-default-600"
            } ${isClickable ? "cursor-pointer" : "cursor-default"}`}
            onClick={handleCompletedTasksClick}
          >
            Completed {label}
          </button>
        )}
        {showSaved && (
          <button
            className={`text-xs sm:text-xs w-full h-12 rounded-tl-3xl rounded-tr-3xl ${
              activeTab === "saved"
                ? "bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] text-white"
                : "text-default-600"
            } ${isClickable ? "cursor-pointer" : "cursor-default"}`}
            onClick={handleSavedTasksClick}
          >
            Saved {label}
          </button>
        )}
      </div>

      <ul
        className={`overflow-y-auto 4xl:h-48 h-64 justify-center items-center md:justify-start w-full border border-[#62626280] rounded-b-lg relative`}
      >
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <Spinner height="20vh" />
          </div>
        ) : activeTab === "pending" ? (
          pendingAssessments && pendingAssessments.length > 0 ? (
            pendingAssessments.map((individual_assessments: any) => {
              return (
                <li
                  className="flex flex-col sm:flex-row justify-center md:justify-start items-center sm:items-center w-full 4xl:h-16 h-20 gap-2 border-b border-gray-500 pb-2 last:pb-0 last:border-b-0"
                  key={individual_assessments.id}
                >
                  <div className="flex items-center md:mx-5 justify-between w-full">
                    <div className="flex items-center">
                      <Avatar className="w-6 h-6">
                        <AvatarImage
                          src="/assets/ongoing.png"
                          alt="pending-avatar"
                          className="w-5 h-5"
                        />
                      </Avatar>
                      <span className="text-xs sm:text-sm px-2">
                        {individual_assessments?.individual_assessments?.title}
                      </span>
                    </div>

                    <div className="flex justify-center md:items-center ml-3 sm:ml-5 gap-2">
                      {showTooltip && <AnimatedTooltip items={tooltipItems} />}

                      <Button
                        className="text-md md:text-2 w-full sm:w-auto rounded-2xl px-3 py-2 sm:px-6 cursor-pointer"
                        color="primary"
                        onClick={() => {
                          handleButtonClick(
                            individual_assessments?.individual_assessment_id
                          );
                        }}
                      >
                        Take Assessment
                      </Button>
                    </div>
                  </div>
                </li>
              );
            })
          ) : (
            <li className="text-center text-gray-500 h-full w-full flex justify-center items-center">
              No Assigned assessmnets found
            </li>
          )
        ) : activeTab === "completed" ? (
          completedAssessments && completedAssessments.length > 0 ? (
            completedAssessments.map((individual_assessments: any) => (
              <li
                className="flex flex-col sm:flex-row justify-center md:justify-start items-center sm:items-center w-full 4xl:h-16 h-20 gap-2 border-b border-gray-500 pb-2 last:pb-0 last:border-b-0"
                key={individual_assessments.id}
              >
                <div className="flex items-center md:mx-5 justify-between w-full">
                  <div className="flex items-center">
                    <Avatar className="w-6 h-6">
                      <AvatarImage
                        src="/assets/greentick.png"
                        alt="completed-avatar"
                        className="w-5 h-5"
                      />
                    </Avatar>
                    <span className="text-xs px-2 sm:text-sm">
                      {individual_assessments?.individual_assessments?.title}
                    </span>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="text-center text-gray-500 h-full w-full flex justify-center items-center">
              No completed Assessments are Found
            </li>
          )
        ) : (
          ""
        )}
      </ul>
    </div>
  );
};

export default EmployeeassessmentTaskTracker;