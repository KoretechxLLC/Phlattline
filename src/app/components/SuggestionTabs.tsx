"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/app/components/Card";
import { Button } from "@/app/components/button-sidebar";
import Spinner from "@/app/components/Spinner"; // Import Spinner component
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import PaymentPopup from "@/app/components/PaymentPopup"; // Import PaymentPopup component
import EmployeeModal from "@/app/components/employeeModal"; // Import EmployeeModal component
import {
  resetSuccess,
  resetError,
} from "@/redux/slices/performanceManagement.slice"; // Redux actions

const SuggestionTabs: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false); // State to control PaymentPopup modal
  const [isBought, setIsBought] = useState(false); // State to track purchase status
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control EmployeeModal
  const { userData } = useSelector((state: RootState) => state.auth);
  const userType = userData?.user_type_id;
  const suggestions = [
    "Improve time management",
    "Increase productivity",
    "Enhance team collaboration",
  ];

  const existingCards = []; // Replace with actual existing cards if necessary
  const isAssessmentId = 123; // Replace with actual assessment ID
  const coursesAssign = {}; // Replace with actual courses to be assigned
  const courseId = 1; // Replace with actual course ID

  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulate loading delay

    return () => clearTimeout(timer);
  }, []);

  const handleBuyClick = () => {
    setIsOpen(true); // Open the PaymentPopup when "Buy" is clicked
    // setIsBought(true);
  };

  const handleAssignClick = () => {
    setIsModalOpen(true); // Open the EmployeeModal when "Assign" is clicked
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close EmployeeModal
    dispatch(resetSuccess());
    dispatch(resetError());
  };

  return (
    <div>
      {loading ? (
        <Card className="w-full h-full p-8 bg-gradient-to-b from-[#62626280] to-[#2D2C2C80]">
          <Spinner height="30px" width="30px" />
        </Card>
      ) : suggestions.length > 0 ? (
        <Card className="w-full p-7">
          <CardContent>
            <ul className="flex space-x-6">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="flex items-center space-x-4 p-10 bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] rounded-3xl"
                >
                  <span className="text-lg">{suggestion}</span>
                  {userType === 2 ? (
                    !isBought ? (
                      <Button
                        color="primary"
                        className="rounded-3xl"
                        onClick={handleBuyClick} // Show PaymentPopup on Buy
                      >
                        Buy
                      </Button>
                    ) : (
                      <Button
                        color="primary"
                        className="rounded-3xl"
                        onClick={handleAssignClick} // Show EmployeeModal on Assign
                      >
                        Assign
                      </Button>
                    )
                  ) : (
                    <Button color="primary" className="rounded-3xl">
                      Take
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full h-full p-10 bg-gradient-to-b from-[#62626280] to-[#2D2C2C80]">
          No suggestions available.
        </Card>
      )}

      {/* <PaymentPopup
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setIsBought={setIsBought} // Set isBought to true after purchase
        cards={existingCards}
        isAssessmentId={isAssessmentId}
      />

      <EmployeeModal
        open={isModalOpen}
        coursesAssign={coursesAssign}
        courseId={Number(courseId)} // Pass courseId as a number
        onClose={handleCloseModal}
        handleStateManage={handleCloseModal} // Manage state when closing the modal
      /> */}
    </div>
  );
};

export default SuggestionTabs;
