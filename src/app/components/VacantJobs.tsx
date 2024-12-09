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

const VacantJobs = ({ jobs }: { jobs: { id: number; title: string }[] }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string>("");
  const [loading, setLoading] = useState(true); // Added loading state
  const { userData } = useSelector((state: RootState) => state.auth);
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
              </li>
            ))}
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
