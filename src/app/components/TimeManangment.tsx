import { useEffect, useState, useRef } from "react";
import StackedNotifications from "./Stackednotification";
import localforage from "localforage";
import { useDispatch, useSelector } from "react-redux";
import { updateTimemanagement } from "@/redux/slices/performanceManagement.slice";
import { RootState } from "@/redux/store";

export type NotificationType = {
  id: number;
  text: string;
  type: "error" | "success";
};

const TimeManagement = () => {
  const [clockedIn, setClockedIn] = useState(false);
  const dispatch: any = useDispatch();
  const { userData } = useSelector((state: RootState) => state.auth);
  const userId: any = userData?.id;
  const [onBreak, setOnBreak] = useState(false);
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );
  const [showTime, setShowTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const savedElapsedTimeRef = useRef<number>(0);

  const handleClockIn = async () => {
    const startTime = Date.now();
    setClockedIn(true);
    setOnBreak(false);
    savedElapsedTimeRef.current = 0; // Reset saved elapsed time
    await localforage.setItem("clockedIn", true);
    await localforage.setItem("startTime", startTime);
    await localforage.setItem("onBreak", false); // Save onBreak state
    await localforage.removeItem("savedElapsedTime"); // Clear saved elapsed time
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
    savedElapsedTimeRef.current = 0;

    const clockOutTime = Date.now();
    const clockInTimeTimestamp = await localforage.getItem("startTime");

    if (typeof clockInTimeTimestamp !== "number") {
      console.error("Invalid clock in time.");
      return;
    }

    const timeSpentInSeconds = Math.floor((clockOutTime - clockInTimeTimestamp) / 1000);

    const timeData = {
      user_id: userData.id,
      timeSpent: timeSpentInSeconds,
    };

    await dispatch(updateTimemanagement(timeData));
    await localforage.setItem("clockedIn", false);
    await localforage.removeItem("startTime");
    await localforage.removeItem("savedElapsedTime");
    await localforage.setItem("onBreak", false); // Reset onBreak state
  };

  const handleTakeBreak = async () => {
    setOnBreak(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    const elapsedTime = Date.now() - Number(await localforage.getItem("startTime"));
    savedElapsedTimeRef.current = elapsedTime;
    await localforage.setItem("savedElapsedTime", elapsedTime);
    await localforage.setItem("onBreak", true); // Save onBreak state
  };

  const handleResumeWork = async () => {
    setOnBreak(false);

    const savedElapsedTime = (await localforage.getItem("savedElapsedTime")) as number;
    const resumeStartTime = Date.now() - savedElapsedTime;
    await localforage.setItem("startTime", resumeStartTime);
    await localforage.setItem("onBreak", false); // Save onBreak state
    await localforage.removeItem("savedElapsedTime"); // Clear saved elapsed time

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
      const savedElapsedTime = (await localforage.getItem("savedElapsedTime")) as number;
      const storedOnBreak = await localforage.getItem("onBreak");

      if (storedClockedIn) {
        setClockedIn(storedClockedIn as boolean);
        setOnBreak(storedOnBreak as boolean);

        if (storedStartTime) {
          const startTime = storedStartTime as number;
          let totalElapsedTime = Date.now() - startTime;

          // If the user is on a break, use the saved elapsed time and do not start the timer
          if (storedOnBreak) {
            totalElapsedTime = savedElapsedTime || 0;
          }

          const elapsedSeconds = Math.floor(totalElapsedTime / 1000);
          const hours = Math.floor(elapsedSeconds / 3600);
          const minutes = Math.floor((elapsedSeconds % 3600) / 60);
          const seconds = elapsedSeconds % 60;

          setShowTime({ hours, minutes, seconds });

          // Only start the timer if not on a break
          if (!storedOnBreak) {
            startTimer(Date.now() - totalElapsedTime);
          }
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
