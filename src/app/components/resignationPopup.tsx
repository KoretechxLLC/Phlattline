import React, { useState, useEffect } from "react";
import { Button } from "./button-sidebar";
import Spinner from "@/app/components/Spinner"; // Assuming this is where the Spinner component is imported
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Avatar, AvatarImage } from "./avatar";

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
  const [loading, setLoading] = useState(true); // Loading state to show the loader initially
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userData } = useSelector((state: RootState) => state.auth);
  const userType = userData?.user_type_id;

  // Simulate loading of employee data with a timeout (replace with actual data fetching logic)
  useEffect(() => {
    if (show) {
      setLoading(true); // Set loading to true when the popup is shown
      setTimeout(() => {
        setLoading(false); // Set loading to false after 2 seconds (simulating data load)
      }, 2000); // Simulate loading for 2 seconds
    }
  }, [show]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#000000b9] rounded-xl shadow-lg p-8 w-[90%] max-w-6xl">
        {/* Popup Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">
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
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Spinner height="30px" width="30px" />
          </div>
        ) : (
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
                    <span className="font-semibold text-white text-sm block">
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
                  value={userType === 2 ? employee?.message : ""} // Editable for userType !== 2
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
        )}
      </div>
    </div>
  );
};

export default ResignationPopup;
