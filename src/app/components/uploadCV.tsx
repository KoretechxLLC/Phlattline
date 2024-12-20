"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./button-sidebar";
import { resetError, submitJobApplication } from "../../redux/slices/jobApplication.slice";
import StackedNotifications, { NotificationType } from "./Stackednotification";
import { RootState } from "@/redux/store";

const UploadCVPopup = ({
  show,
  onClose,
  userId,
  talentId,
}: {
  show: boolean;
  onClose: () => void;
  userId: number; 
  talentId: number; 
}) => {
  const dispatch = useDispatch<any>();
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [description, setDescription] = useState<string>("");
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );
  const { submittedApplication, submittedApplicationLoader, submittedApplicationError, submittedApplicationSuccess } = useSelector((state: RootState) => state.jobapplication);
  const [loading, setLoading] = useState(false);
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!cvFile || !description) {
      setNotification({
        id: Date.now(),
        text: "Please upload a CV and provide a description.",
        type: "error",
      });
      dispatch(resetError());
      return;
    }

    const formData = new FormData();
    formData.append("file", cvFile);
    formData.append("message", description);
    formData.append("user_id", userId.toString());
    formData.append("talent_id", talentId.toString());
    setLoading(true);
    dispatch(submitJobApplication(formData))
      .unwrap()
      .then(() => {
        setNotification({
          id: Date.now(),
          text: "CV submitted successfully!",
          type: "success",
        });
        setCvFile(null);
        setDescription("");
        setTimeout(() => {
          onClose();
        }, 1000); // Adjust timeout duration as needed
      })
      .catch((error: string) => {
        setNotification({
          id: Date.now(),
          text: `Error: ${error}`,
          type: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <StackedNotifications
        notification={notification}
        setNotification={setNotification}
      />
      <div
        className="bg-white rounded-lg shadow-lg p-6"
        style={{ width: "760px", height: "546px" }}
      >
        {/* Popup Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-black">Upload CV</h2>
          <button
            onClick={onClose}
            className="text-red-500 text-4xl font-bold hover:text-red-700"
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
          <label htmlFor="description" className="text-black font-bold mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded-md p-3 resize-none bg-white text-black"
            style={{ height: "200px" }}
            placeholder="Add a brief description..."
          ></textarea>
        </div>

        {/* Apply Now Button */}
        <div className="text-center">
          <Button
            onClick={handleSubmit}
            color="primary"
            className="rounded-3xl"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Apply Now"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadCVPopup;
