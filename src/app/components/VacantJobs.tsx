"use client";
import React, { useState } from "react";
import JobPopup from "./JobPopup";

const VacantJobs = ({ jobs }: { jobs: { id: number; title: string }[] }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string>("");

  const handleApplyClick = (jobTitle: string) => {
    setSelectedJob(jobTitle);
    setShowPopup(true);
  };

  return (
    <div className="border-[1px] border-[#62626280] rounded-3xl bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] w-full max-w-[700px] mx-auto">
      {/* Title with Background */}
      <div className="bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] rounded-t-3xl py-2">
        <h2 className="text-center text-white text-lg font-bold mb-0">
          Vacant Jobs
        </h2>
      </div>

      {/* Jobs List */}
      <div className="bg-black rounded-b-3xl p-8">
        <ul className="space-y-6">
          {jobs.map((job) => (
            <li
              key={job.id}
              className="flex justify-between items-center text-white border-b border-gray-700 pb-3"
            >
              <span className="text-md">{job.title}</span>
              <button
                onClick={() => handleApplyClick(job.title)}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-red-500 text-white text-sm hover:scale-105 transition-transform"
              >
                Apply
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* JobPopup */}
      <JobPopup
        show={showPopup}
        onClose={() => setShowPopup(false)}
        jobTitle={selectedJob}
      />
    </div>
  );
};

export default VacantJobs;
