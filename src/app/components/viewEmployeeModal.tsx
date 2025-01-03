"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MdDateRange, MdEmail, MdPerson, MdWork } from "react-icons/md";
import Image from "next/image";

export type ModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  employeeId: number;
  singleEmployeeData?: any;
};

const data = [
  {
    id: 1,
    employees: {
      name: "John Doe",
      image: "/assets/DummyImg.png",
      designation: "Software Engineer",
    },
    status: "pending",
    action: null,
  },
  {
    id: 2,
    employees: {
      name: "Jane Smith",
      image: "/assets/DummyImg.png",
      designation: "Project Manager",
    },
    status: "Approved",
    action: null,
  },
  {
    id: 3,
    employees: {
      name: "Andy Harold",
      image: "/assets/DummyImg.png",
      designation: "UI/UX",
    },
    status: "Rejected",
    action: null,
  },
];

export const ViewEmployeeModal: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  employeeId,
  singleEmployeeData,
}) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [designation, setDesignation] = useState<string>("");
  const [date, setDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const sixteenYearsAgo = new Date(
    new Date().setFullYear(new Date().getFullYear() - 16)
  );

  const handleContinue = () => {
    setLoading(true);

    if (!firstName || !lastName || !designation || !date) {
      setNotification("Please fill in all fields.");
      setLoading(false);
      return;
    }

    // Simulate successful scheduling (replace with actual logic)
    setTimeout(() => {
      setLoading(false);
      setIsOpen(false);
      setNotification("Interview scheduled successfully!");
    }, 1000);
  };

  useEffect(() => {
    // Clear notification after 3 seconds
    if (notification) {
      const timeout = setTimeout(() => {
        setNotification(null);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [notification]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-16 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white  rounded-xl w-full max-w-lg shadow-xl cursor-default relative overflow-hidden border-2 border-white"
          >
            {/* Flex container to align fields and image */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              {/* Left Side - Form Fields */}
              <div className="flex-1 p-4 rounded-xl">
                {/* First Name Input */}
                <div className="relative py-4 my-2 border border-[#62626280] rounded-2xl">
                  <span className="text-black  mx-3">
                    {singleEmployeeData?.first_name}
                  </span>
                  <MdPerson className="absolute top-1/2 right-5 transform -translate-y-1/2 text-gray-500" />
                </div>

                {/* Last Name Input */}
                <div className="relative py-4 my-2 border border-[#62626280] rounded-2xl">
                  <span className="text-black  mx-3">
                    {singleEmployeeData?.last_name}
                  </span>
                  <MdPerson className="absolute top-1/2 right-5 transform -translate-y-1/2 text-gray-500" />
                </div>

                {/* Email Input (Disabled) */}
                <div className="relative py-4 my-2 border border-[#62626280] rounded-2xl">
                  <span className="text-black  mx-3">
                    {singleEmployeeData?.email}
                  </span>
                  <MdEmail className="absolute top-1/2 right-5 transform -translate-y-1/2 text-gray-500" />
                </div>

                {/* Designation Input */}
                <div className="relative py-4 my-2 border border-[#62626280] rounded-2xl">
                  <span className="text-black  mx-3">
                    {singleEmployeeData?.designation}
                  </span>
                  <MdWork className="absolute top-1/2 right-5 transform -translate-y-1/2 text-gray-500" />
                </div>

                {/* Date Picker */}
                <div className="relative py-4 my-2 border border-[#62626280] rounded-2xl">
                  <span className="text-black  mx-3">
                    {singleEmployeeData?.date_of_birth &&
                      new Date(
                        singleEmployeeData?.date_of_birth
                      ).toLocaleDateString("en-US")}
                  </span>
                  <MdDateRange className="absolute top-1/2 right-5 transform -translate-y-1/2 text-gray-500" />
                </div>
              </div>

              {/* Right Side - Image */}
              <div className="w-52 h-52 ring-4 ring-[#000] my-10 mx-3 flex items-center justify-center rounded-full overflow-hidden">
                {singleEmployeeData?.profile_image ? (
                  <Image
                    src={`/api/images?filename=${singleEmployeeData?.profile_image}&folder=profileImage`}
                    alt={"Unknown"}
                    width={240}
                    height={240}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-56 h-52 ring-4 ring-white md:mt-0 mt-3 flex items-center justify-center bg-gradient-to-b from-[#BAA716] to-[#B50D34] rounded-full">
                    <span className="text-white text-2xl md:text-8xl font-bold pt-3">
                      {singleEmployeeData?.first_name?.charAt(0).toUpperCase() +
                        singleEmployeeData?.last_name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
