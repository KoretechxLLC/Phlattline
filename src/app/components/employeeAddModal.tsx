"use client";
import React, { useState, useEffect } from "react";
import { CardContent } from "@/app/components/Card";
import Icon from "@/app/components/utility-icon";
import { Button } from "./button-sidebar";
import { Avatar, AvatarImage } from "@/app/components/avatar";
import Spinner from "@/app/components/Spinner"; // Import the Spinner component

const coachingData = [
  {
    name: "John Doe",
    designation: "Software Engineer",
    email: "john.doe@example.com",
    image: "/assets/UserProfile.png",
  },
  {
    name: "Jane Smith",
    designation: "Project Manager",
    email: "jane.smith@example.com",
    image: "/assets/UserProfile.png",
  },
  {
    name: "Alice Johnson",
    designation: "UX Designer",
    email: "alice.johnson@example.com",
    image: "/assets/UserProfile.png",
  },
  // Add more employees here...
];

const EmployeeAddModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [addedEmployees, setAddedEmployees] = useState<string[]>([]); // State to track added employees
  const [displayedEmployees, setDisplayedEmployees] = useState(coachingData); // State to track displayed employees
  const [loading, setLoading] = useState(false); // Loading state to simulate fetching data

  // Filter employees to show only added ones by default
  useEffect(() => {
    if (open) {
      setLoading(true); // Start loading when modal opens
      setTimeout(() => {
        setDisplayedEmployees(
          coachingData.filter((employee) =>
            addedEmployees.includes(employee.email)
          )
        );
        setLoading(false); // Stop loading after data is "loaded"
      }, 1000); // Simulate loading time of 1 second
      setSearchTerm(""); // Reset search when modal opens
    }
  }, [open, addedEmployees]);

  const handleAddEmployee = (email: string) => {
    setAddedEmployees((prev) => [...prev, email]);
  };

  const handleRemoveEmployee = (email: string) => {
    setAddedEmployees((prev) => prev.filter((emp) => emp !== email));
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.trim() === "") {
      // Show only added employees if no search term
      setDisplayedEmployees(
        coachingData.filter((employee) =>
          addedEmployees.includes(employee.email)
        )
      );
    } else {
      // Show only non-added employees matching the search term
      setDisplayedEmployees(
        coachingData.filter(
          (employee) =>
            !addedEmployees.includes(employee.email) &&
            (employee.name.toLowerCase().includes(term.toLowerCase()) ||
              employee.email.toLowerCase().includes(term.toLowerCase()))
        )
      );
    }
  };

  if (!open) return null; // Conditional rendering to handle modal visibility

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="relative p-5 bg-white rounded-3xl w-3/4 md:w-1/3 flex flex-col">
        {/* Header Section with Close Button and Employee Count */}
        <div className="flex justify-between items-center pb-4">
          <button
            onClick={onClose}
            className="text-gray-700 hover:text-red-500"
          >
            <Icon icon="ic:outline-close" className="text-3xl" />
          </button>
          <span className="font-semibold text-black">
            Employees Added: {addedEmployees.length}
          </span>
        </div>

        {/* Search Bar */}
        <div className="px-5 py-4 text-center">
          <input
            type="text"
            placeholder="Search employees..."
            className="w-full p-2 rounded-xl h-14 bg-white border border-gray-300 text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {/* Employee List Section */}
        <div className="overflow-y-auto flex-grow">
          {/* Show Spinner if Loading */}
          {loading ? (
            <div className="flex justify-center items-center">
              <Spinner height="30px" width="30px" />
            </div>
          ) : (
            <>
              {/* Show Employees or No Employees Available */}
              {displayedEmployees.length > 0 ? (
                <ul>
                  {displayedEmployees.map((coach, index) => (
                    <li
                      key={index}
                      className={`${
                        index < displayedEmployees.length - 1
                          ? "border-b border-gray-200"
                          : ""
                      }`}
                    >
                      <CardContent className="flex items-center space-x-2 px-1 py-5 justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage
                              src={coach.image}
                              alt={`${coach.name}-avatar`}
                              className="w-16 h-16 rounded-full"
                            />
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="font-semibold text-black">
                              {coach.name}
                            </span>
                            <span className="text-red-600 text-sm">
                              {coach.email}
                            </span>
                          </div>
                        </div>

                        {/* Add/Remove Button */}
                        {addedEmployees.includes(coach.email) ? (
                          <button
                            onClick={() => handleRemoveEmployee(coach.email)}
                            className="text-sm px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600"
                          >
                            Remove
                          </button>
                        ) : (
                          <button
                            onClick={() => handleAddEmployee(coach.email)}
                            className="text-sm px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600"
                          >
                            Add
                          </button>
                        )}
                      </CardContent>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center text-gray-600">
                  <p>No employees found.</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer with Done Button */}
        <div className="flex justify-center py-4">
          <Button
            onClick={onClose}
            color="primary"
            className="rounded-3xl px-5 py-2"
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAddModal;
