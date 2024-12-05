"use client";
import React, { useState, useEffect } from "react";
import UploadCVPopup from "./uploadCV";
import { Button } from "./button-sidebar";
import Spinner from "@/app/components/Spinner"; // Assuming this is where the Spinner component is imported

// Job data (simulating fetching data)
const jobData = [
  {
    id: "1",
    title: "Administrative Assistant",
    summary: `As an Administrative Assistant, you will play a vital role in supporting the daily operations of our organization.`,
    qualifications: [
      "Education: High school diploma or equivalent; Associate’s or Bachelor’s degree preferred.",
      "Experience: Minimum of 1–2 years in an administrative role or similar.",
      "Technical Skills: Proficiency in Microsoft Office Suite (Word, Excel, PowerPoint, Outlook) and familiarity with scheduling software.",
    ],
    responsibilities: [
      "Administrative Support: Provide general support to the management and other team members.",
      "Documentation: Prepare and edit documents, reports, and presentations.",
      "Scheduling: Manage calendars, coordinate meetings, and arrange travel itineraries for staff.",
    ],
  },
];

const JobPopup = ({
  show,
  onClose,
  jobTitle,
}: {
  show: boolean;
  onClose: () => void;
  jobTitle: string;
}) => {
  const [showCVPopup, setShowCVPopup] = useState(false); // State to control the UploadCVPopup visibility
  const [loading, setLoading] = useState(true); // Loading state to show the loader initially

  // Simulate loading of job data with a timeout (replace with actual data fetching logic)
  useEffect(() => {
    if (show) {
      setLoading(true); // Set loading to true when the popup is shown
      setTimeout(() => {
        setLoading(false); // Set loading to false after 2 seconds (simulating data load)
      }, 2000); // Simulate loading for 2 seconds
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#000000b9] rounded-xl shadow-lg p-8 w-[90%] max-w-6xl">
        {/* Popup Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">{jobTitle}</h2>
          <button
            onClick={onClose}
            className="text-red-600 text-3xl font-extrabold hover:text-red-800"
          >
            ×
          </button>
        </div>

        {/* Conditionally render loader or content */}
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Spinner height="30px" width="30px" />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-8">
            {/* Left Section */}
            <div>
              {/* Job Summary */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-red-600 mb-3">
                  Job Summary:
                </h3>
                <p className="text-white leading-7">{jobData[0].summary}</p>
              </div>

              {/* Qualifications */}
              <div>
                <h3 className="text-xl font-bold text-red-600 mb-3">
                  Qualifications:
                </h3>
                <ul className="list-disc pl-6 text-white leading-7">
                  {jobData[0].qualifications.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Section */}
            <div>
              {/* Key Responsibilities */}
              <h3 className="text-xl font-bold text-red-600 mb-3">
                Key Responsibilities:
              </h3>
              <ul className="list-disc pl-6 text-white leading-7">
                {jobData[0].responsibilities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center">
          <Button
            onClick={() => setShowCVPopup(true)} // Show UploadCVPopup
            color="primary"
            className="rounded-3xl"
          >
            Apply Now
          </Button>
        </div>

        {/* UploadCVPopup */}
        <UploadCVPopup
          show={showCVPopup}
          onClose={() => setShowCVPopup(false)}
        />
      </div>
    </div>
  );
};

export default JobPopup;
