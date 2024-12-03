"use client";
import { Avatar, AvatarImage } from "@/app/components/avatar";
import { CardContent } from "@/app/components/Card";
import { Button } from "@/app/components/button-sidebar";
import Spinner from "@/app/components/Spinner"; // Import Spinner
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  fetchAllDepartment,
  fetchEmployeeByDepartment,
} from "@/redux/slices/organization.slice";

const PerformanceReview = ({
  onEmployeeSelect,
  onDepartmentSelect,
}: {
  onEmployeeSelect: (employeeId: number) => void;
  onDepartmentSelect: (departmentId: number) => void;
}) => {
  const router = useRouter();
  const [selectedDepartmentID, setSelectedDepartmentID] = useState<
    string | null
  >(null);
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const { userData } = useSelector((state: RootState) => state.auth);
  const { departments } = useSelector((state: RootState) => state.organization);
  const dispatch: any = useDispatch();

  // Fetch all departments once the component mounts
  useEffect(() => {
    if (userData?.organization_id) {
      setLoading(true); // Start loading
      dispatch(
        fetchAllDepartment({ organizationId: userData?.organization_id })
      ).finally(() => setLoading(false)); // Stop loading
    }
  }, [dispatch, userData?.organization_id]);

  // Auto-select the first department or handle department selection
  useEffect(() => {
    if (departments?.length > 0 && !selectedDepartmentID) {
      setSelectedDepartmentID(departments[0].id);
    }
  }, [departments, selectedDepartmentID]);

  // Dispatch the fetchEmployees action whenever selectedDepartmentID changes
  useEffect(() => {
    if (selectedDepartmentID) {
      setLoading(true); // Start loading
      dispatch(
        fetchEmployeeByDepartment({
          departmentId: selectedDepartmentID,
        })
      ).finally(() => setLoading(false)); // Stop loading
    }
  }, [selectedDepartmentID, dispatch]);

  // Handle department selection
  const handleDepartmentSelect = (deptId: string) => {
    setSelectedDepartmentID(deptId);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[30%_70%] gap-4 p-2">
      {/* Department Selection Buttons */}
      <div className="space-y-2">
        {departments.map((dept) => (
          <button
            key={dept.id}
            onClick={() => handleDepartmentSelect(dept.id)}
            className={`w-full mx-auto py-8 rounded-lg ${
              selectedDepartmentID === dept.id
                ? "bg-red-600 text-white"
                : "bg-transparent text-white"
            }`}
          >
            {dept.name}
          </button>
        ))}
      </div>

      {/* Employees List Section */}
      <div className="bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80] p-3 rounded-xl shadow-xl">
        {loading ? ( // Show Spinner when loading
          <div className="flex justify-center items-center h-full">
            <Spinner width="30px" height="30px" />
          </div>
        ) : (
          <ul className="divide-y divide-gray-500">
            {departments
              .filter((department) => department.id === selectedDepartmentID)
              .map((department) => (
                <li key={department.id} className="py-4 px-4">
                  <CardContent className="flex flex-col space-y-4 4xl:p-5 px-8 py-8 border border-gray-200 rounded-lg">
                    {/* Department Name and Size */}
                    <div className="flex items-center justify-between">
                      <h2 className="font-bold text-lg">{department.name}</h2>
                      <span className="text-sm text-gray-500">
                        Max: {department.department_size} Employees
                      </span>
                    </div>

                    {/* Employees List */}
                    {department.employees?.length > 0 ? (
                      <ul className="space-y-4">
                        {department.employees.map((employee: any) => (
                          <li
                            key={employee.id}
                            className="flex items-center justify-between"
                          >
                            {/* Employee Details */}
                            <div className="flex items-center space-x-4">
                              <Avatar className="w-10 h-10">
                                <AvatarImage
                                  src={
                                    employee.profile_image ||
                                    "/assets/dummyImg.png"
                                  }
                                  alt={`${employee.first_name} ${employee.last_name}-avatar`}
                                  className="w-10 h-10"
                                />
                              </Avatar>
                              <span className="font-semibold text-sm">
                                {employee.first_name} {employee.last_name}
                              </span>
                            </div>

                            {/* View Button */}
                            <Button
                              color="primary"
                              onClick={() => {
                                onEmployeeSelect(employee.id),
                                  onDepartmentSelect(department.id);
                              }}
                            >
                              View
                            </Button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 text-sm">
                        No employees in this department
                      </p>
                    )}
                  </CardContent>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PerformanceReview;
