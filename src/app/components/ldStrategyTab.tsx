"use client";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Avatar, AvatarImage } from "@/app/components/avatar";
import { Icon } from "@iconify/react";

const LDStrategyTab = () => {
  // State for form fields
  const [goalName, setGoalName] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [completionDate, setCompletionDate] = useState<Date | null>(null);
  const [goalType, setGoalType] = useState("");
  const [description, setDescription] = useState("");

  // Search and filtered state for assignees
  const [searchTerm, setSearchTerm] = useState("");

  // Static array for goals assignees
  const goalsAssignees = [
    {
      name: "Alice Smith",
      avatar: "/assets/DummyImg.png",
    },
    {
      name: "Bob Johnson",
      avatar: "/assets/DummyImg.png",
    },
    {
      name: "Charlie Lee",
      avatar: "/assets/DummyImg.png",
    },
    {
      name: "Diana Prince",
      avatar: "/assets/DummyImg.png",
    },
  ];
  const [filteredAssignees, setFilteredAssignees] = useState(goalsAssignees);

  return (
    <div className="bg-gradient-to-b from-[#62626250] to-[#2D2C2C50] text-white 4xl:p-3 p-2 rounded-xl shadow-lg w-full">
      <h2 className="text-xl font-semibold mb-4 text-center">L&D Strategies</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Goal Form */}
        <form className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Goal Name"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              className="w-full p-2 rounded-xl h-10 bg-[#2d2c2c] text-white focus:outline-none focus:ring-1 focus:ring-[#626262]"
            />
          </div>
          {/* Goal Type */}
          <div>
            <select
              value={goalType}
              onChange={(e) => setGoalType(e.target.value)}
              className="w-full p-2 rounded-xl h-10 bg-[#2d2c2c] text-white focus:outline-none focus:ring-1 focus:ring-[#626262]"
            >
              <option value="" disabled>
                Select Goal Type
              </option>
              <option value="Personal">Personal</option>
              <option value="Professional">Professional</option>
              <option value="Fitness">Fitness</option>
              <option value="Financial">Financial</option>
            </select>
          </div>

          {/* Start Date */}
          <div className="w-full rounded-xl h-10 bg-[#2d2c2c] focus-within:ring-2 focus-within:ring-[#626262]">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              placeholderText="Start Date"
              minDate={new Date()}
              className="w-full p-2 rounded-xl h-10 bg-[#2d2c2c] text-white"
            />
          </div>

          {/* Completion Date */}
          <div className="w-full rounded-xl h-10 bg-[#2d2c2c] focus-within:ring-2 focus-within:ring-[#626262]">
            <DatePicker
              selected={completionDate}
              onChange={(date) => setCompletionDate(date)}
              placeholderText="Completion Date"
              minDate={startDate || new Date()}
              className="w-full p-2 rounded-xl h-10 bg-[#2d2c2c] text-white"
            />
          </div>

          {/* Description */}
          <div>
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 h-20 rounded-xl bg-[#2d2c2c] text-white focus:outline-none focus:ring-1 focus:ring-[#626262]"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between gap-3">
            <button
              type="reset"
              className="px-4 py-2 w-full sm:w-40 bg-gray-600 rounded-md hover:bg-gray-500 focus:outline-none"
              onClick={() => {
                setGoalName("");
                setStartDate(null);
                setCompletionDate(null);
                setGoalType("");
                setDescription("");
              }}
            >
              Clear
            </button>
            <button
              type="submit"
              className="w-full sm:w-40 rounded-lg bg-gradient-to-b from-[#BAA716] to-[#B50D34] px-4 py-2 font-medium text-white text-lg"
            >
              Add
            </button>
          </div>
        </form>

        {/* Right Column: Employee List */}
        <div>
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search Employees"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full mb-4 p-2 rounded-xl h-12 bg-[#2d2c2c] text-white focus:outline-none focus:ring-1 focus:ring-[#626262]"
          />

          {/* Assignees List */}
          {/* Assignees List */}
          <ul className="space-y-3">
            {filteredAssignees.map((assignee, index) => (
              <li
                key={index}
                className="flex items-center justify-between border-b border-[#62626280] 4xl:p-2 pb-2 last:border-0"
              >
                <div className="flex items-center space-x-2">
                  <Icon
                    icon="f7:person-badge-minus"
                    className="w-6 h-6 text-red-600"
                  />
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src={assignee.avatar}
                      alt={`${assignee.name}-avatar`}
                      className="w-8 h-8"
                    />
                  </Avatar>
                </div>
                <span className="ml-auto text-right">{assignee.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LDStrategyTab;
