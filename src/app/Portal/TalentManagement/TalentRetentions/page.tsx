"use client";
import React, { useEffect, useState } from "react";
import EmployeesTab from "@/app/components/employeesTab";

import EmployeesListTab from "@/app/components/employeesList";
import EmployeeDataTab from "@/app/components/employeeDataTab";
import { useDispatch, useSelector } from "react-redux";
import { getAllResignation } from "@/redux/slices/organization.slice";
import { RootState } from "@/redux/store";

const highPotentialEmployees = [
  {
    image: "/assets/DummyImg.png",
    name: "John Doe",
    designation: "Software Engineer",
  },
  {
    image: "/assets/DummyImg.png",
    name: "Jane Smith",
    designation: "Product Manager",
  },
  {
    image: "/assets/DummyImg.png",
    name: "Alice Johnson",
    designation: "Team Lead",
  },
];

const exitInterviewEmployees = [
  {
    image: "/assets/DummyImg.png",
    name: "John Doe",
    designation: "Software Engineer",
    status: "Completed",
  },
  {
    image: "/assets/DummyImg.png",
    name: "Jane Smith",
    designation: "Product Manager",
    status: "Completed",
  },
  {
    image: "/assets/DummyImg.png",
    name: "Jane Smith",
    designation: "Product Manager",
    status: "Completed",
  },
];

const TalentRetentions = () => {
  const [triageEmployees, settriageEmployees] = useState([]);

  const dispatch: any = useDispatch();
  const { userData } = useSelector((state: RootState) => state.auth);
  const {
    allResignation,
    allResignationLoader,
    allResignationError,
    allResigantionSuccess,
  }: any = useSelector((state: RootState) => state.organization);
  const [currentPage, setCurrentPage] = useState(1);
  const size = 3;
  const organization_id = userData?.organization_id;
  useEffect(() => {
    dispatch(getAllResignation({ organization_id, page: currentPage, size }));
  }, [currentPage]);



  useEffect(() => {
    let resignedEmployees: any = [];
    allResignation &&
      allResignation?.map((resign: any) => {
        resignedEmployees.push(resign?.employees);
      });
    settriageEmployees(resignedEmployees);
  }, [allResignation, allResignation?.length]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* First Row */}
        <div>
          <EmployeesTab
            title="High Potential Employees"
            employees={highPotentialEmployees}
          />
        </div>

        <div>
          <EmployeesTab
            title="Exit Interview Tab"
            employees={exitInterviewEmployees}
            showBadge={true}
          />
        </div>
        <div>
          <EmployeesTab
            title="Triage"
            employees={triageEmployees}
            showReason={true}
            loading={allResignationLoader}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>

        {/* Second Row */}
      </div>
      <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="col-span-1">
          <EmployeesListTab />
        </div>
        <div className="col-span-2">
          <EmployeeDataTab />
        </div>
      </div>
    </div>
  );
};

export default TalentRetentions;
