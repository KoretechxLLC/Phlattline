"use client";

import React, { useState } from "react"; // Import necessary hooks
import Image from "next/image";
import PaymentPopup from "@/app/components/PaymentPopup";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { formatCreditCardNumber, formatCVC } from "../lib/utils";

type Focused = "number" | "expiry" | "cvc" | "name" | "";

const CreditCard = () => {
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "" as Focused, // Initialize focus as type Focused
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let formattedValue = value;

    // Validate input length based on field
    if (name === "number") {
      formattedValue = formatCreditCardNumber(value);
      if (formattedValue.replace(/\s/g, "").length > 19) return; // Limit to 19 digits
    } else if (name === "cvc") {
      formattedValue = formatCVC(value);
      if (formattedValue.length > 3) return; // Limit to 3 digits
    } else if (name === "name") {
      if (value.length > 30) return; // Limit to 30 characters
    }

    setState({ ...state, [name]: formattedValue });
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
  ];

  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage the popup visibility

  const togglePopup = () => {
    setIsPopupOpen((prev) => !prev); // Toggle the popup state
  };

  return (
    <div className="flex flex-row justify-center gap-4">
      {cardData.map((item) => (
        <div
          key={item.id}
          className="relative gap-4 p-4 bg-gradient-to-b from-[#0F0F0F] to-purple-800 rounded-xl text-white w-full max-w-[400px] min-h-[200px] 4xl:min-h-[170px] md:w-[350px] md:min-h-[250px] 4xl:w-[400px] lg:w-[400px] xl:w-[450px] flex flex-col justify-between"
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
            <div className="text-base md:text-lg absolute left-4 4xl:top-14 top-16">
              Card No: <br /> {item.cardNo}
            </div>
            <div className="text-xs md:text-sm text-opacity-75 absolute 4xl:bottom-1 bottom-8 left-4">
              Expiry Date: {item.expiry}
            </div>
          </div>
        </div>
      ))}

      {/* Add New Card Button */}
      <div
        className="relative p-4 border border-gray-500 rounded-xl text-white w-full max-w-[400px] min-h-[200px] 4xl:min-h-[170px] md:w-[350px] md:min-h-[250px] lg:w-[400px] xl:w-[450px] flex flex-col items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
        onClick={togglePopup} // Open the popup when clicked
      >
        <div className="text-4xl mb-2 text-red-500">+</div>
        <div className="text-base md:text-lg text-red-500 font-semibold">
          Add a New Card
        </div>
      </div>

      {/* Payment Popup */}
      <PaymentPopup
        isOpen={isPopupOpen}
        setIsOpen={setIsPopupOpen}
        showOnlyForm={true} // Assuming you want to show only the form
      />
    </div>
  );
};

export default CreditCard;
