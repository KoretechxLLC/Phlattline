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

const VacantJobs = ({ jobs }: { jobs: { id: number; title: string }[] }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string>("");
  const [loading, setLoading] = useState(true); // Added loading state

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
        <CardTitle className="text-center  text-white text-xs sm:text-md mb-0">
          Your Desired Job
        </CardTitle>
      </CardHeader>

      {/* Jobs List */}
      <CardContent className="bg-black border border-[#62626280]  rounded-b-lg p-8">
        {loading ? (
          // Show loader if data is loading
          <div className="flex justify-center items-center py-5">
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
                <Button
                  onClick={() => handleApplyClick(job.title)}
                  color="primary"
                  className="rounded-3xl"
                >
                  Apply
                </Button>
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
