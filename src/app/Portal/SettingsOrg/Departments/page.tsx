"use client";
import React, { useState } from "react";
import { Button } from "@/app/components/button-sidebar";
import Icon from "@/app/components/utility-icon";

const Departments = () => {
  const [deptName, setDeptName] = useState("");
  const [deptSize, setDeptSize] = useState("");

  // Static array for department names
  const departmentNames = [
    { id: 1, name: "HR Department" },
    { id: 2, name: "Engineering Department" },
    { id: 3, name: "Marketing Department" },
    { id: 4, name: "Sales Department" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Left Column: Department Name and Size */}
      <div className="pr-4">
        {/* Padding right for space between the separator */}
        <div className="relative py-2 border border-gray-500 rounded-2xl">
          <input
            id="dept-name"
            type="text"
            placeholder="Enter Department Name"
            value={deptName} // Use state variable for input
            onChange={(e) => setDeptName(e.target.value)} // Update state on change
            className="w-full bg-black text-white py-4 px-4 rounded-xl border-none focus:outline-none"
            required
          />
        </div>
        <div className="relative py-2 border border-gray-500 rounded-2xl mt-4">
          <select
            id="industry-select"
            value={deptSize}
            onChange={(e) => setDeptSize(e.target.value)}
            className="w-full bg-black text-white py-4 px-4 rounded-xl border-none focus:outline-none"
          >
            <option value="" disabled>
              Select Department Size
            </option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
        <Button color="primary" className="mt-4">
          Add Department
        </Button>
      </div>

      {/* Right Column: Display Department Name and Size */}
      <div>
        <div className="relative py-1 rounded-2xl">
          {departmentNames.map((department) => (
            <div
              key={department.id}
              className="w-full bg-black text-white py-6 px-4 my-5 border border-gray-500 rounded-2xl flex justify-between items-center"
            >
              <p className="text-sm">{department.name}</p>
              <div className="flex space-x-2">
                <Icon
                  icon="dashicons:welcome-write-blog"
                  className="w-8 h-8 text-green-500"
                />
                <Icon icon="tabler:trash" className="w-8 h-8 text-red-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Departments;
