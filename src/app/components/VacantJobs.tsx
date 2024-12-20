"use client";
import React, { useState, useEffect } from "react";

import { Button } from "./button-sidebar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";
import Spinner from "./Spinner";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Deletemodel from "./DeleteModal";
import { FiTrash2 } from "react-icons/fi";
import { MdEdit } from "react-icons/md";
import {
  deleteTalent,
  fetchTalents,
  resetDeleteTalentSuccess,
  resetDeleteTalentError,
} from "@/redux/slices/talentmanagement.slice";
import StackedNotifications from "./Stackednotification";
import { RiUserSearchFill } from "react-icons/ri";

export type NotificationType = {
  id: number;
  text: string;
  type: "error" | "success";
};

const VacantJobs = ({ onEditJob }: any) => {
  const dispatch = useDispatch<any>();
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );
  const { userData } = useSelector((state: RootState) => state.auth);
  const {
    fetchedTalents,
    deleteTalentSuccess,
    deleteTalentError,
    fetchTalentsLoader,
    deleteTalentLoader,
  } = useSelector((state: RootState) => state.talent);

  const [newjobs, setNewjobs] = useState<any[]>([]);
  const organizationId = userData?.organization_id;

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 3; // Number of jobs per page

  const router = useRouter();

  // Fetch talents on mount or when the organizationId changes
  useEffect(() => {
    if (organizationId) {
      dispatch(fetchTalents({ organizationId }));
    }
  }, [organizationId, dispatch]);

  // Sync fetchedTalents to newjobs state
  useEffect(() => {
    if (fetchedTalents) {
      setNewjobs(fetchedTalents);
    }
  }, [fetchedTalents]);

  // Handle notifications for delete success or error
  useEffect(() => {
    if (deleteTalentSuccess) {
      setNotification({
        id: Date.now(),
        text: deleteTalentSuccess,
        type: "success",
      });
      dispatch(resetDeleteTalentSuccess());
    }
    if (deleteTalentError) {
      setNotification({
        id: Date.now(),
        text: deleteTalentError,
        type: "error",
      });
      dispatch(resetDeleteTalentError());
    }
  }, [deleteTalentSuccess, deleteTalentError, dispatch]);

  const handleDeleteJob = (id: any) => {
    dispatch(deleteTalent({ id }));
  };

  // Calculate Paginated Jobs
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = newjobs.slice(indexOfFirstJob, indexOfLastJob);

  // Handle Pagination
  const handleNextPage = () => {
    if (currentPage < Math.ceil(newjobs.length / jobsPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <Card className="border border-[#62626280] rounded-3xl">
      <StackedNotifications
        notification={notification}
        setNotification={setNotification}
      />
      <CardHeader className="mb-4 bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80] rounded-3xl">
        <CardTitle className="text-white text-xs sm:text-md mb-0">
          Available Jobs
        </CardTitle>
      </CardHeader>

      <CardContent className="4xl:p-5 p-8">
        {fetchTalentsLoader ? (
          <div className="flex justify-center items-center py-14">
            <Spinner height="30px" width="30px" />
          </div>
        ) : currentJobs && currentJobs.length > 0 ? (
          <ul className="space-y-4">
            {currentJobs.map((job) => (
              <li
                key={job.id}
                className="flex justify-between items-center text-white pb-5"
              >
                <div className="flex items-center gap-3 w-[20em] -ml-[0.6em]">
                <div className="flex items-center justify-center rounded-full h-10 w-10 border-2 group-hover:scale-105 group-hover:z-30 border-white bg-gradient-to-b from-[#BAA716] to-[#B50D34] relative transition duration-500">
                  <span className="text-white text-[13px] md:text-sm font-bold">
                    <RiUserSearchFill size={23} />
                  </span>
                </div>

                <span className="text-[15px] text-left w-[10em] mr-[4em]">
                  {job.position_name}
                </span>
                </div>

                <div className="flex space-x-2 items-center">
                  <Button
                    onClick={() =>
                      router.push(
                        `/Portal/JobSummary?jobId=${job.id}&departmentId=${job.department_id}`
                      )
                    }
                    color="primary"
                    className="rounded-lg"
                  >
                    Details
                  </Button>
                  <button
                    className="rounded bg-slate-400/30 px-3 py-4 text-sm text-white transition-colors hover:bg-green-600 hover:text-white"
                    onClick={() => onEditJob(job)}
                  >
                    <MdEdit />
                  </button>
                  <Deletemodel
                    trigger={(onClick: any) => (
                      <button
                        onClick={onClick}
                        className="rounded bg-red-600 px-3 py-4 text-sm text-white transition-colors hover:bg-red-600 hover:text-red-200"
                      >
                        <FiTrash2 />
                      </button>
                    )}
                    confirmAction={() => handleDeleteJob(job.id)}
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-gray-300 py-20">
            No Desired Jobs Found
          </div>
        )}

        {/* Pagination Controls */}
        <div className="flex items-center justify-center gap-2 py-4 mt-auto">
          <Button
            variant="outline"
            size="icon"
            className="w-8 h-8 border-transparent hover:bg-transparent"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-5 h-5 text-default-900" />
          </Button>
          <span className="text-white">
            Page {currentPage} of {Math.ceil(newjobs.length / jobsPerPage)}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="w-8 h-8 border-transparent hover:bg-transparent"
            onClick={handleNextPage}
            disabled={currentPage === Math.ceil(newjobs.length / jobsPerPage)}
          >
            <ChevronRight className="w-5 h-5 text-default-900" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VacantJobs;
