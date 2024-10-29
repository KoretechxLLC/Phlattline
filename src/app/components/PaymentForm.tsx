import React, { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

// Define the type for the focus field
type Focused = "number" | "expiry" | "cvc" | "name" | "";

const PaymentForm = () => {
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

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    alert("Payment Submitted!");
    // Handle form submission logic (e.g., API call)
  };

  return (
    <div>
      <Cards
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
        focused={state.focus} // Use focused state to control card display
      />
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="tel"
            name="number"
            placeholder="Card Number"
            value={state.number}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Cardholder Name"
            value={state.name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="expiry"
            placeholder="MM/YY"
            value={state.expiry}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            required
          />
        </div>
        <div>
          <input
            type="tel"
            name="cvc"
            placeholder="CVC"
            value={state.cvc}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            required
          />
        </div>
        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
};

export default PaymentForm;
