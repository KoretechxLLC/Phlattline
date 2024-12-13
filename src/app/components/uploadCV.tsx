"use client";
import React, { useState } from "react";
import { Button } from "./button-sidebar";

const UploadCVPopup = ({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) => {
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [description, setDescription] = useState<string>("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-white rounded-lg shadow-lg p-6"
        style={{ width: "760px", height: "546px" }}
      >
        {/* Popup Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-white">Upload CV</h2>
          <button
            onClick={onClose}
            className="text-red-500 text-xl font-bold hover:text-red-700"
          >
            ×
          </button>
        </div>

        {/* Upload Section */}
        <div className="flex items-center border rounded-md p-4 mb-6 bg-white">
          <label
            htmlFor="cv-upload"
            className="px-6 py-2 bg-gray-700 text-white font-bold rounded-full cursor-pointer hover:bg-gray-400"
          >
            Upload
          </label>
          <input
            type="file"
            id="cv-upload"
            className="hidden"
            onChange={handleFileUpload}
          />
          <span className="ml-4 text-black">
            {cvFile ? cvFile.name : "Upload CV"}
          </span>
        </div>

        {/* Description Box */}
        <div className="flex flex-col mb-6">
          <label htmlFor="description" className="text-white font-bold mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded-md p-3 resize-none bg-white text-white"
            style={{ height: "200px" }}
            placeholder="Add a brief description..."
          ></textarea>
        </div>

        {/* Apply Now Button */}
        <div className="text-center">
          <Button
            onClick={() => alert("CV Submitted Successfully!")}
            color="primary"
            className="rounded-3xl"
          >
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadCVPopup;
