import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Icon from "@/app/components/utility-icon"; // Adjust the import if necessary
import { Button } from "@/app/components/button-sidebar"; // Adjust the import if necessary
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import DatePicker from "react-datepicker"; // Import DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker styles
import { formatCreditCardNumber, formatCVC } from "@/app/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { purchasingCourse } from "@/redux/slices/courses.slice";
import { RootState } from "@/redux/store";
import StackedNotifications from "./Stackednotification";
import Spinner from "./Spinner";

type Focused = "number" | "expiry" | "cvc" | "name" | "";

interface Card {
  id: string;
  number: string;
  name: string;
  expiry: string;
  cvc: string;
}

interface AssessmentPaymentProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setIsBought?: Dispatch<SetStateAction<boolean>>;
  cards?: Card[]; // Make cards prop optional
  showOnlyForm?: boolean; // New prop for conditional rendering
  courseId?: any;
  userId?: any;
}
export type NotificationType = {
  id: number;
  text: string;
  type: "error" | "success";
};
const AssessmentPaymentPopup: React.FC<AssessmentPaymentProps> = ({
  isOpen,
  setIsOpen,
  setIsBought,
  cards = [], // Default to an empty array if no cards are passed
  showOnlyForm = false, // Default to false
  courseId,
  userId,
}) => {
  const [state, setState] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    focus: "" as Focused,
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(false); // New state to control form visibility
  const [expiryDate, setExpiryDate] = useState<Date | null>(null); // State for date picker
  const [selectedCard, setSelectedCard] = useState<Card | null>(null); // State for selected card
  const [allCards, setAllCards] = useState<Card[]>(cards); // State to hold all cards
  const [addingNewCard, setAddingNewCard] = useState(false); // State to control new card form visibility
  const [cardAddedSuccess, setCardAddedSuccess] = useState(false); // New state to show success message after adding card
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const dispatch: any = useDispatch();
  const { purchaseCourseError, purchaseCourseSuccess } = useSelector(
    (state: RootState) => state.courses
  );

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setState({ ...state, focus: e.target.name as Focused });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let formattedValue = value;

    // Validate input length based on field
    if (name === "number") {
      formattedValue = formatCreditCardNumber(value);
      if (formattedValue.replace(/\s/g, "").length > 16) return; // Limit to 19 digits
    } else if (name === "cvc") {
      formattedValue = formatCVC(value);
      if (formattedValue.length > 3) return; // Limit to 3 digits
    } else if (name === "name") {
      if (value.length > 15) return; // Limit to 30 characters
    }

    setState({ ...state, [name]: formattedValue });
  };

  const handleExpiryChange = (date: Date | null) => {
    setExpiryDate(date);
    if (date) {
      const formatted = `${date.getMonth() + 1}/${date
        .getFullYear()
        .toString()
        .slice(-2)}`;
      setState({ ...state, expiry: formatted }); // Set formatted expiry in state
    } else {
      setState({ ...state, expiry: "" }); // Clear expiry if date is null
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newCard: Card = {
      id: Date.now().toString(), // Unique ID for the new card
      number: state.number,
      name: state.name,
      expiry: state.expiry,
      cvc: state.cvc,
    };
    setAllCards([...allCards, newCard]); // Add new card to the list
    setFormSubmitted(true); // Set to true to show success screen
    setShowForm(false); // Hide the form after adding
    setAddingNewCard(false); // Reset the state for adding new card
    setCardAddedSuccess(true); // Set to true to show success message after adding card
  };

  const handleContinue = async () => {
    if (userId && courseId) {
      setLoading(true); // Start loading
      await dispatch(
        purchasingCourse({ user_Id: userId, course_id: courseId })
      );

      // After loading, set formSubmitted to true to show the success screen
      setFormSubmitted(true);
    }
  };
  useEffect(() => {
    if (purchaseCourseSuccess) {
      setNotification({
        id: Date.now(),
        text: purchaseCourseSuccess,
        type: "success",
      });
      setLoading(false); // End loading
      setIsOpen(false);
      setCardAddedSuccess(false);
    }
  }, [purchaseCourseSuccess, setIsOpen]);
  useEffect(() => {
    if (purchaseCourseError) {
      setNotification({
        id: Date.now(),
        text: purchaseCourseError,
        type: "error",
      });
      setLoading(false); // End loading
      setIsOpen(false);
    }
  }, [purchaseCourseError, setIsOpen]);

  const handleAddPayment = () => {
    setShowForm(true); // Show the payment form
    setAddingNewCard(true); // Set state to indicate adding a new card
  };

  const handleCardSelect = (card: Card) => {
    setSelectedCard(card);
  };

  const handleConfirm = () => {
    if (selectedCard) {
      // Handle confirmation logic here (e.g., send the selected card to backend)
      setFormSubmitted(true); // Go to success screen
    }
  };

  return (
    <>
      <StackedNotifications
        notification={notification}
        setNotification={setNotification}
      />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0, rotate: "12.5deg" }}
              animate={{ scale: 1, rotate: "0deg" }}
              exit={{ scale: 0, rotate: "0deg" }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-red-800 to-[#27010A] text-white p-10 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)} // Close the modal
                className="absolute top-4 right-4 text-white focus:outline-none"
                aria-label="Close"
              >
                <Icon icon="mdi:close" className="w-6 h-6" />{" "}
                {/* Adjust icon as necessary */}
              </button>

              <div className="relative z-10 p-5 border rounded-xl my-6">
                {loading ? (
                  <div className="flex justify-center items-center h-full">
                    <Spinner /> {/* Display the spinner here */}
                  </div>
                ) : formSubmitted ? (
                  <>
                    {showOnlyForm ? ( // Conditional rendering based on showOnlyForm
                      <>
                        <h1 className="text-2xl text-white">
                          Add Payment Details
                        </h1>
                        <Cards
                          number={state.number}
                          expiry={state.expiry}
                          cvc={state.cvc}
                          name={state.name}
                          focused={state.focus}
                        />
                        <form onSubmit={handleSubmit}>
                          <div className="flex flex-col space-y-6 my-2">
                            <input
                              type="tel"
                              name="number"
                              placeholder="Card Number"
                              value={state.number}
                              onChange={handleInputChange}
                              onFocus={handleInputFocus}
                              className="border p-2 rounded-xl bg-gradient-to-br bg-red-500 to-[#ffffff] text-white"
                              required
                            />
                            <input
                              type="text"
                              name="name"
                              placeholder="Cardholder Name"
                              value={state.name}
                              onChange={handleInputChange}
                              onFocus={handleInputFocus}
                              className="border p-2 rounded-xl bg-gradient-to-br bg-red-500 to-[#ffffff] text-white"
                              required
                            />
                            <div className="flex space-x-4">
                              <DatePicker
                                selected={expiryDate}
                                onChange={handleExpiryChange}
                                placeholderText="MM/YY"
                                className="border p-2 rounded-xl bg-gradient-to-br bg-red-500 to-[#ffffff] text-white w-full"
                                dateFormat="MM/yy"
                                showMonthYearPicker
                                required
                              />
                              <input
                                type="tel"
                                name="cvc"
                                placeholder="CVC"
                                value={state.cvc}
                                onChange={handleInputChange}
                                onFocus={handleInputFocus}
                                className="border p-2 rounded-xl bg-gradient-to-br bg-red-500 to-[#ffffff] text-white"
                                required
                              />
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              type="submit"
                              className="text-white px-5 text-sm md:text-base lg:text-base flex w-full h-12 justify-center items-center rounded-3xl"
                              size="default"
                              color="primary"
                            >
                              Confirm
                            </Button>
                          </div>
                        </form>
                      </>
                    ) : allCards.length > 0 && !showForm ? (
                      <>
                        <h1 className="text- 2xl text-white">
                          Select a Payment Method
                        </h1>
                        <div className="flex flex-col space-y-4 my-4">
                          {allCards.map((card) => (
                            <div
                              key={card.id}
                              className={`border p-4 rounded-xl cursor-pointer ${
                                selectedCard?.id === card.id ? "bg-red-700" : ""
                              }`}
                              onClick={() => handleCardSelect(card)}
                            >
                              <Cards
                                number={card.number}
                                expiry={card.expiry}
                                cvc={card.cvc}
                                name={card.name}
                                focused={state.focus}
                              />
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2 mb-4">
                          <Button
                            onClick={handleConfirm}
                            className="text-white px-5 text-sm md:text-base lg:text-base flex w-full h-12 justify-center items-center rounded-3xl"
                            size="default"
                            color="primary"
                            disabled={!selectedCard}
                          >
                            Confirm
                          </Button>
                          <Button
                            onClick={() => setIsOpen(false)}
                            className="text-white px-5 text-sm md:text-base lg:text-base flex w-full h-12 justify-center items-center rounded-3xl"
                            size="default"
                            color="secondary"
                          >
                            Cancel
                          </Button>
                        </div>
                        <Button
                          onClick={handleAddPayment}
                          className="text-white px-5 text-sm md:text-base lg:text-base flex w-full h-12 justify-center items-center rounded-3xl"
                          size="default"
                          color="primary"
                        >
                          Add New Card
                        </Button>
                      </>
                    ) : showForm ? (
                      <>
                        <h1 className="text-2xl text-white">
                          Add Payment Details
                        </h1>
                        <Cards
                          number={state.number}
                          expiry={state.expiry}
                          cvc={state.cvc}
                          name={state.name}
                          focused={state.focus}
                        />
                        <form onSubmit={handleSubmit}>
                          <div className="flex flex-col space-y-6 my-2">
                            <input
                              type="tel"
                              name="number"
                              placeholder="Card Number"
                              value={state.number}
                              onChange={handleInputChange}
                              onFocus={handleInputFocus}
                              className="border p-2 rounded-xl bg-gradient-to-br bg-red-500 to-[#ffffff] text-white"
                              required
                            />
                            <input
                              type="text"
                              name="name"
                              placeholder="Cardholder Name"
                              value={state.name}
                              onChange={handleInputChange}
                              onFocus={handleInputFocus}
                              className="border p-2 rounded-xl bg-gradient-to-br bg-red-500 to-[#ffffff] text-white"
                              required
                            />
                            <div className="flex space-x-4">
                              <DatePicker
                                selected={expiryDate}
                                onChange={handleExpiryChange}
                                placeholderText="MM/YY"
                                className="border p-2 rounded-xl bg-gradient-to-br bg-red-500 to-[#ffffff] text-white w-full"
                                dateFormat="MM/yy"
                                showMonthYearPicker
                                required
                              />
                              <input
                                type="tel"
                                name="cvc"
                                placeholder="CVC"
                                value={state.cvc}
                                onChange={handleInputChange}
                                onFocus={handleInputFocus}
                                className="border p-2 rounded-xl bg-gradient-to-br bg-red-500 to-[#ffffff] text-white"
                                required
                              />
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              type="submit"
                              className="text-white px-5 text-sm md:text-base lg:text-base flex w-full h-12 justify-center items-center rounded-3xl"
                              size="default"
                              color="primary"
                            >
                              Confirm
                            </Button>
                            <Button
                              onClick={() => {
                                setShowForm(false); // Hide the form if cancel is clicked
                                setAddingNewCard(false); // Reset the state
                              }}
                              className="text-white px-5 text-sm md:text-base lg:text-base flex w-full h-12 justify-center items-center rounded-3xl"
                              size="default"
                              color="secondary"
                            >
                              Cancel
                            </Button>
                          </div>
                        </form>
                      </>
                    ) : (
                      <>
                        <h3 className="text-2xl text-white text-center">
                          There are no payment details
                        </h3>
                        <div className="flex justify-center mt-4">
                          <Button
                            onClick={handleAddPayment}
                            className="text-white px-5 text-sm md:text-base lg:text-base flex h-12 justify-center items-center rounded-3xl"
                            size="default"
                            color="primary"
                          >
                            Add Payment
                          </Button>
                        </div>
                      </>
                    )}
                  </>
                ) : cardAddedSuccess ? (
                  // Show success message after adding a card
                  <>
                    <div className="flex justify-center items-center h-full">
                      <Icon
                        icon="teenyicons:tick-circle-outline"
                        className="text-white w-20 h-20 text-3xl"
                      />
                    </div>
                    <h3 className="text-3xl font-bold text-center mx-5 text-[#009B21]">
                      Card Added Successfully!
                    </h3>
                    <p className="text-center mb-6">
                      Your card has been added successfully.
                    </p>
                    <div className="flex gap-2">
                      <Button
                        className="text-white px-5 text-sm md:text-base lg:text-base flex w-full h-12 justify-center items-center rounded-3xl"
                        size="default"
                        color="primary"
                        onClick={handleContinue}
                      >
                        Continue
                      </Button>
                    </div>
                  </>
                ) : (
                  // Show success message after payment confirmation
                  <>
                    <div className="flex justify-center items-center h-full">
                      <Icon
                        icon="teenyicons:tick-circle-outline"
                        className="text-white w-20 h-20 text-3xl"
                      />
                    </div>
                    <h3 className="text-3xl font-bold text-center mx-5 text-[#009B21]">
                      Success!
                    </h3>
                    <p className="text-center mb-6">
                      We are delighted to inform you that we received your
                      payment.
                    </p>
                    <div className="flex gap-2">
                      <Button
                        className="text-white px-5 text-sm md:text-base lg:text-base flex w-full h-12 justify-center items-center rounded-3xl"
                        size="default"
                        color="primary"
                        onClick={handleContinue}
                      >
                        Continue
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AssessmentPaymentPopup;
