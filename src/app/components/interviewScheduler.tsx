import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/app/components/Card";
import { Avatar, AvatarImage } from "@/app/components/avatar";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

import { Button } from "./button-sidebar";

import ApplicationPopup from "./applicationPopup";
import Deletemodel from "./DeleteModal";
import { FiTrash2 } from "react-icons/fi";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteJobApplication,
  fetchJobApplications,
} from "../../redux/slices/jobApplication.slice";
import { RootState } from "@/redux/store";
import StackedNotifications, { NotificationType } from "./Stackednotification";
import Spinner from "./Spinner";

const InterviewSchedulerTab: React.FC = () => {
  const dispatch = useDispatch<any>();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobs, setJobs] = useState<any[]>([]);
  const [totalPage, setTotalPage] = useState(1);
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );
  const [jobusers, setJobusers] = useState<any>(null);
  const { userData } = useSelector((state: RootState) => state.auth);
  const { jobApplications, jobApplicationsLoader } = useSelector(
    (state: RootState) => state.jobapplication
  );
  const organizationId = userData?.organization_id;

  useEffect(() => {
    if (organizationId) {
      dispatch(fetchJobApplications({ organizationId }));
    }
  }, [dispatch, organizationId]);

  useEffect(() => {
    if (jobApplications) {
      setJobs(jobApplications);
    }
  }, [jobApplications]);

  const handleOpenPopup = (job: any) => {
    const employeeData = {
      name: `${job.users?.first_name} ${job.users?.last_name}`,
      designation: job.users?.designation || "Not Specified",
      message: job.message,
      cvLink: job.cv,
      profileImage: job.users?.profile_image,
      applicationid: job.id,
      employeeid: job.users?.id,
    };
    setSelectedEmployee(employeeData); // Set selected employee data
    setIsPopupVisible(true); // Show the popup
  };

  // Function to handle job deletion
  const handleDeleteJob = (applicationId: number) => {
    // Optimistic update: Remove the job from local state immediately
    const updatedJobs = jobs.filter((job) => job.id !== applicationId);
    setJobs(updatedJobs);

    // Dispatch the delete job application action
    dispatch(deleteJobApplication({ applicationId }))
      .then(() => {
        // Successfully deleted, show success notification
        setNotification({
          id: Date.now(),
          text: "Application Deleted Successfully!",
          type: "success",
        });
      })
      .catch((error: any) => {
        // Restore the job in case of error
        dispatch(fetchJobApplications({ organizationId }));
        setNotification({
          id: Date.now(),
          text: `Error: ${error.message || "Failed to delete application"}`,
          type: "error",
        });
      });
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
    setSelectedEmployee(null);
  };

  return (
    <div className="flex flex-col items-center">
      <StackedNotifications
        notification={notification}
        setNotification={setNotification}
      />
      <Card className="border border-[#62626280] rounded-xl w-full h-full">
        <CardHeader>
          <h2 className="text-2xl items-center font-semibold mb-3">
            Latest Applications
          </h2>
          {/* Label Bar */}
          <div className="flex justify-between px-8 py-3 text-white bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] text-sm font-medium">
            <span className="w-1/3 text-left">Name</span>
            <span className="w-1/3 text-center">Designation</span>
            <span className="w-1/3 text-center">Status</span>
            <span className="w-1/3 text-right">Action</span>
          </div>
        </CardHeader>

        {jobApplicationsLoader ? (
          <div className="flex justify-center items-center py-10">
            <Spinner height="30px" width="30px" />
          </div>
        ) : (
          <ul className="h-[36em]">
            {jobs.map((job) => (
              <li key={job.id} className="border-b border-gray-600 4xl:p-3">
                <CardContent className="flex justify-between items-center px-8 py-4">
                  {/* Name and Avatar */}
                  <div className="w-1/3 flex items-center space-x-4">
                    <Avatar className="w-10 h-10 border-2 border-slate-600">
                      <AvatarImage
                        src={
                          job.users?.profile_image
                            ? `/api/images?filename=${job.users.profile_image}&folder=profileImage`
                            : "/assets/DummyImg.png"
                        }
                        alt={`${job.users?.first_name} ${job.users?.last_name}-avatar`}
                      />
                    </Avatar>
                    <span className="font-semibold text-sm capitalize">
                      {`${job.users?.first_name || "N/A"} ${
                        job.users?.last_name || ""
                      }`}
                    </span>
                  </div>

                  {/* Designation */}
                  <div className="w-1/3 text-center text-sm text-yellow-400 ">
                    {job.users?.designation || "Not Specified"}
                  </div>

                  {/* Status */}
                  <div className="w-1/3 flex justify-center">
                    <div className="text-center text-sm text-white bg-slate-50 bg-opacity-35 rounded-2xl w-[10em] pl-4 pt-1 pr-4 pb-1">
                      {job.scheduled === true ? "Scheduled" : "Not Scheduled"}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="w-1/3 flex justify-end items-center space-x-3">
                    <Button
                      color={"primary"}
                      size="md"
                      className="rounded-lg text-sm"
                      onClick={() => handleOpenPopup(job)}
                    >
                      View
                    </Button>

                    <Deletemodel
                      trigger={(onClick: any) => (
                        <button
                          onClick={onClick}
                          className="rounded-lg bg-red-600 px-3 py-3 text-sm text-white transition-colors hover:bg-red-600 hover:text-red-200"
                        >
                          <FiTrash2 />
                        </button>
                      )}
                      confirmAction={() => handleDeleteJob(job.id)}
                    />
                    <button
                      className={`rounded-lg px-2 py-2 text-[20px] text-white transition-colors ${
                        job.scheduled === true
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-transparent hover:bg-green-600 border-[1px] border-slate-600"
                      }`}
                    >
                      <IoCheckmarkDoneCircleOutline />
                    </button>
                  </div>
                </CardContent>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {selectedEmployee && (
        <ApplicationPopup
          show={isPopupVisible}
          onClose={handleClosePopup}
          employee={selectedEmployee}
        />
      )}
    </div>
  );
};

export default InterviewSchedulerTab;
