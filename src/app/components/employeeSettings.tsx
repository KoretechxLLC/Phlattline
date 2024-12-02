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
} from "@/redux/slices/organization.slice";

const data = [
  {
    id: 1,
    employees: {
      name: "John Doe",
      image: "/assets/UserProfile.png",
      designation: "Software Engineer",
    },
    status: "pending",
    action: null,
  },
  {
    id: 2,
    employees: {
      name: "Jane Smith",
      image: "/assets/UserProfile.png",
      designation: "Project Manager",
    },
    status: "Approved",
    action: null,
  },
  {
    id: 3,
    employees: {
      name: "Andy Harold",
      image: "/assets/UserProfile.png",
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
  const { departments } = useSelector((state: RootState) => state.organization);
  const dispatch: any = useDispatch();

  const organization_id = userData?.organization_id;

  useEffect(() => {
    if (!departments || departments.length == 0) {
      dispatch(fetchAllDepartment({ organizationId: organization_id }));
    }
  }, []);

  useEffect(() => {
    setSelectedDept(departments?.[0]?.id);

    handleDepartmentClick(selectedDept);
  }, [departments?.length]);

  useEffect(() => {
    if (selectedDept) {
      dispatch(fetchEmployeeByDepartment({ departmentId: selectedDept }));
    }
  }, [selectedDept, dispatch]);

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
  const handleDepartmentClick = (deptId: any) => {
    console.log("dept Id", deptId);
    setSelectedDept(deptId);
    {
      departments &&
        departments.length > 0 &&
        departments.map((dept: any) => {
          if (dept.id == deptId) {
            setEmployeeData(dept.employees);
          }
        });
    }
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
