import { useEffect, useState, useRef } from "react";
import StackedNotifications from "./Stackednotification";
import localforage from "localforage";

export type NotificationType = {
  id: number;
  text: string;
  type: "error" | "success";
};

const TimeManagement = () => {
  const [clockedIn, setClockedIn] = useState(false);
  const [onBreak, setOnBreak] = useState(false); // New state for break
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );
  const [showTime, setShowTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const savedElapsedTimeRef = useRef<number>(0); // Keeps track of elapsed time when taking a break

  const handleClockIn = async () => {
    const startTime = Date.now();
    setClockedIn(true);
    setOnBreak(false); // Ensure break state is reset
    await localforage.setItem("clockedIn", true);
    await localforage.setItem("startTime", startTime);
    startTimer(startTime);
  };

  const handleClockOut = async () => {
    setClockedIn(false);
    setOnBreak(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setShowTime({ hours: 0, minutes: 0, seconds: 0 });
    savedElapsedTimeRef.current = 0; // Reset elapsed time
    await localforage.setItem("clockedIn", false);
    await localforage.removeItem("startTime");
    await localforage.setItem("performanceTimer", showTime);
  };

  const handleTakeBreak = async () => {
    setOnBreak(true);
    savedElapsedTimeRef.current +=
      Date.now() - ((await localforage.getItem("startTime")) as number); // Save the elapsed time so far
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleResumeWork = () => {
    setOnBreak(false);
    const resumeStartTime = Date.now() - savedElapsedTimeRef.current; // Calculate new start time
    localforage.setItem("startTime", resumeStartTime); // Update start time
    startTimer(resumeStartTime);
  };

  const startTimer = (startTime: number) => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      const elapsedMilliseconds = Date.now() - startTime;
      const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
      const newHours = Math.floor(elapsedSeconds / 3600);
      const newMinutes = Math.floor((elapsedSeconds % 3600) / 60);
      const newSeconds = elapsedSeconds % 60;

      setShowTime({
        hours: newHours,
        minutes: newMinutes,
        seconds: newSeconds,
      });
    }, 1000);
  };

  useEffect(() => {
    const loadData = async () => {
      const storedClockedIn = await localforage.getItem("clockedIn");
      const storedStartTime = await localforage.getItem("startTime");

      if (storedClockedIn) {
        setClockedIn(storedClockedIn as boolean);
        if (storedStartTime) {
          const startTime = storedStartTime as number;
          startTimer(startTime); // Start timer using stored start time
        }
      }
    };

    loadData();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
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
        <div className="rounded-b-lg shadow-lg p-16 text-center border border-[#62626280]">
          <div className="text-5xl text-white font-mono mb-6">
            {`${showTime.hours}h : ${showTime.minutes}m : ${showTime.seconds}s`}
          </div>
          <div className="pt-2">
            {clockedIn && (
              <button
                onClick={onBreak ? handleResumeWork : handleTakeBreak}
                className="px-8 py-2 mr-4 bg-gradient-to-r from-orange-400 to-red-600 text-white rounded-full shadow-md hover:from-orange-500 hover:to-red-700 transition-colors"
              >
                {onBreak ? "Resume Work" : "Take Break"}
              </button>
            )}
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
