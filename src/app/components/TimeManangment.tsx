import { useState } from "react";

const TimeManagement = () => {
  const [clockedIn, setClockedIn] = useState(false);
  const [time, setTime] = useState("00:00:00");

  const handleClockIn = () => {
    setClockedIn(true);
    // Logic to update the time can be added here.
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="w-[90%]">
        <div className="bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] rounded-t-2xl text-center h-14 flex justify-center items-center w-full">
          <h2 className="text-white text-lg ">Time Management</h2>
        </div>
        <div className="rounded-b-lg shadow-lg p-16 text-center border border-[#62626280] ">
          <div className="text-5xl text-white font-mono mb-6">{time}</div>
          <div className="pt-2">
            <button
              onClick={handleClockIn}
              className="px-8 py-2 bg-gradient-to-r from-orange-400 to-red-600 text-white rounded-full shadow-md hover:from-orange-500 hover:to-red-700 transition-colors"
            >
              {clockedIn ? "Clocked In" : "Clock In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeManagement;
