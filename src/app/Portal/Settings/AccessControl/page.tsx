"use client";

import * as React from "react";
import Image from "next/image";
import Spinner from "@/app/components/Spinner"; // Import the Spinner component

const accessOptions = [
  "Able to buy courses",
  "Able to view reports",
  "Able to add content",
  "Able to manage users",
];

const data = [
  {
    id: 1,
    employees: {
      name: "John Doe",
      image: "/assets/DummyImg.png",
      designation: "Software Engineer",
    },
    designation: "Software Engineer",
    access: [],
    status: "pending",
  },
  {
    id: 2,
    employees: {
      name: "Jane Smith",
      image: "/assets/DummyImg.png",
      designation: "Project Manager",
    },
    designation: "Project Manager",
    access: [],
    status: "Approved",
  },
];

const AccessControl = () => {
  const [selectedDept, setSelectedDept] = React.useState<string>("Operations");

  // Initialize the selected employee ID to the first employee's ID
  const [selectedEmployeeId, setSelectedEmployeeId] = React.useState<
    number | null
  >(
    data[0]?.id || null // Default to the first employee's ID or null
  );

  const [employeeAccess, setEmployeeAccess] = React.useState(
    data.reduce((acc, employee) => {
      acc[employee.id] = employee.access;
      return acc;
    }, {} as Record<number, string[]>)
  );

  const [loading, setLoading] = React.useState(true); // Loading state
  const [logsAvailable, setLogsAvailable] = React.useState(true); // Flag for employees availability

  const departments = ["Operations", "Sales", "Finance", "IT"];

  const handleEmployeeClick = (id: number) => {
    setSelectedEmployeeId(id === selectedEmployeeId ? null : id);
  };

  const handleAccessToggle = (employeeId: number, accessValue: string) => {
    setEmployeeAccess((prevAccess) => {
      const updatedAccess = [...prevAccess[employeeId]];

      if (updatedAccess.includes(accessValue)) {
        updatedAccess.splice(updatedAccess.indexOf(accessValue), 1);
      } else {
        updatedAccess.push(accessValue);
      }

      return {
        ...prevAccess,
        [employeeId]: updatedAccess,
      };
    });
  };

  React.useEffect(() => {
    // Simulate a delay for loading the data
    setTimeout(() => {
      if (data.length === 0) {
        setLogsAvailable(false); // If no employees are found
      }
      setLoading(false); // Set loading to false after data is "fetched"
    }, 1000);
  }, []);

  return (
    <div className="overflow-auto w-full">
      {loading ? (
        // Show the loader while loading data
        <div className="flex justify-center items-center py-4">
          <Spinner height="30px" width="30px" />
        </div>
      ) : !logsAvailable ? (
        // Show message if no employees are found
        <div className="text-center py-4 text-gray-600">
          <p>No employees found</p>
        </div>
      ) : (
        // Show the table of employees and their access options
        <table className="table-auto w-full text-center text-lg border border-[#62626280]">
          <thead>
            <tr className="bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80] text-white">
              <th className="px-4 py-2">Departments</th>
              <th className="px-4 py-2">Employees</th>
              <th className="px-4 py-2">Access</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept, index) => (
              <tr key={index}>
                <td
                  className={`px-2 py-1 rounded-xl ${
                    selectedDept === dept
                      ? "bg-red-600 text-white"
                      : "bg-black text-white"
                  }`}
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
                      className="px-4 py-2 border border-[#62626280]"
                      rowSpan={departments.length}
                    >
                      {data.map((row) => (
                        <div
                          key={row.id}
                          className={`flex justify-center items-center space-x-2 my-4 text-lg cursor-pointer ${
                            selectedEmployeeId === row.id
                              ? "bg-gray-500"
                              : "bg-transparent"
                          } rounded-lg p-2`}
                          onClick={() => handleEmployeeClick(row.id)}
                        >
                          {row.employees.image ? (
                            <Image
                              height={40}
                              width={40}
                              src={row.employees.image}
                              alt={row.employees.name}
                              className=" object-cover"
                            />
                          ) : (
                            <div className="object-cover !m-0 !p-0 object-top rounded-2xl h-10 w-10 border-2 group-hover:scale-105 group-hover:z-30 border-white bg-gradient-to-b from-[#BAA716] to-[#B50D34]  relative transition duration-500">
                              <span className="text-white text-sm md:text-sm font-bold py-3">
                                {row.employees.name?.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                          <div>
                            <p>{row.employees.name}</p>
                            <p>{row.designation}</p>
                          </div>
                        </div>
                      ))}
                    </td>
                    <td
                      className="px-4 py-2 border border-[#62626280] align-top"
                      rowSpan={departments.length}
                    >
                      {selectedEmployeeId && (
                        <div className="space-y-2 p-2">
                          {accessOptions.map((accessValue) => (
                            <div
                              key={accessValue}
                              className="flex items-center"
                            >
                              <input
                                type="checkbox"
                                checked={employeeAccess[
                                  selectedEmployeeId
                                ]?.includes(accessValue)}
                                onChange={() =>
                                  handleAccessToggle(
                                    selectedEmployeeId,
                                    accessValue
                                  )
                                }
                                className="mr-2"
                              />
                              <label>{accessValue}</label>
                            </div>
                          ))}
                        </div>
                      )}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AccessControl;
