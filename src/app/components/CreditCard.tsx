"use client";

import React, { useState, Dispatch, SetStateAction } from "react"; // Import necessary hooks
import Image from "next/image";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/app/components/button-sidebar";

type Focused = "number" | "expiry" | "cvc" | "name" | "";

const CreditCard = () => {
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "" as Focused, // Initialize focus as type Focused
  });

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt: React.FocusEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, focus: evt.target.name as Focused })); // Cast to Focused type
  };

  const cardData = [
    {
      id: 1,
      cardNo: "**** **** **** 1234",
      name: "John Doe",
      expiry: "12/25",
    },
    {
      id: 2,
      cardNo: "**** **** **** 5678",
      name: "Jane Smith",
      expiry: "05/26",
    },
    // Additional cards can be added here
  ];

  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage the popup visibility

  const togglePopup = () => {
    setIsPopupOpen((prev) => !prev); // Toggle the popup state
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    // Handle form submission logic (e.g., API call)
    alert("Payment Submitted!");
    togglePopup(); // Close the popup after submission
  };

  return (
    <div className="flex flex-wrap justify-center space-y-6 md:space-y-0 md:space-x-5">
      {cardData.map((item) => (
        <div
          key={item.id}
          className="relative p-4 bg-gradient-to-b from-[#0F0F0F] to-purple-800 rounded-xl text-white w-full max-w-[400px] min-h-[200px] md:w-[350px] md:min-h-[250px] lg:w-[400px] xl:w-[450px] flex flex-col justify-between"
        >
          <Image
            src="/assets/map.svg"
            alt=""
            layout="fill"
            className="object-cover rounded-md"
          />
          <div className="relative z-10 flex flex-col h-full">
            <div className="text-base md:text-lg font-semibold absolute top-4 left-4">
              {item.name}
            </div>
            <div className="text-base md:text-lg absolute left-4 top-16">
              Card No: <br /> {item.cardNo}
            </div>
            <div className="text-xs md:text-sm text-opacity-75 absolute bottom-4 left-4">
              Expiry Date: {item.expiry}
            </div>
          </div>
        </div>
      ))}

      {/* Add New Card Button */}
      <div
        className="relative p-4 border border-gray-500 rounded-xl text-white w-full max-w-[400px] min-h-[200px] md:w-[350px] md:min-h-[250px] lg:w-[400px] xl:w-[450px] flex flex-col items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
        onClick={togglePopup} // Open the popup when clicked
      >
        <div className="text-4xl mb-2 text-red-500">+</div>
        <div className="text-base md:text-lg text-red-500 font-semibold">
          Add a New Card
        </div>
      </div>

      {/* Spring Modal for Adding New Card */}
      <SpringModal
        isOpen={isPopupOpen}
        setIsOpen={setIsPopupOpen}
        state={state}
        setState={setState}
        handleInputChange={handleInputChange}
        handleInputFocus={handleInputFocus}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

const SpringModal = ({
  isOpen,
  setIsOpen,
  state,
  setState,
  handleInputChange,
  handleInputFocus,
  handleSubmit,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  state: any; // Define a more specific type based on your needs
  setState: Dispatch<SetStateAction<any>>;
  handleInputChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputFocus: (evt: React.FocusEvent<HTMLInputElement>) => void;
  handleSubmit: (evt: React.FormEvent<HTMLFormElement>) => void;
}) => {
  // Close the modal when clicking outside of it
  const closeModal = (evt: React.MouseEvent<HTMLDivElement>) => {
    if (evt.target === evt.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={closeModal} // Close modal on outside click
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="bg-white rounded-lg p-6"
          >
            <h1 className="text-2xl text-black">Add Payment Details</h1>
            <Cards
              number={state.number}
              expiry={state.expiry}
              cvc={state.cvc}
              name={state.name}
              focused={state.focus} // Use focused state to control card display
            />
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-6 my-2">
                {" "}
                {/* Align inputs vertically */}
                <input
                  type="tel"
                  name="number"
                  placeholder="Card Number"
                  value={state.number}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  className="border p-2 rounded-lg text-black" // Add styling here
                  required
                />
                <input
                  type="text"
                  name="name"
                  placeholder="Cardholder Name"
                  value={state.name}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  className="border p-2 rounded-lg text-black" // Add styling here
                  required
                />
                <div className="flex space-x-4">
                  <input
                    type="text"
                    name="expiry"
                    placeholder="MM/YY"
                    value={state.expiry}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    className="border p-2 rounded-lg text-black w-full" // Add styling here
                    required
                  />
                  <input
                    type="tel"
                    name="cvc"
                    placeholder="CVC"
                    value={state.cvc}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    className="border p-2 rounded-lg text-black w-full" // Add styling here
                    required
                  />
                </div>
              </div>
              <Button color="primary" type="submit">
                Submit Payment
              </Button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreditCard;
