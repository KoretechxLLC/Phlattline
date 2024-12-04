import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";
import { Avatar, AvatarImage } from "@/app/components/avatar";
import { Button } from "./button-sidebar";

import { AnimatePresence, motion } from "framer-motion";
import { MdAccessTime, MdDateRange, MdOutlineTextFields } from "react-icons/md";
import DatePicker from "react-datepicker";
import Spinner from "./Spinner";

const InterviewSchedulerTab: React.FC = () => {
  // Static array of interview data
  const interviewData = [
    {
      image: "/assets/DummyImg.png",
      name: "John Doe",
      designation: "Software Engineer",
      interviewStatus: "Scheduled",
    },
    {
      image: "/assets/DummyImg.png",
      name: "Jane Smith",
      designation: "Product Manager",
      interviewStatus: "Scheduled",
    },
    {
      image: "/assets/DummyImg.png",
      name: "Alice Johnson",
      designation: "UI/UX Designer",
      interviewStatus: "Schedule",
    },
  ];

  // State to manage modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle opening the modal when "Schedule Interview" button is clicked
  const handleScheduleClick = () => {
    setIsModalOpen(true); // Open the modal
  };

  return (
    <div className="flex flex-col items-center">
      {/* Centered Heading */}
      <Card className="border border-[#62626280] rounded-xl w-full max-w-3xl">
        <CardHeader>
          <h2 className="text-2xl items-center font-semibold mb-3">
            Latest Updates
          </h2>
          {/* Label Bar for Columns */}
          <div className="flex justify-between px-8 py-3 text-white bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80] text-sm font-medium">
            <span>Name</span>
            <span>Designation</span>
            <span>Action</span>
          </div>
        </CardHeader>
        <ul>
          {interviewData.map((interview, index) => (
            <li
              key={index}
              className={`${
                index < interviewData.length - 1
                  ? "border-b border-gray-300"
                  : ""
              }`}
            >
              <CardContent className="flex items-center justify-between px-8 py-8 space-x-2">
                {/* Name and Avatar */}
                <div className="flex items-center space-x-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={interview.image}
                      alt={`${interview.name}-avatar`}
                      className="w-10 h-10"
                    />
                  </Avatar>
                  <span className="font-semibold text-sm">
                    {interview.name}
                  </span>
                </div>

                {/* Designation */}
                <div className="text-center text-sm text-yellow-400">
                  {interview.designation}
                </div>

                {/* Status Button with Conditional Color and Disabled State */}
                <div>
                  <Button
                    color={
                      interview.interviewStatus === "Scheduled"
                        ? "primary"
                        : "secondary"
                    }
                    className="rounded-3xl"
                    onClick={
                      interview.interviewStatus !== "Scheduled"
                        ? handleScheduleClick
                        : undefined
                    } // Prevent modal opening if scheduled
                    disabled={interview.interviewStatus === "Scheduled"} // Disable button if scheduled
                  >
                    {interview.interviewStatus}
                  </Button>
                </div>
              </CardContent>
            </li>
          ))}
        </ul>
      </Card>

      {/* Pass the modal state to the SpringModal */}
      <SpringModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  );
};

const SpringModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const [matter, setMatter] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const handleContinue = () => {
    setLoading(true);

    if (!matter || !date || !time) {
      setNotification("Please fill in all fields.");
      setLoading(false);
      return;
    }

    // Handle successful scheduling (you can replace this with your actual scheduling logic)
    setLoading(false);
    setIsOpen(false);
    setNotification("Interview scheduled successfully!");
  };

  useEffect(() => {
    // Clear notification after 3 seconds
    const timeout = setTimeout(() => {
      setNotification(null);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [notification]);

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
            {notification && (
              <div className="text-center text-red-500 my-4">
                {notification}
              </div>
            )}
            <div className="p-5 rounded-xl my-6">
              <div className="my-4 flex items-center gap-2">
                <MdOutlineTextFields className="text-gray-500 text-2xl" />
                <textarea
                  value={matter}
                  onChange={(e) => setMatter(e.target.value)}
                  placeholder="Matter"
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
                      const selectedTime = selectedDate.toLocaleTimeString(
                        "en-GB",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      );
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

export default InterviewSchedulerTab;
