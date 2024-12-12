"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";
import { Avatar, AvatarImage } from "@/app/components/avatar";
import { Badge } from "./badge";
import { Button } from "./button-sidebar";
import EmployeeModal from "./employeeModal";

type EmployeeData = {
  image: string;
  name: string;
  designation?: string;
  reason?: string;
  status?: string;
};

type EmployeesTabProps = {
  title: string;
  employees: EmployeeData[];
  showBadge?: boolean;
  showReason?: boolean;
  hideViewAll?: boolean; // Whether to hide the "View All" button and modal
};

const EmployeesTab: React.FC<EmployeesTabProps> = ({
  title,
  employees,
  showBadge = false,
  showReason = false,
  hideViewAll = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewAllClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Card className="border w-full border-[#62626280] rounded-3xl">
        <CardHeader className="mb-6 4xl:mb-6 rounded-3xl bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80]">
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <ul>
          {employees.map((employee, index) => (
            <li
              key={index}
              className={`${
                index < employees.length - 1
                  ? "border-b border-[#62626280]"
                  : ""
              }`}
            >
              <CardContent className="flex items-center space-x-4 4xl:p-6 p-8">
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src={employee.image}
                    alt={`${employee.name}-avatar`}
                    className="w-10 h-10"
                  />
                </Avatar>
                <span className="font-semibold">{employee.name}</span>
                {employee.designation && (
                  <span className="text-yellow-400">
                    {employee.designation}
                  </span>
                )}
                {showReason && employee.reason && (
                  <span className="text-red-500">{employee.reason}</span>
                )}
                {showBadge && employee.status && (
                  <Badge className="bg-gradient-to-b text-sm from-[#B50D34] to-[#BAA716] whitespace-nowrap">
                    {employee.status}
                  </Badge>
                )}
              </CardContent>
            </li>
          ))}
        </ul>
        {!hideViewAll && (
          <Button
            className="text-white px-2 flex w-full justify-center items-center rounded-3xl mt-4"
            size="md"
            color="primary"
            onClick={handleViewAllClick}
          >
            View All
          </Button>
        )}
        {!hideViewAll && (
          <EmployeeModal
            open={isModalOpen}
            onClose={handleCloseModal}
            showSelectionControls={false}
          />
        )}
      </Card>
    </div>
  );
};

export default EmployeesTab;
