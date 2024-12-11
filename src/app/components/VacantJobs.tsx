"use client";
import React, { useState, useEffect } from "react";
import JobPopup from "./JobPopup";
import { Button } from "./button-sidebar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";
import Spinner from "./Spinner"; // Assuming this is the loader component you have
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ChevronLeft, ChevronRight, SquarePen } from "lucide-react";
import { useRouter } from "next/navigation";
import Deletemodel from "./DeleteModal";
import { FiTrash2 } from "react-icons/fi";

const VacantJobs = ({ jobs }: { jobs: { id: number; title: string }[] }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string>("");
  const [loading, setLoading] = useState(true); // Added loading state
  const { userData } = useSelector((state: RootState) => state.auth);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const usertype = userData?.user_type_id;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Stop loading after 2 seconds (simulate API call)
    }, 2000);
  }, []);

  const handleApplyClick = (jobTitle: string) => {
    setSelectedJob(jobTitle);
    setShowPopup(true);
  };
  const handleDeleteGoal = (id: any) => {};

  const handleNextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const router = useRouter();
  return (
    <Card>
      {/* Title with Background */}
      <CardHeader className="bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] rounded-t-3xl py-2 border border-gray-900">
        {(usertype === 1 || usertype === 3) && (
          <CardTitle className="text-center  text-white text-xs sm:text-md mb-0">
            Your Desired Job
          </CardTitle>
        )}
        {usertype === 2 && (
          <CardTitle className="text-center  text-white text-xs sm:text-md mb-0">
            Available Jobs
          </CardTitle>
        )}
      </CardHeader>

      {/* Jobs List */}
      <CardContent className="bg-black border border-[#62626280]  rounded-b-3xl 4xl:p-5 p-8">
        {loading ? (
          // Show loader if data is loading
          <div className="flex justify-center items-center py-14">
            <Spinner height="30px" width="30px" />
          </div>
        ) : jobs && jobs.length > 0 ? (
          // Show message if no jobs are available
          <ul className="space-y-8">
            {jobs.map((job) => (
              <li
                key={job.id}
                className="flex justify-between items-center text-white pb-5"
              >
                <span className="text-md">{job.title}</span>
                {(usertype === 1 || usertype === 3) && (
                  <Button
                    onClick={() => handleApplyClick(job.title)}
                    color="primary"
                    className="rounded-3xl"
                  >
                    Apply
                  </Button>
                )}
                {usertype === 2 && (
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-8 h-8 my-2 bg-green-500 border-default-200"
                    >
                      <SquarePen className="w-7 h-7 text-white" />
                    </Button>
                    <Deletemodel
                      trigger={(onClick: any) => (
                        <button
                          onClick={onClick}
                          className="rounded-lg bg-red-600 px-3 py-2 text-lg text-white transition-colors hover:bg-red-600 hover:text-red-200"
                        >
                          <FiTrash2 />
                        </button>
                      )}
                      confirmAction={() => handleDeleteGoal(job.id)}
                    />
                    <Button
                      onClick={() =>
                        router.push(`/Portal/JobSummary?jobId=${job.id}`)
                      }
                      color="primary"
                      className="rounded-3xl"
                    >
                      Details
                    </Button>
                  </div>
                )}
              </li>
            ))}
            <div className="flex items-center justify-center gap-2 py-4">
              <Button
                variant="outline"
                size="icon"
                className="w-8 h-8 border-transparent hover:bg-transparent"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-5 h-5 text-default-900" />
              </Button>
              <span className="text-sm font-medium text-default-900">
                Page {currentPage} of {totalPage}
              </span>
              <Button
                variant="outline"
                size="icon"
                className="w-8 h-8 border-transparent hover:bg-transparent"
                onClick={handleNextPage}
                disabled={currentPage >= totalPage}
              >
                <ChevronRight className="w-5 h-5 text-default-900" />
              </Button>
            </div>
          </ul>
        ) : (
          <div className="text-center text-gray-300 py-20">
            No Desired Jobs Found
          </div>
        )}
      </CardContent>

      {/* JobPopup */}
      <JobPopup
        show={showPopup}
        onClose={() => setShowPopup(false)}
        jobTitle={selectedJob}
      />
    </Card>
  );
};

export default VacantJobs;
