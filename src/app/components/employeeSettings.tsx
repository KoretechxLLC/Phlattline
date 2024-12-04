"use client";

import * as React from "react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/app/components/tooltip";
import { Eye, SquarePen, Trash2 } from "lucide-react";
import { Button } from "@/app/components/button-sidebar";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ViewEmployeeModal } from "@/app/components/viewEmployeeModal";
import Spinner from "@/app/components/Spinner"; // Assuming you have a Spinner component

const data = [
  {
    id: 1,
    employees: {
      name: "John Doe",
      image: "/assets/DummyImg.png",
      designation: "Software Engineer",
    },
    status: "pending",
    action: null,
  },
  {
    id: 2,
    employees: {
      name: "Jane Smith",
      image: "/assets/DummyImg.png",
      designation: "Project Manager",
    },
    status: "Approved",
    action: null,
  },
  {
    id: 3,
    employees: {
      name: "Andy Harold",
      image: "/assets/DummyImg.png",
      designation: "UI/UX",
    },
    status: "Rejected",
    action: null,
  },
];

const EmployeeSetting = ({
  onEmployeeSelect,
}: {
  onEmployeeSelect: (employeeId: number) => void;
}) => {
  const [selectedDept, setSelectedDept] = useState<string>("Operations");
  const [statuses, setStatuses] = useState(data.map((row) => row.status));
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Loading state for spinner

  useEffect(() => {
    // Simulate data fetching
    setLoading(true);
    setTimeout(() => {
      setLoading(false); // Set loading to false after data fetching completes
    }, 2000); // Simulating a 2-second delay for fetching data
  }, []);

  const setStatus = (id: number, newStatus: string) => {
    const updatedStatuses = [...statuses];
    updatedStatuses[id - 1] = newStatus; // Adjusted index for array
    setStatuses(updatedStatuses);
  };

  const handleViewClick = (id: number) => {
    setSelectedId(id);
    setIsViewModalOpen(true);
  };

  return (
    <div className="overflow-auto w-full">
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <Spinner height="30px" width="30px" />
        </div>
      ) : data.length === 0 ? (
        <div className="text-center py-10 text-lg">No employees found</div>
      ) : (
        <table className="table-auto w-full text-center text-sm border border-[#62626280]">
          <thead>
            <tr className="text-lg bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80] text-white">
              <th className="px-6 py-3 ">Departments</th>
              <th className="px-4 py-2 ">Employees</th>
              <th className="px-4 py-2 ">Designation</th>
              <th className="px-4 py-2 ">Status</th>
              <th className="px-4 py-2 ">Action</th>
            </tr>
          </thead>
          <tbody>
            {["Operations", "Sales", "Finance", "IT"].map((dept, index) => (
              <tr key={index}>
                <td
                  className={`px-4 py-2 rounded-xl ${
                    selectedDept === dept
                      ? "bg-red-600 text-white"
                      : "bg-black text-white"
                  } `}
                >
                  <button
                    onClick={() => setSelectedDept(dept)}
                    className="w-full text-center text-lg"
                  >
                    {dept}
                  </button>
                </td>
                {index === 0 && (
                  <>
                    <td
                      className="px-4 py-2 border items-center border-[#62626280]"
                      rowSpan={4}
                    >
                      {data.map((row) => (
                        <div
                          key={row.id}
                          className="flex items-center space-x-2 my-4 text-lg"
                        >
                          <Image
                            src={row.employees.image}
                            alt={row.employees.name}
                            width={1000}
                            height={1000}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <p>{row.employees.name}</p>
                          </div>
                        </div>
                      ))}
                    </td>
                    <td
                      className="px-4 py-2 justify-center items-center border border-[#62626280]"
                      rowSpan={4}
                    >
                      {data.map((row) => (
                        <div
                          key={row.id}
                          className="justify-center items-center text-lg my-7"
                        >
                          {row.employees.designation}
                        </div>
                      ))}
                    </td>
                    <td
                      className="justify-center items-center px-2 py-2 border border-[#62626280]"
                      rowSpan={4}
                    >
                      {data.map((row, index) => (
                        <div
                          key={row.id}
                          className="flex justify-center items-center gap-2 my-6"
                        >
                          {statuses[index] === "Approved" ? (
                            <span className="bg-green-500 outline-white rounded-md px-8 py-1 text-white text-lg font-semibold">
                              Approved
                            </span>
                          ) : statuses[index] === "Rejected" ? (
                            <span className="bg-red-500 rounded-md px-8 py-1 text-white text-lg font-semibold">
                              Rejected
                            </span>
                          ) : (
                            <>
                              <Button
                                variant="outline"
                                size="md"
                                className="bg-green-500 text-white"
                                onClick={() => setStatus(row.id, "Approved")}
                              >
                                Approve
                              </Button>
                              <Button
                                variant="outline"
                                size="md"
                                className="bg-red-500 text-white"
                                onClick={() => setStatus(row.id, "Rejected")}
                              >
                                Reject
                              </Button>
                            </>
                          )}
                        </div>
                      ))}
                    </td>
                    <td
                      className="justify-center items-center px-4 py-2 border border-[#62626280]"
                      rowSpan={4}
                    >
                      {data.map((row) => (
                        <div
                          key={row.id}
                          className="my-6 flex justify-center items-center gap-2"
                        >
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="w-10 h-10 bg-white border-default-200"
                                  onClick={() => handleViewClick(row.id)}
                                >
                                  <Eye className="w-7 h-7 text-black" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent side="top">
                                <p>View</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          {/* Edit Button */}
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="w-10 h-10 bg-green-500 border-default-200"
                                  onClick={() => onEmployeeSelect(row.id)}
                                >
                                  <SquarePen className="w-7 h-7 text-white" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent side="top">
                                <p>Edit</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          {/* Delete Button */}
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="w-10 h-10 ring-offset-transparent bg-red-500 border-default-200 dark:border-default-300 text-default-400"
                                >
                                  <Trash2 className="w-7 h-7" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent
                                side="top"
                                className="bg-destructive text-destructive-foreground"
                              >
                                <p>Delete</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          {/* Other buttons */}
                        </div>
                      ))}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {isViewModalOpen && selectedId !== null && (
        <ViewEmployeeModal
          isOpen={isViewModalOpen}
          setIsOpen={setIsViewModalOpen}
          employeeId={selectedId}
        />
      )}
    </div>
  );
};

export default EmployeeSetting;
