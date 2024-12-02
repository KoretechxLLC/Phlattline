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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  fetchAllDepartment,
  fetchEmployeeByDepartment,
  resetSuccess,
} from "@/redux/slices/organization.slice";

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
  const [selectedDept, setSelectedDept] = useState();
  const [statuses, setStatuses] = useState(data.map((row) => row.status));
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
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

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const setStatus = (id: number, newStatus: string) => {
    const updatedStatuses = [...statuses];
    updatedStatuses[id - 1] = newStatus;
    setStatuses(updatedStatuses);
  };

  const handleViewClick = (id: number) => {
    setSelectedId(id);
    setIsViewModalOpen(true);
  };
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

  return (
    <div className="overflow-auto w-full">
      {loading || responseLoading ? (
        <div className="flex justify-center items-center py-10">
          <Spinner height="30px" width="30px" />
        </div>
      ) : data.length === 0 ? (
        <div className="text-center py-10 text-lg">No employees found</div>
      ) : (
        <>
          <div className="w-full text-center justify-center text-sm border border-[#62626280]">
            {/* Header */}
            <div className="text-lg bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] text-white flex">
              <div className="flex-1 px-4 py-3 whitespace-nowrap">
                Departments
              </div>
              <div className="flex-1 px-4 py-2 whitespace-nowrap">
                Employees
              </div>
              <div className="flex-1 px-4 py-2 whitespace-nowrap">
                Designation
              </div>
              <div className="flex-1 px-4 py-2 whitespace-nowrap">Status</div>
              <div className="flex-1 px-4 py-2 whitespace-nowrap">Action</div>
            </div>

            <div className="flex">
              <div className="w-1/5">
                {departments.map((dept: any) => (
                  <div
                    key={dept.id}
                    className={`px-4 py-2 rounded-xl w-full text-center text-lg ${
                      selectedDept == dept?.id
                        ? "bg-red-600 text-white"
                        : "bg-black text-white"
                    } `}
                    onClick={() => handleDepartmentClick(dept.id)}
                  >
                    {dept.name}
                  </div>
                ))}
              </div>

              {employeeData && employeeData?.length > 0 ? (
                <div className="flex-4 grid grid-cols-4 gap-0 w-4/5">
                  {employeeData.map((employee: any, index: any) => (
                    <React.Fragment key={index}>
                      <div className="px-10 py-2 justify-center text-center items-center">
                        <div className="flex items-center space-x-4 my-4 text-lg">
                          {employee?.profile_image ? (
                            <Image
                              src={`/api/images?filename=${employee.profile_image}&folder=profileImage`}
                              alt={"Unknown"}
                              width={1000}
                              height={1000}
                              className="w-10 h-10 rounded-full"
                            />
                          ) : (
                            <div className="w-10 h-10 ring-1 ring-white flex items-center justify-center bg-gradient-to-b from-[#BAA716] to-[#B50D34] rounded-full">
                              <span className="text-white text-sm font-bold">
                                {employee?.first_name?.charAt(0).toUpperCase() +
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
                      </div>
                      <div className="justify-center items-center text-lg my-7">
                        {employee.designation}
                      </div>
                      <div className="flex justify-center items-start my-7 gap-2">
                        {employee.status == "approved" ? (
                          <span className="bg-green-500 outline-white rounded-md px-8 py-1 text-white text-lg font-semibold">
                            Approved
                          </span>
                        ) : employee.status == "rejected" ? (
                          <span className="bg-red-500 rounded-md px-8 py-1 text-white text-lg font-semibold">
                            Rejected
                          </span>
                        ) : (
                          <>
                            <Button
                              variant="outline"
                              size="md"
                              className="bg-green-500 text-white border-none"
                              onClick={() => setStatus(employee.id, "approved")}
                            >
                              Approve
                            </Button>
                            <Button
                              variant="outline"
                              size="md"
                              className="bg-red-500 text-white border-none"
                              onClick={() => setStatus(employee.id, "rejected")}
                            >
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                      <div className="flex gap-4 justify-center items-start my-5 px-4 py-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                className="w-10 h-10 bg-white border-default-200"
                                onClick={() => handleViewClick(employee.id)}
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
                                onClick={() => onEmployeeSelect(employee.id)}
                              >
                                <SquarePen className="w-7 h-7 text-white" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              <p>Edit</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
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
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              ) : (
                <div className="flex flex-4 text-gray-300 col-span-4 py-4 w-4/5 items-center justify-center border-gray-300">
                  Employees do not found
                </div>
              )}
            </div>
          </div>
        </>
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
