"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";
import { Button } from "./button-sidebar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { fetchAllDepartment } from "@/redux/slices/organization.slice";
import EmployeeDetail from "./employeeDetail";

const IndividualReportChecker = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(
    null
  );
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false); // Modal visibility state

  const { userData } = useSelector((state: RootState) => state.auth);
  const { departments } = useSelector((state: RootState) => state.organization);
  const dispatch: any = useDispatch();

  useEffect(() => {
    if (userData?.organization_id) {
      setLoading(true);
      dispatch(
        fetchAllDepartment({ organizationId: userData?.organization_id })
      ).finally(() => setLoading(false));
    }
  }, [dispatch, userData?.organization_id]);

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const departmentId = Number(e.target.value);
    setSelectedDepartment(departmentId);
    setSelectedEmployee(null); // Reset selected employee
  };

  const handleEmployeeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const employeeId = Number(e.target.value);
    setSelectedEmployee(employeeId);
  };

  const handleApply = () => {
    if (selectedEmployee && selectedDepartment) {
      setShowModal(true); // Show modal on apply
    } else {
      alert("Please select both a department and an employee!");
    }
  };

  const employees =
    selectedDepartment !== null
      ? departments.find((dept: any) => dept.id === selectedDepartment)
        ?.employees || []
      : [];

  return (
    <div className="p-8 -mt-[2em]">
      <Card className="border border-gray-800 pb-3 rounded-3xl shadow-lg bg-black">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-white">
            Check Individual Report
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Department Selection */}
            <select
              className="w-full p-[16px] rounded-lg bg-[#2D2C2C] text-white focus:outline-none focus:ring-2 focus:ring-gray-300"
              onChange={handleDepartmentChange}
              value={selectedDepartment || ""}
            >
              <option value="" disabled>
                Select Department
              </option>
              {departments?.map((dept: any) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>

            {/* Employee Selection */}
            {employees.length > 0 && (
              <select
                className="w-full rounded-lg p-[16px] bg-[#2D2C2C] text-white focus:outline-none focus:ring-2 focus:ring-gray-300 capitalize"
                onChange={handleEmployeeChange}
                value={selectedEmployee || ""}
              >
                <option value="" disabled>
                  Select Employee
                </option>
                {employees.map((employee: any) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.first_name} {employee.last_name}
                  </option>
                ))}
              </select>
            )}

            {/* No Employees Message */}
            {selectedDepartment && employees.length === 0 && (
              <p className="text-gray-400 text-[16px]">
                No employees available in the selected department.
              </p>
            )}

            {/* Apply Button */}
            <Button
              color="primary"
              className="w-[6em] mt-4 py-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition"
              onClick={handleApply}
              disabled={!selectedEmployee || !selectedDepartment}
            >
              Apply
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
          <div className="bg-[#161515] w-[80%] md:w-[80%] lg:w-[80%] p-6 rounded-lg shadow-lg">
            {/* Close Button */}
            <div className="flex justify-end -mt-[2em]">
              <button
                onClick={() => setShowModal(false)}
                className="text-white text-[3em] font-bold hover:text-gray-600"
              >
                &times; 
              </button>
            </div>

            {/* Employee Details */}
            <EmployeeDetail
              employeeId={selectedEmployee!}
              departmentId={selectedDepartment!}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default IndividualReportChecker;
