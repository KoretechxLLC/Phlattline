"use client";

import React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdDateRange } from "react-icons/md";

const DateRangeToolbar = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <div className="flex flex-row space-x-4 p-4 bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] rounded-md shadow-md">
      {/* From Date Picker */}
      <div className="flex flex-col">
        <label htmlFor="fromDate" className="text-sm font-medium text-white">
          From
        </label>
        <DatePicker
          id="fromDate"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="yyyy-MM-dd"
          minDate={new Date()} // Prevent past dates
          className="mt-1 block w-full p-2  text-white  rounded-md bg-black shadow-sm focus:outline-none focus:ring-1 focus:ring-white"
          placeholderText="Select start date"
        />
      </div>

      {/* To Date Picker */}
      <div className="flex flex-col">
        <label htmlFor="toDate" className="text-sm font-medium text-white">
          To
        </label>
        <DatePicker
          id="toDate"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="yyyy-MM-dd"
          minDate={startDate || new Date()}
          className="mt-1 block w-full p-2  text-white  rounded-md bg-black shadow-sm focus:outline-none focus:ring-1 focus:ring-white"
          placeholderText="Select end date"
        />
      </div>

      {/* Department Dropdown */}
      <div className="flex flex-col">
        <label htmlFor="department" className="text-sm font-medium text-white">
          Department
        </label>
        <select
          id="department"
          name="department"
          className="mt-2 block w-full px-2 py-2   text-white  rounded-md bg-black shadow-sm focus:outline-none focus:ring-1 focus:ring-white"
        >
          <option value="">Select Department</option>
          <option value="Operations">Operations</option>
          <option value="Sales">Sales</option>
          <option value="Finance">Finance</option>
          <option value="IT">IT</option>
        </select>
      </div>
    </div>
  );
};

export default DateRangeToolbar;
