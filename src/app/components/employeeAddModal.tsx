import React, { useState, useEffect } from "react";
import { CardContent } from "@/app/components/Card";
import Icon from "@/app/components/utility-icon";
import { Button } from "./button-sidebar";
import { Avatar, AvatarImage } from "@/app/components/avatar";
import Spinner from "@/app/components/Spinner"; // Import the Spinner component
import Image from "next/image";
import StackedNotifications from "./Stackednotification";
import {
  addEmployeesInDepartment,
  removeEmployeesInDepartment,
  resetError,
  resetSuccess,
} from "@/redux/slices/organization.slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export type NotificationType = {
  id: number;
  text: string;
  type: "error" | "success";
};

const EmployeeAddModal = ({
  open,
  onClose,
  data,
  departmentId,
}: {
  open: boolean;
  onClose: () => void;
  data: any;
  departmentId: string;
}) => {
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [addedEmployees, setAddedEmployees] = useState<string[]>([]); // State to track added employees
  const [displayedEmployees, setDisplayedEmployees] = useState(data); // State to track displayed employees
  const [loading, setLoading] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );
  const {
    removeEmployeeError,
    removeEmployeeSuccess,
    addEmployeeSuccess,
    addEmployeeError,
  } = useSelector((state: RootState) => state.organization);
  const dispatch: any = useDispatch();

  // Filter employees to show only added ones by default
  useEffect(() => {
    if (open) {
      dispatch(resetSuccess());
      dispatch(resetError());
      setNotification(null);
      setLoading(true); // Start loading when modal opens
      setTimeout(() => {
        // Filter employees into two groups
        const inDepartment = data.filter(
          (employee: any) => employee.departmentId === departmentId
        ); // Already in the department

        // Update the displayed employees to show only those in the department
        setDisplayedEmployees(inDepartment);

        // Reset search-related state
        setSearchTerm("");
        setLoading(false); // Stop loading after filtering
      }, 1000); // Simulate loading time of 1 second
    }
  }, [open, departmentId, data]);

  useEffect(() => {
    if (addEmployeeSuccess || removeEmployeeSuccess) {
      setNotification({
        id: Date.now(),
        text: addEmployeeSuccess || removeEmployeeSuccess,
        type: "success",
      });
      dispatch(resetSuccess());
      setAddedEmployees([]);
    } else if (removeEmployeeError || addEmployeeError)
      setNotification({
        id: Date.now(),
        text: removeEmployeeError || addEmployeeError,
        type: "error",
      });
    dispatch(resetError());
  }, [
    removeEmployeeSuccess,
    addEmployeeSuccess,
    removeEmployeeError,
    addEmployeeError,
  ]);

  const handleAddEmployee = async (employeeId: string) => {
    // Simulate adding employee to department
    setAddedEmployees((prev: string[]) => [...prev, employeeId]);

    // Update the displayed employees and addedEmployees
    setDisplayedEmployees((prev: any[]) =>
      prev.map((employee) =>
        employee.id === employeeId
          ? { ...employee, departmentId: departmentId }
          : employee
      )
    );

    // Add to addedEmployees
  };

  const handleRemoveEmployee = async (employeeId: string) => {
    try {
      // Dispatch the remove employee action with the correct payload structure
      dispatch(removeEmployeesInDepartment(employeeId));

      // On success, update the UI and remove from addedEmployees
      setDisplayedEmployees((prev: any[]) =>
        prev.map((employee) =>
          employee.id === employeeId
            ? { ...employee, departmentId: null }
            : employee
        )
      );

      setAddedEmployees((prev: string[]) =>
        prev.filter((emp) => emp !== employeeId)
      );
    } catch (error) {
      console.error("Failed to remove employee:", error);
      setNotification({
        id: Date.now(),
        text: "Failed to remove employee.",
        type: "error",
      });
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.trim() === "") {
      // Show all employees including added ones when search term is cleared
      setDisplayedEmployees(
        data.filter(
          (employee: any) =>
            addedEmployees.includes(employee.id) &&
            (employee.departmentId || employee.departmentId === departmentId)
        )
      );
    } else {
      // Filter employees based on the search term, excluding added ones
      setDisplayedEmployees(
        data.filter(
          (employee: any) =>
            !addedEmployees.includes(employee.id) &&
            `${employee.first_name} ${employee.last_name}`
              .toLowerCase()
              .includes(term.toLowerCase()) &&
            // Include employees who don't have a department or belong to the selected department
            (!employee.departmentId || employee.departmentId !== departmentId)
        )
      );
    }
  };

  const handleError = () => {
    setImgError(true);
  };

  const handleSubmit = async () => {
    // Check if there are any added employees
    if (addedEmployees.length > 0) {
      // Construct the payload for added employees
      const addPayload = addedEmployees
        .map((employeeId) => {
          const employee = data.find((emp: any) => emp.id === employeeId);
          if (employee) {
            return {
              organization_id: employee.organization_id,
              department_id: departmentId,
              employee_id: employee.id,
            };
          }
        })
        .filter((item) => item !== null); // Filter out any null values

      if (addPayload.length > 0) {
        // Dispatch the action with the add payload
        dispatch(addEmployeesInDepartment(addPayload));
      } else {
        setNotification({
          id: Date.now(),
          text: "Payload is empty. Please check the data.",
          type: "error",
        });
      }
    } else {
      onClose();
      dispatch(resetSuccess());
      dispatch(resetError());
      setNotification(null);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <StackedNotifications
        notification={notification}
        setNotification={setNotification}
      />
      <div className="relative p-5 bg-white rounded-3xl w-3/4 md:w-1/3 flex flex-col">
        {/* Header Section with Close Button and Employee Count */}
        <div className="flex justify-between items-center pb-4">
          <button
            onClick={onClose}
            className="text-gray-700 hover:text-red-500"
          >
            <Icon icon="ic:outline-close" className="text-3xl" />
          </button>
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
        <div className="flex-grow">
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
                  {displayedEmployees.map((employees: any, index: number) => (
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
                          {employees?.profile_image && !imgError ? (
                            <Image
                              alt="User profile image"
                              src={
                                imgError
                                  ? "/assets/DummyImg.png"
                                  : `/api/images?filename=${employees.profile_image}&folder=profileImage`
                              }
                              layout="responsive"
                              width={5000}
                              height={5000}
                              className="rounded-full h-16 w-16 object-cover"
                              onError={handleError}
                            />
                          ) : employees && employees?.user_type_id == 2 ? (
                            <div className="w-10 h-10 ring-1 ring-white flex items-center justify-center bg-gradient-to-b from-[#BAA716] to-[#B50D34] rounded-full">
                              <span className="text-white text-sm font-bold">
                                {employees?.organizations?.organization_name
                                  .charAt(0)
                                  .toUpperCase()}
                              </span>
                            </div>
                          ) : (
                            <div className="w-10 h-10 ring-1 ring-white flex items-center justify-center bg-gradient-to-b from-[#BAA716] to-[#B50D34] rounded-full">
                              <span className="text-white text-sm font-bold">
                                {employees?.first_name
                                  ?.charAt(0)
                                  .toUpperCase() +
                                  employees?.last_name?.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                          <div className="flex flex-col">
                            <span className="font-semibold text-black uppercase">
                              {employees.first_name} {employees.last_name}
                            </span>
                            <span className="text-gray-600 text-sm">
                              {employees.email}
                            </span>
                          </div>
                        </div>

                        {/* Add/Remove Button */}
                        {employees.departmentId === departmentId ? (
                          <button
                            onClick={() => handleRemoveEmployee(employees.id)}
                            className="text-sm px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600"
                          >
                            Remove
                          </button>
                        ) : (
                          <button
                            onClick={() => handleAddEmployee(employees.id)}
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
                <div className="text-center py-3 text-gray-500">
                  No employees available
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Section with Submit Button */}
        <div className="py-3 flex justify-center space-x-4">
          <Button onClick={onClose} className="bg-gray-300 hover:bg-gray-400">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-600"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAddModal;
