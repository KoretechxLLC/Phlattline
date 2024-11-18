"use client";
import React from "react";

const GapToolbar = () => {
  return (
    <div className="flex flex-row space-x-4 p-4 bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] rounded-md shadow-md">
      {/* GAP TYPE Dropdown */}
      <div className="flex flex-col">
        <label htmlFor="gapType" className="text-sm font-medium text-white">
          GAP TYPE
        </label>
        <select
          id="gapType"
          name="gapType"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="">Select Gap Type</option>
          {/* Add your options here */}
        </select>
      </div>

      {/* Gap Severity Dropdown */}
      <div className="flex flex-col">
        <label htmlFor="gapSeverity" className="text-sm font-medium text-white">
          Gap Severity
        </label>
        <select
          id="gapSeverity"
          name="gapSeverity"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="">Select Severity</option>
          {/* Add your options here */}
        </select>
      </div>

      {/* Department Dropdown */}
      <div className="flex flex-col">
        <label htmlFor="department" className="text-sm font-medium text-white">
          Department
        </label>
        <select
          id="department"
          name="department"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="">Select Department</option>
          {/* Add your options here */}
        </select>
      </div>
    </div>
  );
};

export default GapToolbar;
