"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "./button-sidebar";
import DatePicker from "react-datepicker";
import { MdOutlineTextFields, MdDateRange, MdAccessTime } from "react-icons/md";
import "react-datepicker/dist/react-datepicker.css";
import Spinner from "./Spinner"; // Import your Spinner component
import { useDispatch, useSelector } from "react-redux";
import { createTrainingOnDemand } from "@/redux/slices/traningdemand.slice";
import { RootState } from "@/redux/store";
import StackedNotifications from "./Stackednotification";
import EmployeeModal from "./employeeModal";

interface TabButtonProps {
  backgroundColor: string;
  text: string;
  imageSrc: string;
  textColor: string;
  arrowImageSrc: string;
  showModalOnClick: boolean;
  isClickable: boolean;
  redirectTo?: string;
  modalType?: "spring" | "employee"; // New prop to decide modal type
}

const TabButton: React.FC<TabButtonProps> = ({
  backgroundColor,
  text,
  imageSrc,
  textColor,
  arrowImageSrc,
  showModalOnClick,
  isClickable,
  redirectTo,
  modalType = "spring", // Default to "spring"
}) => {
  const router = useRouter();
  const [isSpringModalOpen, setIsSpringModalOpen] = useState(false);
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);

  const handleButtonClick = () => {
    if (redirectTo) {
      router.push(redirectTo); // Redirect if URL is provided
    } else if (showModalOnClick) {
      if (modalType === "spring") {
        setIsSpringModalOpen(true);
      } else if (modalType === "employee") {
        setIsEmployeeModalOpen(true);
      }
    }
  };

  const handleCloseEmployeeModal = () => {
    setIsEmployeeModalOpen(false);
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

      {/* Conditionally render modals */}
      <SpringModal
        isOpen={isSpringModalOpen}
        setIsOpen={setIsSpringModalOpen}
      />
      <EmployeeModal
        open={isEmployeeModalOpen}
        onClose={handleCloseEmployeeModal}
      />
    </div>
  );
};

export type NotificationType = {
  id: number;
  text: string;
  type: "error" | "success";
};

const SpringModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const dispatch: any = useDispatch();
  const { userData } = useSelector((state: RootState) => state.auth);
  const userId = userData?.id;
  const { success, error } = useSelector(
    (state: RootState) => state.trainingOnDemand
  );
  const [matter, setMatter] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );

  const handleContinue = async () => {
    setLoading(true);

    if (!matter || !date || !time) {
      setNotification({
        id: Date.now(),
        text: "Please fill in all fields.",
        type: "error",
      });
      setLoading(false);
      return;
    }

    const formattedDate = date.toISOString().split("T")[0];
    const data = {
      user_Id: userId,
      matter_name: matter,
      select_date: formattedDate,
      select_time: time,
    };

    try {
      await dispatch(createTrainingOnDemand(data));
      setLoading(false);
      setIsOpen(false);
    } catch (error) {
      setNotification({
        id: Date.now(),
        text: "Training request failed.",
        type: "error",
      });
      setLoading(false);
    }
  };

  // Handle notifications based on Redux state changes
  useEffect(() => {
    if (success) {
      setNotification({
        id: Date.now(),
        text: success,
        type: "success",
      });
    }
    if (error) {
      setNotification({
        id: Date.now(),
        text: error,
        type: "error",
      });
    }

    // Clear the notification after 3 seconds
    const timeout = setTimeout(() => {
      setNotification(null);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [success, error]);

  return (
    <AnimatePresence>
      {notification && (
        <StackedNotifications
          notification={notification}
          setNotification={setNotification}
        />
      )}

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
              Training-On Demand
            </h1>
            <div className="p-5 rounded-xl my-6">
              <div className="my-4 flex items-center gap-2">
                <MdOutlineTextFields className="text-gray-500 text-2xl" />
                <input
                  type="text"
                  value={matter}
                  onChange={(e) => setMatter(e.target.value)}
                  placeholder="Matter"
                  className="w-full p-2 rounded-md border text-gray-600 border-gray-300 placeholder-gray-400"
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
              {loading ? <Spinner /> : "Send Request"}
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TabButton;
