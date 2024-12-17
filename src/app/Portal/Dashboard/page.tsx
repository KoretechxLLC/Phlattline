"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPurchaseAssessment,
  fetchPurchaseCourses,
} from "@/redux/slices/auth.slice";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { CiClock1 } from "react-icons/ci";

// Lazy load components for widgets
const AssessmentsBanner = dynamic(
  () => import("@/app/components/AssessmentsBanner")
);
const AssessmentsTracker = dynamic(
  () => import("@/app/components/AssesmentsTracker")
);
const NotesCalendar = dynamic(() => import("@/app/components/NotesCalendar"));
const TasksTracker = dynamic(() => import("@/app/components/TasksTracker"));
const PersonalGoals = dynamic(
  () => import("@/app/components/PersonalGoalsTracker")
);
const TabButton = dynamic(() => import("@/app/components/TabButton"));
const CoursesResults = dynamic(() => import("@/app/components/CoursesResults"));
const PreviousResultsTracker = dynamic(
  () => import("@/app/components/PreviousResultsTracker")
);
const AssessmentResultPie = dynamic(
  () => import("@/app/components/AssessmentsResultPie")
);
const ActivityHours = dynamic(() => import("@/app/components/ActivityHours"));
const PerformanceReviews = dynamic(
  () => import("@/app/components/performanceReviewsTab")
);
const InterviewSchedulerTab = dynamic(
  () => import("@/app/components/interviewScheduler")
);
const AddPositionForm = dynamic(
  () => import("@/app/components/addPositionForm")
);
const SuccessionPlanningTab = dynamic(
  () => import("@/app/components/successionPlanning")
);
const EmployeesListTab = dynamic(
  () => import("@/app/components/employeesList")
);
const EmployeeDataTab = dynamic(
  () => import("@/app/components/employeeDataTab")
);

const Dashboard = () => {
  const { userData } = useSelector((state: RootState) => state.auth);
  const defaultWidgets = [
    { id: "assessmentsBanner", name: "Assessments Banner", isVisible: true },
    { id: "assessmentsReports", name: "Assessments Reports", isVisible: true },
    {
      id: "upcomingVideos",
      name: "Upcoming Videos and Blogs",
      isVisible: true,
    },
    { id: "tasksTracker", name: "Tasks Tracker", isVisible: true },
    { id: "courseResults", name: "Course Results", isVisible: true },
    { id: "personalGoals", name: "Personal Goals", isVisible: true },
    { id: "trainingOnDemand", name: "Training-On Demand", isVisible: true },
    {
      id: "recommendedAssesments",
      name: "Recommended Assesments",
      isVisible: true,
    },
    {
      id: "previousResultsTracker",
      name: "Previous Results Tracker",
      isVisible: true,
    },
    {
      id: "assessmentsResults",
      name: "Assesments Results",
      isVisible: true,
    },
    {
      id: "activityHours",
      name: "Activity Hours",
      isVisible: true,
    },
  ];

  if (userData?.user_type_id === 2) {
    defaultWidgets.push(
      {
        id: "performanceReviews",
        name: "Performance Reviews",
        isVisible: true,
      },
      {
        id: "interviewScheduler",
        name: "Interview Scheduler",
        isVisible: true,
      },
      {
        id: "addPositionForm",
        name: "Add Position Form",
        isVisible: true,
      },
      {
        id: "successionPlanning",
        name: "Succession Planning",
        isVisible: true,
      },
      {
        id: "employeeList",
        name: "Employee List",
        isVisible: true,
      },
      {
        id: "employeeData",
        name: "Employee Data",
        isVisible: true,
      }
    );
  }

  const [widgets, setWidgets] = useState(defaultWidgets);

  const { loading, error, success, logSuccess, goals, timeLogs }: any =
    useSelector((state: RootState) => state.performance);
  const [timelogsData, setTimeLogsData] = useState<any>([]);
  const [timeLogSpent, setTimeLogSpent] = useState(0);
  const dispatch: any = useDispatch();
  const router = useRouter();

  // Load user courses and assessments
  useEffect(() => {
    if (!userData?.user_courses || userData.user_courses.length === 0) {
      dispatch(fetchPurchaseCourses(userData?.id));
    }

    if (
      !userData?.purchased_assessments ||
      userData.purchased_assessments.length === 0
    ) {
      dispatch(fetchPurchaseAssessment(userData?.id));
    }
  }, [dispatch, userData]);

  useEffect(() => {
    if (logSuccess) {
      setTimeLogsData(timeLogs?.timelogs);
      setTimeLogSpent(timeLogs?.totalTimeSpent);
    }
  }, [timeLogs?.timelogs, logSuccess, timeLogs?.totalTimeSpent]);

  // Load widget visibility state
  useEffect(() => {
    const savedWidgets = localStorage.getItem("dashboard_widgets");
    if (savedWidgets) {
      setWidgets(JSON.parse(savedWidgets));
    }
  }, []);

  const [selectedJob, setSelectedJob] = useState(null); // State to hold selected job

  // Callback to clear selected job after updating or clearing
  const clearSelectedJob = () => {
    setSelectedJob(null); // Reset the state
  };

  const formatTimeSpent = (seconds: any) => {
    if (seconds < 60) {
      return (
        <span>
          {seconds} <span style={{ fontSize: "0.8em" }}>SEC</span>
        </span>
      );
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return (
      <span>
        <span>
          {minutes}
          <span style={{ fontSize: "0.6em", color: "#FF0000" }}> MIN</span>
        </span>
        {remainingSeconds > 0 && (
          <span style={{ marginLeft: "0.2em" }}>
            {remainingSeconds}
            <span style={{ fontSize: "0.6em", color: "#FF0000" }}> SEC</span>
          </span>
        )}
      </span>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[70%_30%] gap-4 w-full h-full overflow-hidden items-start">
      {/* Left Column Widgets */}
      <div className="space-y-4 4xl:space-y-2 md:space-y-6">
        {widgets.map(
          (widget) =>
            widget.isVisible &&
            (widget.id === "assessmentsBanner" ? (
              <AssessmentsBanner key={widget.id} />
            ) : widget.id === "addPositionForm" ? (
              <div className="md:col-span-1">
                <AddPositionForm
                  job={selectedJob}
                  clearSelectedJob={clearSelectedJob}
                />
              </div>
            ) : widget.id === "assessmentsReports" ? (
              <Card
                key={widget.id}
                className="border-[1px] border-[#62626280] rounded-3xl h-auto"
              >
                <CardHeader className="h-16 rounded-3xl bg-gradient-to-b from-[#62626280] to-[#2D2C2C80]">
                  <CardTitle>Assessments Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <AssessmentsTracker />
                </CardContent>
              </Card>
            ) : widget.id === "employeeData" ? (
              <div>
                <EmployeeDataTab />
              </div>
            ) : widget.id === "performanceReviews" ? (
              <div className="col-span-1 md:col-span-2 border border-[#62626280] rounded-3xl">
                <CardHeader className="h-16 rounded-3xl bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80] ">
                  <CardTitle>Performance Reviews</CardTitle>
                </CardHeader>
                <PerformanceReviews />
              </div>
            ) : widget.id === "successionPlanning" ? (
              <div className="md:col-span-1">
                <SuccessionPlanningTab />
              </div>
            ) : widget.id === "interviewScheduler" ? (
              <div>
                <InterviewSchedulerTab />
              </div>
            ) : widget.id === "previousResultsTracker" ? (
              <Card className="border-[1px] border-[#62626280] rounded-3xl h-full">
                <CardHeader className="h-16 rounded-3xl">
                  <div className="text-sm my-1 flex justify-between">
                    <CardTitle>Previous Results</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-2 pt-10">
                  <PreviousResultsTracker />
                </CardContent>
              </Card>
            ) : widget.id === "assessmentsResults" ? (
              <Card className="border-[1px] border-[#62626280] bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80] rounded-3xl h-full">
                <CardHeader className="h-16 rounded-3xl">
                  <div className="text-sm flex justify-between">
                    <CardTitle>Assessment Results</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-2">
                  <AssessmentResultPie />
                </CardContent>
              </Card>
            ) : widget.id === "activityHours" ? (
              <Card className="border border-[#62626280] rounded-3xl p-1">
                <CardHeader className="flex-row gap-3">
                  <CardTitle className="flex-1">Activity Hours</CardTitle>
                </CardHeader>

                <div className="flex space-x-4">
                  <div className="w-full">
                    <ActivityHours />
                  </div>

                  <div className="w-1/4 flex flex-col">
                    <div className="flex flex-col w-fit mb-3"></div>
                    <div className="flex flex-col mt-[8em]">
                      <span className="space-x-8 items-center flex justify-center">
                        <span className="text-2xl">
                          {timeLogSpent
                            ? formatTimeSpent(timeLogSpent)
                            : "0 secs"}
                        </span>
                      </span>
                      <span className="font-bold my-1 text-lg flex justify-center items-center gap-1">
                        <CiClock1 />
                        Time Spent
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ) : null)
        )}
      </div>

      {/* Right Column Widgets */}
      <div className="space-y-3 4xl:space-y-2 md:space-y-3 w-full px-5">
        {widgets.map(
          (widget) =>
            widget.isVisible &&
            (widget.id === "upcomingVideos" ? (
              <Card
                key={widget.id}
                className="shadow-md rounded-3xl w-full h-full"
              >
                <CardHeader>
                  <div className="flex justify-between gap-3 items-center">
                    <h1 className="4xl:text-sm text-lg">
                      Upcoming Videos and Blogs
                    </h1>
                    <p
                      className="4xl:text-sm text-lg underline cursor-pointer"
                      onClick={() => router.push("/Portal/DailyDose")}
                    >
                      View
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="w-full bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] text-white rounded-3xl p-4">
                  <NotesCalendar />
                </CardContent>
              </Card>
            ) : widget.id === "courseResults" ? (
              <div>
                <div className="border border-[#62626280] rounded-3xl shadow-md w-full h-full">
                  <h1 className="text-center text-3xl font-bold my-2">
                    Course Results
                  </h1>
                  <CoursesResults />
                </div>
              </div>
            ) : widget.id === "employeeList" ? (
              <div>
                <EmployeesListTab />
              </div>
            ) : widget.id === "tasksTracker" ? (
              <TasksTracker
                key={widget.id}
                showPending={true}
                showCompleted={true}
                showSaved={false}
                showTooltip={false}
                label={"Goals"}
                isClickable={false}
              />
            ) : widget.id === "personalGoals" ? (
              <Card
                key={widget.id}
                className="border border-[#62626280] rounded-3xl shadow-md w-full h-full"
              >
                <CardHeader>
                  <CardTitle>Personal Goals</CardTitle>
                </CardHeader>
                <CardContent>
                  <PersonalGoals showAvatar={true} />
                </CardContent>
              </Card>
            ) : widget.id === "trainingOnDemand" ? (
              <TabButton
                key={widget.id}
                backgroundColor="#FF0000"
                text="Training-On Demand"
                imageSrc="/assets/LiveIcon.png"
                textColor="#FFFFFF"
                arrowImageSrc="/assets/ArrowRightUp.png"
                showModalOnClick={true}
                isClickable={true}
                modalType="spring"
              />
            ) : widget.id === "recommendedAssesments" ? (
              <TabButton
                key={widget.id}
                backgroundColor="#fff"
                text="Recommended Assessments"
                imageSrc="/assets/BlackAssessments.png"
                textColor="#000"
                arrowImageSrc="/assets/BlackArrowRU.png"
                showModalOnClick={false}
                isClickable={true}
                redirectTo={"/Portal/Assessments?view=recommended"}
              />
            ) : null)
        )}
      </div>
    </div>
  );
};

export default Dashboard;
