import React, { useState, useEffect } from "react";
import { Button } from "./button-sidebar";
import Spinner from "@/app/components/Spinner"; // Assuming this is where the Spinner component is imported
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Avatar, AvatarImage } from "./avatar";
import { resetSuccess, resetError, fetchResignations } from "@/redux/slices/employeee.slice";
import { submitResignation } from "@/redux/slices/employeee.slice";
import StackedNotifications, { NotificationType } from "./Stackednotification";

const ResignationPopup = ({
  show,
  onClose,
  employee,
}: {
  show: boolean;
  onClose: () => void;
  employee?: {
    name: string;
    message: string;
  };
}) => {
  const dispatch = useDispatch<any>();
  const [loading, setLoading] = useState(true); // Loading state to show the loader initially
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resignationMessage, setResignationMessage] = useState(""); // State for textarea input
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );
  const { userData } = useSelector((state: RootState) => state.auth);
  const { resignationsuccess, error } = useSelector((state: RootState) => state.employee);
  const userType = userData?.user_type_id;
  const employeeid = userData?.employee_id;
  const organizationid = userData?.organization_id;


  useEffect(() => {
    if (resignationsuccess) {
      setNotification({
        id: Date.now(),
        text: "Application Has Been Submit",
        type: "success",
      });
      dispatch(resetSuccess());
      
    
    }
    if (error) {
      setNotification({
        id: Date.now(),
        text: error,
        type: "error",
      });
      dispatch(resetError());
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
      }))
      .then(() => {
        // After submitResignation is fulfilled, dispatch fetchResignations
        if (organizationid) {
          dispatch(fetchResignations({ organization_id: organizationid }));
        }
      })
      .catch((error:any) => {
        // Handle error if needed
        console.error("Error during resignation submission:", error);
      });
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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-black">
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
      
          <form onSubmit={handleSubmit}>
            <div>
              {/* Employee Details */}
              {userType === 2 && (
                <div className="flex items-center space-x-4 py-10">
                  <Avatar className="w-14 h-14">
                    <AvatarImage
                      src="/assets/DummyImg.png"
                      alt="avatar"
                      className="w-14 h-14"
                    />
                  </Avatar>
                  <div>
                    <span className="font-semibold text-black text-sm block">
                      {employee?.name}
                    </span>
                  </div>
                </div>
              )}

              {/* Resignation Message Textarea */}
              <div className="mb-6">
                <textarea
                  placeholder={
                    userType === 2 ? "Matter" : "Reason for Resignation"
                  }
                  value={resignationMessage} // Controlled by state
                  readOnly={userType === 2} // Editable only for userType !== 2
                  onChange={(e) => setResignationMessage(e.target.value)} // Update state on change
                  className="w-full p-10 rounded-md border bg-white text-black border-gray-300 placeholder-gray-400 resize-none"
                />
              </div>

              {/* Footer */}
              <div className="mt-8 text-center">
                {userType === 2 ? (
                  <div className="flex justify-center space-x-4">
                    <Button
                      onClick={() => {
                        /* Handle Accept Logic */
                      }}
                      color="primary"
                      className="rounded-3xl"
                    >
                      Accept
                    </Button>
                    <Button
                      onClick={() => {
                        /* Handle Reject Logic */
                      }}
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
       
      </div>
    </div>
  );
};

export default ResignationPopup;
