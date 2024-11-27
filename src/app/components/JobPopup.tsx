"use client";
import React, { useState } from "react";
import UploadCVPopup from "./uploadCV";
import { Button } from "./button-sidebar";

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

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-[90%] max-w-6xl">
        {/* Popup Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-black">{jobTitle}</h2>
          <button
            onClick={onClose}
            className="text-red-600 text-3xl font-extrabold hover:text-red-800"
          >
            ×
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-2 gap-8">
          {/* Left Section */}
          <div>
            {/* Job Summary */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-red-600 mb-3">
                Job Summary:
              </h3>
              <p className="text-gray-800 leading-7">
                As an Administrative Assistant, you will play a vital role in
                supporting the daily operations of our organization. You will
                work closely with department heads, provide essential support to
                team members, and ensure that all administrative tasks are
                managed efficiently. This position requires strong
                organizational skills, attention to detail, and the ability to
                handle multiple tasks simultaneously.
              </p>
            </div>

            {/* Qualifications */}
            <div>
              <h3 className="text-xl font-bold text-red-600 mb-3">
                Qualifications:
              </h3>
              <ul className="list-disc pl-6 text-gray-800 leading-7">
                <li>
                  <strong>Education:</strong> High school diploma or equivalent;
                  Associate’s or Bachelor’s degree preferred.
                </li>
                <li>
                  <strong>Experience:</strong> Minimum of 1–2 years in an
                  administrative role or similar.
                </li>
                <li>
                  <strong>Technical Skills:</strong> Proficiency in Microsoft
                  Office Suite (Word, Excel, PowerPoint, Outlook) and
                  familiarity with scheduling software.
                </li>
                <li>
                  <strong>Communication Skills:</strong> Excellent verbal and
                  written communication skills.
                </li>
                <li>
                  <strong>Organizational Skills:</strong> Strong ability to
                  multitask, prioritize tasks, and manage time effectively.
                </li>
                <li>
                  <strong>Attention to Detail:</strong> Accuracy and consistency
                  in managing data, documentation, and correspondence.
                </li>
              </ul>
            </div>
          </div>

          {/* Right Section */}
          <div>
            {/* Key Responsibilities */}
            <h3 className="text-xl font-bold text-red-600 mb-3">
              Key Responsibilities:
            </h3>
            <ul className="list-disc pl-6 text-gray-800 leading-7">
              <li>
                <strong>Administrative Support:</strong> Provide general support
                to the management and other team members, including handling
                phone calls, emails, and scheduling appointments.
              </li>
              <li>
                <strong>Documentation:</strong> Prepare and edit documents,
                reports, and presentations, ensuring accuracy and adherence to
                company standards.
              </li>
              <li>
                <strong>Data Entry:</strong> Maintain databases and spreadsheets
                with up-to-date and accurate information.
              </li>
              <li>
                <strong>Scheduling:</strong> Manage calendars, coordinate
                meetings, and arrange travel itineraries for staff.
              </li>
              <li>
                <strong>Office Management:</strong> Oversee office supplies and
                equipment, ensuring a well-organized, functional work
                environment.
              </li>
              <li>
                <strong>Communication:</strong> Act as a point of contact for
                both internal and external parties, relaying messages and
                providing necessary information.
              </li>
              <li>
                <strong>Project Assistance:</strong> Assist in planning and
                executing various projects as required.
              </li>
              <li>
                <strong>File Management:</strong> Organize and maintain files
                and records, ensuring easy retrieval and security of sensitive
                information.
              </li>
            </ul>
          </div>
        </div>

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
