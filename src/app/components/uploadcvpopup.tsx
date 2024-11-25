"use client";
import React, { useState } from "react";

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
          <h2 className="text-lg font-bold text-gray-700">Upload CV</h2>
          <button
            onClick={onClose}
            className="text-red-500 text-xl font-bold hover:text-red-700"
          >
            Close
          </button>
        </div>

        {/* Upload Section */}
        <div className="flex items-center border rounded-md p-4 mb-6 bg-gray-100">
          <label
            htmlFor="cv-upload"
            className="px-6 py-2 bg-gray-300 text-gray-700 font-bold rounded-full cursor-pointer hover:bg-gray-400"
          >
            Upload
          </label>
          <input
            type="file"
            id="cv-upload"
            className="hidden"
            onChange={handleFileUpload}
          />
          <span className="ml-4 text-gray-500">
            {cvFile ? cvFile.name : "Upload CV"}
          </span>
        </div>

        {/* Description Box */}
        <div className="flex flex-col mb-6">
          <label
            htmlFor="description"
            className="text-gray-700 font-bold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded-md p-3 resize-none bg-gray-50 text-gray-800"
            style={{ height: "200px" }}
            placeholder="Add a brief description..."
          ></textarea>
        </div>

        {/* Apply Now Button */}
        <div className="text-center">
          <button
            onClick={() => alert("CV Submitted Successfully!")}
            className="px-8 py-3 bg-gradient-to-r from-red-600 to-yellow-500 text-white font-bold rounded-full hover:opacity-90 shadow-lg"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadCVPopup;
