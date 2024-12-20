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
import ResignationPopup from "./resignationPopup"; // Import ResignationPopup
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const [isResignationPopupOpen, setIsResignationPopupOpen] = useState(false); // State to control ResignationPopup visibility
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeData | null>(
    null
  ); // Store the selected employee for resignation
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const handleViewAllClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleResignationPopupOpen = (employee: EmployeeData) => {
    setSelectedEmployee(employee); // Store the selected employee
    setIsResignationPopupOpen(true); // Open the resignation popup
  };

  const handleCloseResignationPopup = () => {
    setIsResignationPopupOpen(false); // Close the resignation popup
  };

  const handleNextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div>
      <Card className="border w-full border-[#62626280] rounded-3xl h-[28em] flex flex-col">
        <CardHeader className="mb-6 rounded-3xl bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80]">
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <div className="flex flex-col flex-grow">
          <ul className="flex-grow overflow-y-auto">
            {employees &&
              employees.length > 0 &&
              employees.map((employee, index) => (
                <li
                  key={index}
                  className={`${
                    index < employees.length - 1
                      ? "border-b border-[#62626280]"
                      : ""
                  }`}
                >
                  <CardContent className="flex items-center justify-between space-x-4 p-6">
                    <div className="flex items-center gap-6">
                      <Avatar className="w-10 h-10">
                        <AvatarImage
                          src={employee.image}
                          alt={`${employee.name}-avatar`}
                          className="w-10 h-10"
                        />
                      </Avatar>
                      <span className="font-semibold">{employee.name}</span>
                    </div>

                    {employee.designation && (
                      <span className="text-yellow-400">
                        {employee.designation}
                      </span>
                    )}
                    {showReason && employee.reason && (
                      <Button
                        onClick={() => handleResignationPopupOpen(employee)} // Open resignation popup on click
                        color="primary"
                      >
                        View
                      </Button>
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

          {/* Footer Section for Pagination and View All */}
          <div className="p-4 bg-[#2D2C2C80] mt-auto rounded-b-3xl">
            <div className="flex items-center justify-between">
              {/* Pagination Controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-8 h-8 border-transparent hover:bg-transparent"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-5 h-5 text-default-900" />
                </Button>
                <span className="text-sm font-medium text-default-900">
                  Page {currentPage} of {totalPage}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-8 h-8 border-transparent hover:bg-transparent"
                  onClick={handleNextPage}
                  disabled={currentPage >= totalPage}
                >
                  <ChevronRight className="w-5 h-5 text-default-900" />
                </Button>
              </div>
              {/* View All Button */}
              {!hideViewAll && (
                <Button
                  className="text-white rounded-3xl px-4 py-2"
                  size="md"
                  color="primary"
                  onClick={handleViewAllClick}
                >
                  View All
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Employee Modal */}
      {!hideViewAll && (
        <EmployeeModal
          open={isModalOpen}
          onClose={handleCloseModal}
          showSelectionControls={false}
        />
      )}

      {/* Resignation Popup */}
      {isResignationPopupOpen && selectedEmployee && (
        <ResignationPopup
          show={isResignationPopupOpen}
          onClose={handleCloseResignationPopup}
          employee={{
            name: selectedEmployee.name,
            message: selectedEmployee.reason || "No reason provided",
          }}
        />
      )}
    </div>
  );
};

export default EmployeesTab;
