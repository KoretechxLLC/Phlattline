"use client";
import React, { useEffect, useState } from "react";
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
import ResignationPopup from "./resignationPopup";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Spinner from "./Spinner";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  getResignationCount,
  resetError,
  resetSuccess,
} from "@/redux/slices/organization.slice";

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
  hideViewAll?: boolean;
  loading?: boolean;
  currentPage?: any;
  setCurrentPage?: any;
};

const EmployeesTab: React.FC<EmployeesTabProps> = ({
  title,
  employees,
  showBadge = false,
  showReason = false,
  hideViewAll = false,
  loading,
  currentPage,
  setCurrentPage,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actualCount, setActualCount] = useState(0);

  const [isResignationPopupOpen, setIsResignationPopupOpen] = useState(false);
  const [singleResignedEmployee, setSingleResignedEmployee] =
    useState<EmployeeData | null>(null);
  const {
    allResignation,
    allResignationLoader,
    organizationResignationCount,
    organizationResignationCountLoader,
    organizationResignationCountSuccess,
    resignationActionSuccess,
    resignationActionError,
  }: any = useSelector((state: RootState) => state.organization);
  const size = 3;
  const { userData } = useSelector((state: RootState) => state.auth);
  const organization_id = userData?.organization_id;

  const dispatch: any = useDispatch();

  const [totalPage, setTotalPage] = useState(1);

  const handleViewAllClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleResignationPopupOpen = (employeeid: any) => {
    setIsResignationPopupOpen(true);

    const selectedEmployee = allResignation.find(
      (employee: any) => employee?.employee_id === employeeid
    );
    setSingleResignedEmployee(selectedEmployee);
  };

  const handleCloseResignationPopup = () => {
    setIsResignationPopupOpen(false);
  };

  const handleNextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage((prevPage: any) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage: any) => prevPage - 1);
    }
  };

  useEffect(() => {
    if (organizationResignationCountSuccess && actualCount > 0) {
      const pages = Math.ceil(actualCount / size);
      setTotalPage(pages);
    }
  }, [organizationResignationCountSuccess, actualCount]);
  useEffect(() => {
    if (!organizationResignationCount) {
      dispatch(getResignationCount({ organization_id }));
    }
  }, []);

  useEffect(() => {
    if (organizationResignationCountSuccess) {
      setActualCount(organizationResignationCount);
    }
  }, []);
  useEffect(() => {
    if (resignationActionSuccess) {
      setIsResignationPopupOpen(false);
      dispatch(resetSuccess());
      dispatch(resetError());
      setActualCount(actualCount ? actualCount - 1 : 0);
    }
  }),
    [resignationActionSuccess, resignationActionError];

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center h-[28em]">
          <Spinner />
        </div>
      ) : (
        <>
          <Card className="border w-full border-[#62626280] rounded-3xl h-[28em] flex flex-col">
            <CardHeader className="mb-6 rounded-3xl bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80]">
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            {!employees ? (
              <div>
                <p className="text-[#62626280] text-sm text-center mt-4">
                  No Employees not found
                </p>
              </div>
            ) : (
              <div className="flex flex-col flex-grow">
                <ul className="flex-grow overflow-y-auto p-2">
                  {employees &&
                    employees?.length > 0 &&
                    employees.map((employee: any, index: any) => (
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
                            {employee?.profile_image ? (
                              <Avatar className="w-10 h-10">
                                <AvatarImage
                                  src={`/api/images?filename=${employee?.profile_image}&folder=profileimage`}
                                  alt={`${
                                    employee?.first_name + employee?.last_name
                                  }-avatar`}
                                  className="w-10 h-10"
                                />
                              </Avatar>
                            ) : (
                              <div className="w-10 h-10 ring-1 ring-white flex items-center justify-center bg-gradient-to-b from-[#BAA716] to-[#B50D34] rounded-full">
                                <span className="text-white text-sm font-bold">
                                  {employee?.first_name
                                    ?.charAt(0)
                                    .toUpperCase() +
                                    employee?.last_name
                                      ?.charAt(0)
                                      .toUpperCase()}
                                </span>
                              </div>
                            )}
                            <div className="flex flex-col">
                              <span className="font-semibold">
                                {employee?.first_name +
                                  " " +
                                  employee?.last_name}
                              </span>
                              <span className="text-yellow-400">
                                {employee?.designation}
                              </span>
                            </div>
                          </div>
                          <Button
                            onClick={() =>
                              handleResignationPopupOpen(employee?.id)
                            }
                            color="primary"
                            size="sm"
                            className="rounded-3xl"
                          >
                            View
                          </Button>
                          {showBadge && employee?.status && (
                            <Button
                              color="primary"
                              size="sm"
                              className="rounded-3xl"
                              nonClickable
                            >
                              {employee?.status}
                            </Button>
                          )}
                        </CardContent>
                      </li>
                    ))}
                </ul>

                <div className="p-4 bg-[#2D2C2C80] mt-auto rounded-b-3xl">
                  <div className="flex items-center justify-between">
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
            )}
          </Card>

          {!hideViewAll && (
            <EmployeeModal
              open={isModalOpen}
              onClose={handleCloseModal}
              showSelectionControls={false}
            />
          )}

          {isResignationPopupOpen && singleResignedEmployee && (
            <ResignationPopup
              show={isResignationPopupOpen}
              onClose={handleCloseResignationPopup}
              loading={allResignationLoader}
              employee={singleResignedEmployee || "No reason provided"}
            />
          )}
        </>
      )}
    </div>
  );
};

export default EmployeesTab;
