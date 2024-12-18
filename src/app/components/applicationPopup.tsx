"use client";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MdAccessTime, MdDateRange, MdOutlineTextFields } from "react-icons/md";
import DatePicker from "react-datepicker";
import { Button } from "./button-sidebar";
import Spinner from "@/app/components/Spinner"; // Assuming this is where the Spinner component is imported
import { BsCloudDownload } from "react-icons/bs"; // Importing a cloud download icon
import Icon from "@/app/components/utility-icon"; // Importing utility Icon component
import { Avatar, AvatarImage } from "./avatar";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobApplications, scheduleInterview } from "@/redux/slices/jobapplication.slice";
import { RootState } from "@/redux/store";
import StackedNotifications, { NotificationType } from "./Stackednotification";

const ApplicationPopup = ({
  show,
  onClose,
  employee,
}: {
  show: boolean;
  onClose: () => void;
  employee: {
    name: string;
    designation: string;
    message: string;
    cvLink: string;
    profileImage: string;
    applicationid: number;
    employeeid: number;
  };

}) => {
  const [loading, setLoading] = useState(true); // Loading state to show the loader initially
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState<NotificationType | null>(null);

  // Simulate loading of employee data with a timeout (replace with actual data fetching logic)
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
      <StackedNotifications notification={notification} setNotification={setNotification} />
      <div className="bg-white rounded-xl shadow-lg p-8 w-[90%] max-w-6xl">
        {/* Popup Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-black">Employee Details</h2>
          <button
            onClick={onClose}
            className="text-red-600 text-6xl font-extrabold hover:text-red-800"
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
          <div>
            {/* Employee Details */}
            <div className="flex items-center space-x-4 py-10">
              <Avatar className="w-14 h-14 ">
                <AvatarImage
                  src={employee.profileImage
                    ? `/api/images?filename=${employee.profileImage}&folder=profileImage`
                    : "/assets/DummyImg.png"
                  }
                  alt="avatar"
                  className="w-14 h-14 "
                />

              </Avatar>
              <div>
                <span className="font-semibold text-black text-sm block uppercase">
                  {employee.name}
                </span>
                <span className="font-semibold text-xs text-red-600 block mt-1">
                  {employee.designation}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <textarea
                placeholder="Matter"
                value={employee.message}
                readOnly
                className="w-full p-10 rounded-md border bg-white text-black border-gray-300 placeholder-gray-400 resize-none"
              />
            </div>

            {/* CV Attachment */}
            <a
              href={`/api/images?filename=${employee.cvLink}&folder=cvFiles`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="mt-6 flex items-center justify-between border p-4 border-[#62626280] bg-white rounded-2xl">
                <Icon icon="vscode-icons:file-type-pdf2" className="w-8 h-8" />
                <span className="text-black text-sm font-semibold">
                  View Attached CV
                </span>
                <BsCloudDownload className="w-8 h-8 text-black" />
              </div>
            </a>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center">
          <Button
            onClick={() => setIsModalOpen(true)}
            color="primary"
            className="rounded-3xl"
          >
            Schedule Interview
          </Button>
        </div>
      </div>
      <SpringModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} employeeid={employee.employeeid} applicationid={employee.applicationid} setNotification={setNotification} />
    </div>
  );
};
export default ApplicationPopup;

const SpringModal = ({
  isOpen,
  setIsOpen,
  applicationid,
  employeeid,
  setNotification,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  applicationid: number;
  employeeid: number;
  setNotification: (notification: NotificationType | null) => void;
}) => {
  const dispatch = useDispatch<any>();
  const [matter, setMatter] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { userData } = useSelector((state: RootState) => state.auth);
  const organizationId = userData?.organization_id;

  const handleContinue = () => {
    setLoading(true);
  
    if (!matter || !date || !time) {
      setNotification({
        id: Date.now(),
        text: "All fields are required.",
        type: "error",
      });
      setLoading(false);
      return;
    }
  
    const interviewData = {
      organization_id: organizationId, // Replace with actual org ID
      application_id: applicationid, // Pass the employeeId or application_id
      interview_date: date?.toISOString().split("T")[0] || "", // Format to YYYY-MM-DD
      interview_time: time || "",
      candidate_id: employeeid, // Replace with actual candidate ID
      message: matter,
    };
  
    // Dispatch the schedule interview action
    dispatch(scheduleInterview(interviewData))
      .unwrap() // Use `.unwrap()` to handle the success and error properly
      .then(() => {
        setNotification({
          id: Date.now(),
          text: "Interview scheduled successfully!",
          type: "success",
        });
  
        // Fetch updated job applications after scheduling the interview
        return dispatch(fetchJobApplications({ organizationId })).unwrap();
      })
      .then(() => {
        setLoading(false);
        setIsOpen(false); // Close modal
      })
      .catch((error: string) => {
        setLoading(false);
  
        // Check for specific error message
        if (error === "Interview already scheduled!") {
          setNotification({
            id: Date.now(),
            text: "Interview already scheduled!",
            type: "error",
          });
          setIsOpen(false); // Close modal
        } else {
          setNotification({
            id: Date.now(),
            text: error || "Failed to schedule interview.",
            type: "error",
          });
        }
      });
  };
  

  useEffect(() => {
    // Clear notification after 3 seconds
    const timeout = setTimeout(() => {
      setNotification(null);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [setNotification]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-10 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-10 rounded-xl w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <h1 className="text-center text-3xl font-bold text-[#B51533] -mb-[1em]">
              Schedule Interview
            </h1>

            <div className="p-5 rounded-xl my-6">
              <div className="my-4 flex items-center gap-2">
                <MdOutlineTextFields className="text-gray-500 text-2xl" />
                <textarea
                  value={matter}
                  onChange={(e) => setMatter(e.target.value)}
                  placeholder="Message"
                  className="w-full p-2 rounded-md border text-gray-600 border-gray-300 placeholder-gray-400 resize-none"
                />
              </div>
              <div className="my-4 flex items-center gap-2">
                <MdDateRange className="text-gray-500 text-2xl" />
                <DatePicker
                  selected={date}
                  onChange={(date) => setDate(date)}
                  placeholderText="Select Date"
                  minDate={new Date()}
                  className="w-full p-2 text-gray-600 rounded-md border border-gray-300"
                  dateFormat="yyyy-MM-dd"
                />
              </div>
              <div className="my-4 flex items-center gap-2">
                <MdAccessTime className="text-gray-500 text-2xl" />
                <DatePicker
                  selected={date}
                  onChange={(selectedDate) => {
                    if (selectedDate) {
                      setDate(selectedDate);
                      const selectedTime = selectedDate.toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                      });
                      setTime(selectedTime);
                    }
                  }}
                  showTimeSelect
                  showTimeSelectOnly
                  timeFormat="HH:mm"
                  timeIntervals={60}
                  placeholderText="Select Time"
                  dateFormat="HH:mm"
                  className="w-full p-2 text-gray-600 rounded-md border border-gray-300"
                />
              </div>
            </div>

            <Button
              color="primary"
              className="text-white px-5 text-sm md:text-base flex w-full h-12 justify-center items-center rounded-3xl"
              onClick={handleContinue}
              disabled={loading}
            >
              {loading ? "Scheduling..." : "Schedule Interview"}
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
