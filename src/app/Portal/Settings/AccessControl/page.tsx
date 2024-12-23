"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Spinner from "@/app/components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  fetchAllDepartment,
  fetchEmployeeByDepartment,
  resetSuccess,
} from "@/redux/slices/organization.slice";

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
  const [selectedDept, setSelectedDept] = useState<any>();
  const [selectedEmployeeId, setSelectedEmployeeId] = React.useState<
    null | number
  >(1 || null);
  const [employeeAccess, setEmployeeAccess] = React.useState(
    data.reduce((acc, employee) => {
      acc[employee.id] = employee.access;
      return acc;
    }, {} as Record<number, string[]>)
  );

  const [employeeData, setEmployeeData] = useState<any>();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Loading state for spinner
  const { userData } = useSelector((state: RootState) => state.auth);
  const { departments, responseLoading, responseSuccess } = useSelector(
    (state: RootState) => state.organization
  );
  const dispatch: any = useDispatch();

  const organization_id = userData?.organization_id;

  useEffect(() => {
    if (!departments || departments.length == 0) {
      dispatch(fetchAllDepartment({ organizationId: organization_id }));
    }
  }, []);

  const handleEmployeeClick = (id: number) => {
    setSelectedEmployeeId(id);
  };

  useEffect(() => {
    if (responseSuccess && selectedDept) {
      handleDepartmentClick(selectedDept);
    }

    dispatch(resetSuccess());
  }, [responseSuccess]);

  useEffect(() => {
    setSelectedDept(departments?.[0]?.id);
  }, [departments?.length]);

  useEffect(() => {
    dispatch(
      fetchEmployeeByDepartment({
        departmentId: selectedDept || departments?.[0]?.id,
      })
    );
  }, [selectedDept, dispatch]);

  const handleDepartmentClick = (deptId: any) => {
    setSelectedDept(deptId);

    let employeeInfo =
      departments &&
      departments.length > 0 &&
      departments.find((dept: any) => {
        if (dept.id == deptId) {
          return dept;
        }
      });

    setEmployeeData(employeeInfo?.employees);
  };

  const handleAccessToggle = (employeeId: number, accessValue: string) => {
    setEmployeeAccess((prevAccess) => {
      const updatedAccess = [...prevAccess[employeeData?.id]];
      if (updatedAccess.includes(accessValue)) {
        updatedAccess.splice(updatedAccess.indexOf(accessValue), 1);
      } else {
        updatedAccess.push(accessValue);
      }
      return {
        ...prevAccess,
        [employeeData?.id]: updatedAccess,
      };
    });
  };

  return (
    <div className="overflow-auto w-full">
      {loading || responseLoading ? (
        <div className="flex justify-center items-center py-10">
          <Spinner height="30px" width="30px" />
        </div>
      ) : (
        <div className="w-full text-center justify-center text-sm">
          <div className="text-lg bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] text-white flex">
            <div className="flex-1 px-4 py-3 whitespace-nowrap">
              Departments
            </div>
            <div className="flex-1 px-4 py-3 whitespace-nowrap">Employees</div>
            <div className="flex-1 px-4 py-3 whitespace-nowrap">Access</div>
          </div>
          <div className="flex">
            <div className="w-2/5">
              {departments.map((dept: any) => (
                <div
                  key={dept.id}
                  className={`px-4 py-2 cursor-pointer rounded-xl w-full text-center text-lg ${
                    selectedDept === dept.id
                      ? "bg-red-600 text-white"
                      : "bg-black text-white"
                  }`}
                  onClick={() => handleDepartmentClick(dept.id)}
                >
                  {dept.name}
                </div>
              ))}
            </div>
            {employeeData && employeeData.length > 0 ? (
              <div className="w-4/5 mx-8 grid grid-cols-2 gap-4">
                <div>
                  {employeeData.map((employee: any, index: any) => (
                    <React.Fragment key={index}>
                      <div
                        className={`flex cursor-pointer items-center space-x-6 px-2 py-3 my-3 rounded-lg ${
                          selectedEmployeeId === employee.id
                            ? "border border-gray-300"
                            : "bg-transparent"
                        }`}
                        onClick={() => handleEmployeeClick(employee.id)}
                      >
                        {employee.profile_image ? (
                          <Image
                            height={40}
                            width={40}
                            src={employee.profile_image}
                            alt={employee.first_name}
                            className="object-cover rounded-full"
                          />
                        ) : (
                          <div className="w-10 h-10 ring-1 ring-white flex items-center justify-center bg-gradient-to-b from-[#BAA716] to-[#B50D34] rounded-full">
                            <span className="text-white text-sm font-bold">
                              {employee.first_name?.charAt(0).toUpperCase() +
                                employee?.last_name?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                        <div>
                          <p>
                            {employee?.first_name + " " + employee?.last_name}
                          </p>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
                <div className="flex flex-col my-2 4xl:text-sm text-lg mx-20">
                  {accessOptions.map((accessValue) => (
                    <label key={accessValue} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={
                          selectedEmployeeId
                            ? employeeAccess[selectedEmployeeId]?.includes(
                                accessValue
                              )
                            : false
                        }
                        className="mr-2"
                      />
                      {accessValue}
                    </label>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center px-10 py-10 text-gray-600">
                No employees found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessControl;
