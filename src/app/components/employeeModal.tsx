"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
    image: "/assets/DummyImg.png",
  },
  {
    name: "Jane Smith",
    designation: "Project Manager",
    email: "jane.smith@example.com",
    image: "/assets/DummyImg.png",
  },
  {
    name: "Alice Johnson",
    designation: "UX Designer",
    email: "alice.johnson@example.com",
    image: "/assets/DummyImg.png",
  },
];

const EmployeeModal = ({
  open,
  onClose,
  showSelectionControls = true, // New prop to show/hide checkboxes and Done button
}: {
  open: boolean;
  onClose: () => void;
  showSelectionControls?: boolean;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Loading state for simulating data fetch
  const [displayedEmployees, setDisplayedEmployees] = useState(coachingData);

  useEffect(() => {
    if (open) {
      setLoading(true);
      setTimeout(() => {
        setDisplayedEmployees(coachingData);
        setLoading(false);
      }, 1000);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="relative p-5 bg-[#000000b9] rounded-3xl w-3/4 md:w-1/3 flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-3 text-white hover:text-red-500"
        >
          <Icon icon="ic:outline-close" className="text-3xl" />
        </button>
        {/* Title Section */}
        <div className="px-5 py-4 text-center">
          <select className="w-full p-2 rounded-xl h-14 bg-white border border-[#000000b9] text-black focus:outline-none focus:ring-1 focus:ring-[#626262]">
            <option value="">Department</option>
            <option value="IT">IT</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>

        {/* Employee List Section */}
        <div className="overflow-y-auto flex-grow">
          {loading ? (
            <div className="flex justify-center items-center">
              <Spinner height="30px" width="30px" />
            </div>
          ) : (
            <>
              {displayedEmployees.length === 0 ? (
                <div className="text-center text-gray-600">
                  <p>No employees found.</p>
                </div>
              ) : (
                <ul>
                  {displayedEmployees.map((employee, index) => (
                    <li
                      key={index}
                      className={`${
                        index < displayedEmployees.length - 1
                          ? "border-b border-gray-200"
                          : ""
                      }`}
                    >
                      <CardContent className="flex items-center 4xl:p-3 space-x-2 px-1 py-5 justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage
                              src={employee.image}
                              alt={`${employee.name}-avatar`}
                              className="w-16 h-16 rounded-full"
                            />
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="font-semibold text-white">
                              {employee.name}
                            </span>
                            <span className="text-red-600 text-sm">
                              {employee.email}
                            </span>
                          </div>
                        </div>
                        {/* Conditionally show the checkbox */}
                        {showSelectionControls && (
                          <input
                            type="checkbox"
                            className="w-5 h-5 border-2 border-gray-400 rounded appearance-none checked:border-white checked:bg-transparent checked:relative checked:before:content-['✔'] checked:before:text-white checked:before:absolute checked:before:top-1/2 checked:before:left-1/2 checked:before:transform checked:before:-translate-x-1/2 checked:before:-translate-y-1/2"
                          />
                        )}
                      </CardContent>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>

        {/* Done Button */}
        {showSelectionControls && (
          <div className="flex justify-center py-4">
            <Button
              onClick={onClose}
              color="primary"
              className="rounded-3xl px-5 py-2"
            >
              Done
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeModal;
