import { useEffect, useState, useRef } from "react";
import StackedNotifications from "./Stackednotification";

export type NotificationType = {
  id: number;
  text: string;
  type: "error" | "success";
};

const TimeManagement = () => {
  const [clockedIn, setClockedIn] = useState(false);
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );
  const [showTime, setShowTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null); // Use a ref to store the interval ID

  const handleClockIn = () => {
    setClockedIn(true);
    startTimer(); // Start the timer when clocked in
  };

  const handleClockOut = () => {
    setClockedIn(false);
    clearInterval(intervalRef.current!); // Clear the interval
    intervalRef.current = null; // Reset the interval ref
  };

  const startTimer = () => {
    if (intervalRef.current) return; // Prevent multiple intervals
    intervalRef.current = setInterval(() => {
      setShowTime((prev) => {
        const newSeconds = prev.seconds + 1;
        const newMinutes = newSeconds >= 60 ? prev.minutes + 1 : prev.minutes;
        const newHours = newMinutes >= 60 ? prev.hours + 1 : prev.hours;

        return {
          hours: newHours,
          minutes: newMinutes % 60,
          seconds: newSeconds % 60,
        };
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="flex items-center justify-center">
      <StackedNotifications
        notification={notification}
        setNotification={setNotification}
      />
      <div className="w-[90%]">
        <div className="bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] rounded-t-2xl text-center h-14 flex justify-center items-center w-full">
          <h2 className="text-white text-lg">Time Management</h2>
        </div>
        <div className="rounded-b-lg shadow-lg p-16 text-center border border-[#62626280] ">
          <div className="text-5xl text-white font-mono mb-6">
            {`${showTime.hours}h : ${showTime.minutes}m : ${showTime.seconds}s`}
          </div>
          <div className="pt-2">
            <button
              onClick={clockedIn ? handleClockOut : handleClockIn}
              className="px-8 py-2 bg-gradient-to-r from-orange-400 to-red-600 text-white rounded-full shadow-md hover:from-orange-500 hover:to-red-700 transition-colors"
            >
              {clockedIn ? "Clock Out" : "Clock In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeManagement;
