"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/app/components/button-sidebar";
import Icon from "@/app/components/utility-icon";
import { useDispatch, useSelector } from "react-redux";
import StackedNotifications from "@/app/components/Stackednotification";
import { RootState } from "@/redux/store";
import {
  addDepartment,
  deleteDepartment,
  fetchAllDepartment,
  fetchAllEmployee,
  resetError,
  resetSuccess,
} from "@/redux/slices/organization.slice";
import Spinner from "@/app/components/Spinner";
import EmployeeAddModal from "@/app/components/employeeAddModal";

export type NotificationType = {
  id: number;
  text: string;
  type: "error" | "success";
};

const Departments = () => {
  const dispatch: any = useDispatch();
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );
  const [deptName, setDeptName] = useState("");
  const [deptSize, setDeptSize] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [departmentID, setDepartmentID] = useState("");
  const {
    addDepartmentError,
    addDepartmentSuccess,
    departments,
    responseLoading,
    employee,
    departmentDeletionLoading,
    departmentDeletionsuccess,
    departmentDeletionerror
  } = useSelector((state: RootState) => state.organization);
  const { userData } = useSelector((state: RootState) => state.auth);

  const organization_id = userData?.organization_id;
  useEffect(() => {
    dispatch(fetchAllDepartment({ organizationId: userData?.organization_id }));
    dispatch(fetchAllEmployee({ organizationId: userData?.organization_id }));
  }, []);

  // Combine all employees from departments
  const employees = departments?.flatMap((dept: any) => dept.employees) || [];

  const handleSubmit = () => {
    if (!deptName || !deptSize) {
      setNotification({
        id: Date.now(),
        text: "Department name and size are required.",
        type: "error",
      });
      return;
    }

    if (typeof Number(deptSize) !== "number" || Number(deptSize) <= 0) {
      setNotification({
        id: Date.now(),
        text: "Department size must be a positive number.",
        type: "error",
      });
      return;
    }

    // Add more validation rules as needed

    let data = {
      name: deptName,
      department_size: deptSize,
      organization_id: userData.organization_id,
    };

    // Dispatch Redux action after validation
    dispatch(addDepartment({ data }));
  };
  useEffect(() => {
    if (addDepartmentSuccess) {
      setNotification({
        id: Date.now(),
        text: addDepartmentSuccess,
        type: "success",
      });
      dispatch(resetSuccess());
      setDeptSize("");
      setDeptName("");
    } else if (addDepartmentError) {
      setNotification({
        id: Date.now(),
        text: addDepartmentError,
        type: "error",
      });
      dispatch(resetError());
    }
  }, [addDepartmentSuccess, addDepartmentError]);

  const handleDelete = (id: any) => {
    dispatch(
      deleteDepartment({
        data: { department_id: id, organization_id },
      })
    );
  };

  useEffect(() => {
    if (departmentDeletionsuccess) {
      setNotification({
        id: Date.now(),
        text: departmentDeletionsuccess,
        type: "success",
      });
      dispatch(resetSuccess());
      setDeptSize("");
      setDeptName("");
    } else if (departmentDeletionerror) {
      setNotification({
        id: Date.now(),
        text: departmentDeletionerror,
        type: "error",
      });
      dispatch(resetError());
    }
  }, [departmentDeletionsuccess, departmentDeletionerror]);


  return (
    <>
      <StackedNotifications
        notification={notification}
        setNotification={setNotification}
      />

      <div className="grid grid-cols-2 gap-4">
        {/* Left Column: Department Name and Size */}
        <div className="pr-4">
          {/* Padding right for space between the separator */}
          <div className="relative py-2 border border-[#62626280] rounded-2xl">
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
          <div className="relative py-2 border border-[#62626280] rounded-2xl mt-4">
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
          <Button
            onClick={() => handleSubmit()}
            color="primary"
            className="mt-4"
          >
            {responseLoading ? (
              <Spinner height="20px" width="20px" />
            ) : (
              "Add Department"
            )}
          </Button>
        </div>

        {/* Right Column: Display Department Name and Size */}
        <div>
          <div className="relative rounded-2xl">
            {responseLoading || departmentDeletionLoading ? ( // Show loader while departments are being fetched
              <div className="flex justify-center items-center py-10">
                <Spinner height="30px" width="30px" />
              </div>
            ) : departments.length > 0 ? (
              departments.map((department: any) => (
                <div
                  key={department.id}
                  className="w-full bg-black text-white py-6 px-4 my-5 border border-[#62626280] rounded-2xl flex justify-between items-center"
                >
                  <p className="text-sm">{department.name}</p>
                  <div className="flex space-x-2">
                    <Icon
                      icon="dashicons:welcome-write-blog"
                      className="w-8 h-8 text-green-500 cursor-pointer"
                      onClick={() => {
                        setShowModal(true);
                        setDepartmentID(department?.id);
                      }}
                    />
                    <Icon
                      onClick={() => handleDelete(department?.id)}
                      icon="tabler:trash"
                      className="w-8 h-8 text-red-500 cursor-pointer"
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full text-center py-6 px-4 my-5 border border-[#62626280] rounded-2xl  text-gray-700">
                <p className="text-lg text-white">
                  No departments found. Please create a department first!
                </p>
              </div>
            )}
          </div>
        </div>
        <EmployeeAddModal
          open={showModal}
          onClose={() => {
            setShowModal(false), dispatch(resetSuccess());
            dispatch(resetError());
          }}
          data={employee}
          departmentId={departmentID}
        />
      </div>
    </>
  );
};

export default Departments;
