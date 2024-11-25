"use client";
import { Avatar, AvatarImage } from "@/app/components/avatar";
import { AnimatedTooltip } from "@/app/components/AnimatedTooltip";
import { useEffect, useState } from "react";
import { Button } from "@/app/components/button-sidebar";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import Spinner from "@/app/components/Spinner";
import { SlCalender } from "react-icons/sl";
import Deletemodel from "./DeleteModal";
import { AiOutlineCheckCircle } from "react-icons/ai";
import SaveModal from "./SaveModal";
import { useDispatch, useSelector } from "react-redux";
import {
  completeGoal,
  deleteGoal,
  EmployeefetchGoals,
  fetchGoals,
} from "@/redux/slices/performanceManagement.slice";
import { RootState } from "@/redux/store";

interface TasksTrackerProps {
  showPending?: boolean;
  showCompleted?: boolean;
  showSaved?: boolean;
  showTooltip?: boolean;
  label: string;
  isClickable?: boolean;
}

const TasksTracker = ({
  showPending = true,
  showCompleted = true,
  showSaved = true,
  showTooltip = true,
  label,
  isClickable = true,
}: TasksTrackerProps) => {
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
  const { goals,EmployeeGoals } = useSelector((state: RootState) => state.performance);
  const { userData } = useSelector((state: RootState) => state.auth);
  const dispatch: any = useDispatch();




  const pendingTasks = [
    { id: 1, goal: "Goal 1", percentage: 30, userId: 1 },
    { id: 2, goal: "Goal 2", percentage: 60, userId: 2 },
    { id: 3, goal: "Goal 3", percentage: 90, userId: 3 },
  ];

  const completedTasks = [
    { id: 4, goal: "Goal 4", userId: 1 },
    { id: 5, goal: "Goal 5", userId: 2 },
    { id: 6, goal: "Goal 6", userId: 3 },
  ];

  const savedTasks = [
    { id: 7, goal: "Goal 7", userId: 1 },
    { id: 8, goal: "Goal 8", userId: 2 },
    { id: 9, goal: "Goal 9", userId: 3 },
  ];

  const [activeTab, setActiveTab] = useState("pending");

  useEffect(() => {
    const fetchGoalsData = async () => {
      if (userData?.id && userData.user_type_id == 1 ) {
        setLoading(true); // Start loading
        const id = userData?.id;
        await dispatch(fetchGoals(id)); // Dispatch fetch goals action
        setLoading(false); // Stop loading
      }
    };
    fetchGoalsData();
  }, [dispatch, userData]);



  useEffect(() => {
    const fetchGoalsData = async () => {
      if (userData?.id && userData.user_type_id == 3 ) {
        setLoading(true); // Start loading
        const employee_id = userData?.employee_id;
        await dispatch(EmployeefetchGoals(employee_id)); // Dispatch fetch goals action
        setLoading(false); // Stop loading
      }
    };
    fetchGoalsData();
  }, [dispatch, userData]);

  




  // Update activeTab based on visible buttons
  useEffect(() => {
    if (showPending) setActiveTab("pending");
    else if (showCompleted) setActiveTab("completed");
    else if (showSaved) setActiveTab("saved");
  }, [showPending, showCompleted, showSaved]);

  const handleDeleteGoal = (id: any) => {
    dispatch(deleteGoal(id));
  };

  const handleCompleteGoal = (id: any) => {
    dispatch(completeGoal(id));
  };

  const handlePendingTasksClick = () => setActiveTab("pending");
  const handleCompletedTasksClick = () => setActiveTab("completed");
  const handleSavedTasksClick = () => setActiveTab("saved");

  return (
    <div>
      <div className="flex gap-4 md:gap-4 justify-start md:justify-start w-full">
        {showPending && (
          <button
            className={`text-xs sm:text-xs h-12 w-full rounded-tl-3xl rounded-tr-3xl ${
              activeTab === "pending"
                ? "bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] text-white"
                : "text-default-600"
            } ${isClickable ? "cursor-pointer" : "cursor-default"}`}
            onClick={handlePendingTasksClick}
          >
            Goals
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
            Tasks
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

     <div style={{ display: userData?.user_type_id === 3 ? "none" : "block" }}>
      <ul
        className={`overflow-y-auto 4xl:h-48 h-64 justify-center items-center md:justify-start w-full border border-[#62626280] rounded-b-lg relative`}
      >
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <Spinner height="30px" width="30px" />
          </div>
        ) : activeTab === "pending" ? (
          goals && goals.length > 0 ? (
            goals.filter((item: any) => item.status === false).length > 0 ? (
              goals
                .filter((item: any) => item.status === false)
                .map((item: any) => (
                  <li
                    className="flex flex-col sm:flex-row justify-center md:justify-start items-center sm:items-center w-full 4xl:h-16 h-20 gap-2 border-b border-gray-500 pb-2 last:pb-0 last:border-b-0"
                    key={item.id}
                  >
                    <div className="flex items-center 4xl:mx-5 md:mx-5 justify-between  w-full">
                      <div className="flex items-center">
                        <Avatar className="w-6 h-6">
                          <AvatarImage
                            src="/assets/ongoing.png"
                            alt="pending-avatar"
                            className="w-5 h-5"
                          />
                        </Avatar>
                        <span className="text-xs sm:text-sm px-1">
                          <button
                            className={`inline-block w-[120px] items-center gap-1.5 whitespace-nowrap rounded px-1.5 py-1 text-md font-bold text-start cursor-auto relative group`}
                            title={`Description: ${
                              item.description
                            }\nStart Date: ${new Date(
                              item.start_date
                            ).toLocaleDateString("en-GB")}`}
                          >
                            {item.goal_name}
                          </button>
                        </span>
                      </div>

                      <div className="flex justify-center md:items-center ml-3 sm:ml-5 gap-2">
                        {showTooltip && (
                          <AnimatedTooltip items={tooltipItems} />
                        )}
                        <button
                          className={`inline-block  w-[70px] items-center 4xl:gap-0 gap-1.5 whitespace-nowrap rounded 4xl:px-0 px-1.5 py-1 text-xs font-bold text-start cursor-auto ${
                            new Date(item?.completion_date).toDateString() ===
                            new Date().toDateString()
                              ? "bg-green-800 text-green-400" // Green for today's completion date
                              : new Date(item?.completion_date) < new Date()
                              ? "bg-[#7A2C2C] text-[#F28B82]" // Red for past dates
                              : "bg-zinc-800 text-zinc-400" // Default for future dates
                          }`}
                          title="Completion Date"
                        >
                          <div className="flex justify-center items-center">
                            <div className="w-4">
                              <SlCalender />
                            </div>
                            <span>
                              {new Date(item?.completion_date)
                                .toLocaleDateString("en-GB", {
                                  day: "2-digit",
                                  month: "short",
                                })
                                .replace(" ", "-")
                                .toUpperCase()}
                            </span>
                          </div>
                        </button>

                        <SaveModal
                          trigger={(onClick: any) => (
                            <button
                              onClick={onClick}
                              className="rounded bg-green-300/20 px-1.5 py-1 text-sm text-green-300 transition-colors hover:bg-green-600 hover:text-green-200"
                            >
                              <AiOutlineCheckCircle />
                            </button>
                          )}
                          confirmAction={() => handleCompleteGoal(item?.id)}
                        />

                        <Deletemodel
                          trigger={(onClick: any) => (
                            <button
                              onClick={onClick}
                              className="rounded bg-red-300/20 px-1.5 py-1 text-sm text-red-300 transition-colors hover:bg-red-600 hover:text-red-200"
                            >
                              <FiTrash2 />
                            </button>
                          )}
                          confirmAction={() => handleDeleteGoal(item?.id)}
                        />
                      </div>
                    </div>
                  </li>
                ))
            ) : (
              <li className="text-center text-gray-500 h-full w-full flex justify-center items-center">
                No goals found
              </li> // Fallback for no pending goals
            )
          ) : (
            <li className="text-center text-gray-500 h-full w-full flex justify-center items-center">
              No goals found
            </li> // Fallback if no goals exist at all
          )
        ) : activeTab === "completed" ? (
          goals && goals.length > 0 ? (
            goals.filter((item: any) => item.status === true).length > 0 ? (
              goals
                .filter((item: any) => item.status === true)
                .map((item: any) => (
                  <li
                    className="flex flex-col sm:flex-row justify-center md:justify-start items-center sm:items-center w-full 4xl:h-16 h-20 gap-2 border-b border-gray-500 pb-2 last:pb-0 last:border-b-0"
                    key={item.id}
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
                        <span className="text-xs sm:text-sm px-2">
                          <button
                            className={`inline-block w-[120px] items-center gap-1.5 whitespace-nowrap rounded px-1.5 py-1 text-md font-bold text-start cursor-auto relative group`}
                            title={`Description: ${
                              item.description
                            }\nStart Date: ${new Date(
                              item.start_date
                            ).toLocaleDateString("en-GB")}`}
                          >
                            {item.goal_name}
                          </button>
                        </span>
                      </div>

                      <div className="flex items-center ml-5">
                        {showTooltip && (
                          <AnimatedTooltip items={tooltipItems} />
                        )}
                        <Deletemodel
                          trigger={(onClick: any) => (
                            <button
                              onClick={onClick}
                              className="rounded bg-red-300/20 px-1.5 py-1 text-sm text-red-300 transition-colors hover:bg-red-600 hover:text-red-200"
                            >
                              <FiTrash2 />
                            </button>
                          )}
                          confirmAction={() => handleDeleteGoal(item?.id)}
                        />
                      </div>
                    </div>
                  </li>
                ))
            ) : (
              <li className="text-center text-gray-500 h-full w-full flex justify-center items-center">
                No tasks found
              </li> // Fallback for no completed goals
            )
          ) : (
            <li className="text-center text-gray-500 h-full w-full flex justify-center items-center">
              {" "}
              No tasks found
            </li> // Fallback if no goals exist at all
          )
        ) : (
          savedTasks.map((item) => (
            <li
              className="flex flex-col sm:flex-row justify-center md:justify-start items-center sm:items-center w-full 4xl:h-16 h-20 gap-2 border-b border-gray-500 pb-2 last:pb-0 last:border-b-0"
              key={item.id}
            >
              <div className="flex items-center md:mx-5 justify-between w-full">
                <div className="flex items-center">
                  <Avatar className="w-6 h-6">
                    <AvatarImage
                      src="/assets/saved.png"
                      alt="saved-avatar"
                      className="w-5 h-5"
                    />
                  </Avatar>
                  <span className="text-xs px-2 sm:text-sm">{item.goal}</span>
                </div>
                <div className="flex items-center ml-5">
                  {showTooltip && <AnimatedTooltip items={tooltipItems} />}
                  <Button color="primary" className="rounded-3xl">
                    Take
                  </Button>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
      </div>

      {/* Employee Goals */}

      <div style={{ display: userData?.user_type_id === 3 ? "block" : "none" }} >
      <ul
        className={`overflow-y-auto 4xl:h-48 h-64 justify-center items-center md:justify-start w-full border border-[#62626280] rounded-b-lg relative`}
      >
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <Spinner height="30px" width="30px" />
          </div>
        ) : activeTab === "pending" ? (
          EmployeeGoals && EmployeeGoals.length > 0 ? (
            EmployeeGoals.filter((item: any) => item.status === false).length > 0 ? (
              EmployeeGoals
                .filter((item: any) => item.status === false)
                .map((item: any) => (
                  <li
                    className="flex flex-col sm:flex-row justify-center md:justify-start items-center sm:items-center w-full 4xl:h-16 h-20 gap-2 border-b border-gray-500 pb-2 last:pb-0 last:border-b-0"
                    key={item.id}
                  >
                    <div className="flex items-center 4xl:mx-5 md:mx-5 justify-between  w-full">
                      <div className="flex items-center">
                        <Avatar className="w-6 h-6">
                          <AvatarImage
                            src="/assets/ongoing.png"
                            alt="pending-avatar"
                            className="w-5 h-5"
                          />
                        </Avatar>
                        <span className="text-xs sm:text-sm px-1">
                          <button
                            className={`inline-block w-[120px] items-center gap-1.5 whitespace-nowrap rounded px-1.5 py-1 text-md font-bold text-start cursor-auto relative group`}
                            title={`Description: ${
                              item.description
                            }\nStart Date: ${new Date(
                              item.start_date
                            ).toLocaleDateString("en-GB")}`}
                          >
                            {item.goal_name}
                          </button>
                        </span>
                      </div>

                      <div className="flex justify-center md:items-center ml-3 sm:ml-5 gap-2">
                        {showTooltip && (
                          <AnimatedTooltip items={tooltipItems} />
                        )}
                        <button
                          className={`inline-block  w-[70px] items-center 4xl:gap-0 gap-1.5 whitespace-nowrap rounded 4xl:px-0 px-1.5 py-1 text-xs font-bold text-start cursor-auto ${
                            new Date(item?.completion_date).toDateString() ===
                            new Date().toDateString()
                              ? "bg-green-800 text-green-400" // Green for today's completion date
                              : new Date(item?.completion_date) < new Date()
                              ? "bg-[#7A2C2C] text-[#F28B82]" // Red for past dates
                              : "bg-zinc-800 text-zinc-400" // Default for future dates
                          }`}
                          title="Completion Date"
                        >
                          <div className="flex justify-center items-center">
                            <div className="w-4">
                              <SlCalender />
                            </div>
                            <span>
                              {new Date(item?.completion_date)
                                .toLocaleDateString("en-GB", {
                                  day: "2-digit",
                                  month: "short",
                                })
                                .replace(" ", "-")
                                .toUpperCase()}
                            </span>
                          </div>
                        </button>

                        <SaveModal
                          trigger={(onClick: any) => (
                            <button
                              onClick={onClick}
                              className="rounded bg-green-300/20 px-1.5 py-1 text-sm text-green-300 transition-colors hover:bg-green-600 hover:text-green-200"
                            >
                              <AiOutlineCheckCircle />
                            </button>
                          )}
                          confirmAction={() => handleCompleteGoal(item?.id)}
                        />

                        <Deletemodel
                          trigger={(onClick: any) => (
                            <button
                              onClick={onClick}
                              className="rounded bg-red-300/20 px-1.5 py-1 text-sm text-red-300 transition-colors hover:bg-red-600 hover:text-red-200"
                            >
                              <FiTrash2 />
                            </button>
                          )}
                          confirmAction={() => handleDeleteGoal(item?.id)}
                        />
                      </div>
                    </div>
                  </li>
                ))
            ) : (
              <li className="text-center text-gray-500 h-full w-full flex justify-center items-center">
                No goals found
              </li> // Fallback for no pending goals
            )
          ) : (
            <li className="text-center text-gray-500 h-full w-full flex justify-center items-center">
              No goals found
            </li> // Fallback if no goals exist at all
          )
        ) : activeTab === "completed" ? (
          EmployeeGoals && EmployeeGoals.length > 0 ? (
            EmployeeGoals.filter((item: any) => item.status === true).length > 0 ? (
              EmployeeGoals
                .filter((item: any) => item.status === true)
                .map((item: any) => (
                  <li
                    className="flex flex-col sm:flex-row justify-center md:justify-start items-center sm:items-center w-full 4xl:h-16 h-20 gap-2 border-b border-gray-500 pb-2 last:pb-0 last:border-b-0"
                    key={item.id}
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
                        <span className="text-xs sm:text-sm px-2">
                          <button
                            className={`inline-block w-[120px] items-center gap-1.5 whitespace-nowrap rounded px-1.5 py-1 text-md font-bold text-start cursor-auto relative group`}
                            title={`Description: ${
                              item.description
                            }\nStart Date: ${new Date(
                              item.start_date
                            ).toLocaleDateString("en-GB")}`}
                          >
                            {item.goal_name}
                          </button>
                        </span>
                      </div>

                      <div className="flex items-center ml-5">
                        {showTooltip && (
                          <AnimatedTooltip items={tooltipItems} />
                        )}
                        <Deletemodel
                          trigger={(onClick: any) => (
                            <button
                              onClick={onClick}
                              className="rounded bg-red-300/20 px-1.5 py-1 text-sm text-red-300 transition-colors hover:bg-red-600 hover:text-red-200"
                            >
                              <FiTrash2 />
                            </button>
                          )}
                          confirmAction={() => handleDeleteGoal(item?.id)}
                        />
                      </div>
                    </div>
                  </li>
                ))
            ) : (
              <li className="text-center text-gray-500 h-full w-full flex justify-center items-center">
                No tasks found
              </li> // Fallback for no completed goals
            )
          ) : (
            <li className="text-center text-gray-500 h-full w-full flex justify-center items-center">
              {" "}
              No tasks found
            </li> // Fallback if no goals exist at all
          )
        ) : (
          savedTasks.map((item) => (
            <li
              className="flex flex-col sm:flex-row justify-center md:justify-start items-center sm:items-center w-full 4xl:h-16 h-20 gap-2 border-b border-gray-500 pb-2 last:pb-0 last:border-b-0"
              key={item.id}
            >
              <div className="flex items-center md:mx-5 justify-between w-full">
                <div className="flex items-center">
                  <Avatar className="w-6 h-6">
                    <AvatarImage
                      src="/assets/saved.png"
                      alt="saved-avatar"
                      className="w-5 h-5"
                    />
                  </Avatar>
                  <span className="text-xs px-2 sm:text-sm">{item.goal}</span>
                </div>
                <div className="flex items-center ml-5">
                  {showTooltip && <AnimatedTooltip items={tooltipItems} />}
                  <Button color="primary" className="rounded-3xl">
                    Take
                  </Button>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
      </div>
      {/* Employee Goals */}
    </div>
  );
};

export default TasksTracker;
