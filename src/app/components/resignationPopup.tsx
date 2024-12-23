import React, { useState, useEffect } from "react";
import { Button } from "./button-sidebar";
import Spinner from "@/app/components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { organizationResignationAction } from "@/redux/slices/organization.slice";

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
  const { userData } = useSelector((state: RootState) => state.auth);
  const userType = userData?.user_type_id;
  const {
    resignationActionLoading,
    resignationAction,
    resignationActionSuccess,
    resignationActionError,
  }: any = useSelector((state: RootState) => state.organization);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  const dispatch: any = useDispatch();
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


  useEffect(() => {
    if (resignationActionSuccess) {
      onClose();
    }
  }),
    [resignationActionSuccess, resignationActionError];
  if (!show) return null;

  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
                  value={userType === 2 ? employee?.reason : ""} // Editable for userType !== 2
                  readOnly={userType === 2} // Makes it readonly for userType === 2
                  onChange={(e) => {}} // You can handle changes for employees
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
