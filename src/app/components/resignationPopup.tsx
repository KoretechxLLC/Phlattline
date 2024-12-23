import React, { useState, useEffect } from "react";
import { Button } from "./button-sidebar";
import Spinner from "@/app/components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { organizationResignationAction } from "@/redux/slices/organization.slice";
import {
  resetSuccess,
  resetError,
  fetchResignations,
  submitResignation,
} from "@/redux/slices/employeee.slice";
import { Avatar, AvatarImage } from "./avatar";

import StackedNotifications, { NotificationType } from "./Stackednotification";

const ResignationPopup = ({
  show,
  onClose,
  employee,
  loading,
}: {
  show: boolean;
  onClose: () => void;
  employee?: any;
  loading?: boolean;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [resignationMessage, setResignationMessage] = useState(""); // State for textarea input
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );
  const dispatch: any = useDispatch<any>();
  const { userData } = useSelector((state: RootState) => state.auth);
  const { resignationsuccess, error }: any = useSelector(
    (state: RootState) => state.employee
  );
  const userType = userData?.user_type_id;
  const employeeid = userData?.employee_id;
  const organizationid = userData?.organization_id;
  const {
    resignationActionLoading,
    resignationAction,
    resignationActionSuccess,
    resignationActionError,
  }: any = useSelector((state: RootState) => state.organization);

  useEffect(() => {
    if (resignationsuccess) {
      setNotification({
        id: Date.now(),
        text: "Application Has Been Submit",
        type: "success",
      });
      dispatch(resetSuccess());
      onClose();
    }
    if (error) {
      setNotification({
        id: Date.now(),
        text: error,
        type: "error",
      });
      dispatch(resetError());
      onClose();
    }
  }, [resignationsuccess, error, dispatch, onClose]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission

    // Dispatch submitResignation
    dispatch(
      submitResignation({
        employee_id: employeeid,
        organization_id: organizationid,
        reason: resignationMessage,
      })
    )
      .then(() => {
        // After submitResignation is fulfilled, dispatch fetchResignations
        if (organizationid) {
          dispatch(fetchResignations({ organization_id: organizationid }));
        }
      })
      .catch((error: any) => {
        // Handle error if needed
        console.error("Error during resignation submission:", error);
      });
  };

  const handleResignationAccept = () => {
    dispatch(
      organizationResignationAction({
        data: {
          id: employee?.id,
          organization_id: employee?.organization_id,
          employee_id: employee.employee_id,
          status: "accepted",
        },
      })
    );
  };
  const handleResignationReject = () => {
    dispatch(
      organizationResignationAction({
        data: {
          id: employee?.id,
          organization_id: employee?.organization_id,
          employee_id: employee.employee_id,
          status: "rejected",
        },
      })
    );
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <StackedNotifications
        notification={notification}
        setNotification={setNotification}
      />
      <div className="bg-white rounded-xl shadow-lg p-8 w-[90%] max-w-6xl">
        {/* Popup Header */}
        <div className="flex justify-between items-center text-center mb-6">
          <h2 className="text-3xl font-bold text-black text-center">
            {userType === 2
              ? "Employee Resignation Request"
              : "Submit Resignation Request"}
          </h2>
          <button
            onClick={onClose}
            className="text-red-600 text-3xl font-extrabold hover:text-red-800"
          >
            ×
          </button>
        </div>

        {/* Conditionally render loader or content */}
        {loading || resignationActionLoading ? (
          <div className="flex justify-center items-center py-10">
            <Spinner height="30px" width="30px" />
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div>
              {/* Resignation Message Textarea */}
              <div className="mb-6">
                <textarea
                  placeholder={
                    userType === 2 ? "Matter" : "Reason for Resignation"
                  }
                  value={userType === 2 ? employee?.reason : resignationMessage} // Editable for userType !== 2
                  readOnly={userType === 2} // Makes it readonly for userType === 2
                  onChange={(e) => setResignationMessage(e.target.value)} // Update state on change
                  className="w-full p-10 rounded-md border bg-white text-black border-gray-300 placeholder-gray-400 resize-none"
                />
              </div>

              {/* Footer */}
              <div className="mt-8 text-center">
                {userType === 2 ? (
                  <div className="flex justify-center space-x-4">
                    <Button
                      onClick={handleResignationAccept}
                      color="primary"
                      className="rounded-3xl"
                    >
                      Accept
                    </Button>
                    <Button
                      onClick={handleResignationReject}
                      color="secondary"
                      className="rounded-3xl"
                    >
                      Reject
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="submit" // Make sure this is a submit button inside the form
                    color="primary"
                    className="rounded-3xl"
                    onClick={handleSubmit}
                  >
                    Submit Request
                  </Button>
                )}
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResignationPopup;
