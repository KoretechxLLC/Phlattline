"use client";
import { Avatar, AvatarImage } from "@/app/components/avatar";
import { AnimatedTooltip } from "@/app/components/AnimatedTooltip";
import { useEffect, useState } from "react";
import { Button } from "@/app/components/button-sidebar";

import Spinner from "@/app/components/Spinner";
import { SlCalender } from "react-icons/sl";

import EmployeeModal from "@/app/components/employeeModal";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface AssessmentTaskTrackerProps {
  showPurchased?: boolean;
  showCompleted?: boolean;
  showTooltip?: boolean;
  label: string;
  isClickable?: boolean;
  completedAssessments?: any;
  purchasedAssessments?: any;
}

const AssessmentTaskTracker = ({
  showPurchased = true,
  showCompleted = true,
  showTooltip = true,
  label,
  isClickable = true,
  completedAssessments,
  purchasedAssessments,
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Purchased");
  const { userData } = useSelector((state: RootState) => state.auth);
  const userId = userData?.user_type_id;

  useEffect(() => {
    if (showPurchased) setActiveTab("pending");
    else if (showCompleted) setActiveTab("completed");
  }, [showPurchased, showCompleted]);

  const handlePurchasedTasksClick = () => setActiveTab("purchased");
  const handleCompletedTasksClick = () => setActiveTab("completed");
  const handleViewAllClick = () => {
    setIsModalOpen(true);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleButtonClick = (id: any) => {
    if (id) {
      router.push(`/paidAssessment?assessmentId=${id}`);
    }
  };

  return (
    <div>
      <div className="flex gap-4 md:gap-4 justify-start md:justify-start w-full">
        {showPurchased && (
          <button
            className={`text-xs sm:text-xs h-12 w-full rounded-tl-3xl rounded-tr-3xl ${
              activeTab === "pending"
                ? "bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] text-white"
                : "text-default-600"
            } ${isClickable ? "cursor-pointer" : "cursor-default"}`}
            onClick={handlePurchasedTasksClick}
          >
            Purchased {label}
          </button>
        )}
        {showCompleted && (
          <button
            className={`text-xs sm:text-xs w-full h-12 rounded-tl-3xl rounded-tr-3xl ${
              activeTab === "completed"
                ? "bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] text-white"
                : "text-default-600"
            } ${isClickable ? "cursor-pointer" : "cursor-default"}`}
            onClick={handleCompletedTasksClick}
          >
            Completed {label}
          </button>
        )}
      </div>

      <ul
        className={`overflow-y-auto 4xl:h-48 h-64 justify-center items-center md:justify-start w-full border border-[#62626280] rounded-b-lg relative`}
      >
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <Spinner height="30px" width="30px" />
          </div>
        ) : activeTab === "pending" ? (
          purchasedAssessments && purchasedAssessments.length > 0 ? (
            purchasedAssessments.map((item: any) => {
              return (
                <li
                  className="flex flex-col sm:flex-row justify-center md:justify-start items-center sm:items-center w-full 4xl:h-16 h-20 gap-2 border-b border-gray-500 pb-2 last:pb-0 last:border-b-0"
                  key={item.id}
                >
                  <div className="flex items-center md:mx-5 justify-between w-full">
                    <div className="flex items-center">
                      <span className="text-xs sm:text-sm px-2">
                        {item?.title}
                      </span>
                    </div>

                    <div className="flex justify-center md:items-center ml-3 sm:ml-5 gap-2">
                      <button
                        className={`inline-block w-[70px] items-center gap-1.5 whitespace-nowrap rounded px-1.5 py-1 text-xs font-bold text-start cursor-auto ${
                          new Date(item?.purchasedAt).toDateString() ===
                          new Date().toDateString()
                            ? "bg-green-800 text-green-400" // Green for today's completion date
                            : "bg-zinc-800 text-zinc-400" // Default for future dates
                        }`}
                        title="Completion Date"
                      >
                        <div className="flex justify-center items-center px-1">
                          <div className="w-5">
                            <SlCalender />
                          </div>
                          <span>
                            {new Date(item?.purchasedAt)
                              .toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                              })
                              .replace(" ", "-")
                              .toUpperCase()}
                          </span>
                        </div>
                      </button>
                      <Button
                        className="text-md md:text-2 w-full sm:w-auto rounded-2xl px-3 py-2 sm:px-6 cursor-pointer"
                        color="primary"
                        onClick={() => {
                          handleButtonClick(item?.individual_assessments_id);
                        }}
                      >
                        Take Assessment
                      </Button>
                      {userId === 2 && (
                        <Button
                          className="text-md md:text-2 w-full sm:w-auto rounded-2xl px-3 py-2 sm:px-6 cursor-pointer"
                          color="primary"
                          onClick={handleViewAllClick} // Open modal on button click
                        >
                          Assign
                        </Button>
                      )}
                    </div>
                  </div>
                  <EmployeeModal
                    open={isModalOpen}
                    onClose={handleCloseModal}
                  />
                </li>
              );
            })
          ) : (
            <li className="text-center text-gray-500 h-full w-full flex justify-center items-center">
              No pending assessmnets found
            </li>
          )
        ) : activeTab === "completed" ? (
          completedAssessments && completedAssessments.length > 0 ? (
            completedAssessments.map((item: any) => (
              <li
                className="flex flex-row justify-between items-center w-full 4xl:h-16 h-20 gap-4 border-b border-gray-500 py-4 last:pb-0 last:border-b-0"
                key={item.id}
              >
                {/* Avatar and Title Section */}
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage
                      src="/assets/greentick.png"
                      alt="completed-avatar"
                      className="w-5 h-5"
                    />
                  </Avatar>
                  <span className="text-xs sm:text-sm">{item?.title}</span>
                  {showTooltip && <AnimatedTooltip items={tooltipItems} />}
                </div>

                {/* Date Section */}
                <div className="flex items-center">
                  <span>
                    {new Date(item?.updatedAt)
                      .toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                      })
                      .replace(" ", "-")
                      .toUpperCase()}
                  </span>
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

export default AssessmentTaskTracker;
