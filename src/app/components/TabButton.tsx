"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Button } from "./button-sidebar";
import DatePicker from "react-datepicker";
import { MdOutlineTextFields, MdDateRange, MdAccessTime } from "react-icons/md";
import "react-datepicker/dist/react-datepicker.css";
import Spinner from "./Spinner"; // Import your Spinner component

interface TabButtonProps {
  backgroundColor: string;
  text: string;
  imageSrc: string;
  textColor: string;
  arrowImageSrc: string;
  showModalOnClick: boolean;
  isClickable: boolean;
  redirectTo?: string; // New prop for redirect URL
}

const TabButton: React.FC<TabButtonProps> = ({
  backgroundColor,
  text,
  imageSrc,
  textColor,
  arrowImageSrc,
  showModalOnClick,
  isClickable,
  redirectTo, // Destructure new prop
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    if (redirectTo) {
      router.push(redirectTo); // Redirect if URL is provided
    } else if (showModalOnClick) {
      setIsOpen(true); // Open modal if showModalOnClick is true
    }
  };

  return (
    <div>
      <div
        className={`w-full 4xl:py-2 lg:py-3 rounded-lg flex items-center justify-between ${
          isClickable ? "cursor-pointer" : ""
        }`}
        style={{ backgroundColor }}
        onClick={handleButtonClick}
      >
        <div className="flex items-center">
          <Image
            width={25}
            height={25}
            src={imageSrc}
            alt=""
            className="mx-5"
          />
          <span
            className="4xl:text-sm lg:text-xl mx-1"
            style={{ color: textColor }}
          >
            {text}
          </span>
        </div>
        <Image
          width={100}
          height={100}
          src={arrowImageSrc}
          alt=""
          className="w-5 h-5 mx-5"
        />
      </div>

      {showModalOnClick && !redirectTo && (
        <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
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
  const [loading, setLoading] = useState(false); // New loading state

  const handleContinue = async () => {
    setLoading(true); // Start loading
    // Simulate a network request
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a 2-second delay
    setLoading(false); // End loading
    setIsOpen(false); // Close modal after request
  };

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
            className="bg-white p-16 rounded-xl w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <div className="relative z-10 p-5 rounded-xl my-6">
              {/* Input Field with Icon */}
              <div className="flex items-center gap-2 mb-4">
                <MdOutlineTextFields className="text-gray-500 text-2xl" />
                <input
                  type="text"
                  value={matter}
                  onChange={(e) => setMatter(e.target.value)}
                  placeholder="Matter"
                  className="w-full p-2 rounded-md border text-gray-600 border-gray-300 placeholder-gray-400 focus:outline-none"
                />
              </div>

              {/* Date Picker with Icon in a Single Row */}
              <div className="my-4 flex items-center gap-2 mb-4 ">
                <MdDateRange className="text-gray-500 text-2xl" />
                <div className="w-full border border-gray-300">
                  <DatePicker
                    selected={date}
                    onChange={(date) => setDate(date)}
                    placeholderText="Select a date"
                    className="w-full p-2 text-gray-600 placeholder-gray-400 rounded-md focus:outline-none"
                  />
                </div>
              </div>

              {/* Time Picker with Icon in a Single Row */}
              <div className="my-4 flex items-center gap-2 mb-4 ">
                <MdAccessTime className="text-gray-500 text-2xl" />
                <div className="border w-full border-gray-300">
                  <DatePicker
                    selected={date}
                    onChange={(date) => setDate(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeFormat="HH:mm"
                    timeIntervals={60}
                    placeholderText="Select time"
                    dateFormat="HH:mm"
                    className="w-full p-2 text-gray-600 placeholder-gray-400 rounded-md focus:outline-none"
                    calendarClassName="z-50"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                color="primary"
                className="text-white px-5 text-sm md:text-base lg:text-base flex w-full h-12 justify-center items-center rounded-3xl"
                onClick={handleContinue}
                disabled={loading} // Disable button while loading
              >
                {loading ? (
                  <Spinner /> // Display spinner while loading
                ) : (
                  "Send Request"
                )}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TabButton;
