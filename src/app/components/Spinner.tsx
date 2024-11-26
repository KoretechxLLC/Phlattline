import React from "react";

interface SpinnerProps {
  height?: string;
  width?: string; // Define height as a string to allow flexible sizing
}

const Spinner: React.FC<SpinnerProps> = ({ height, width }) => {
  const spinnerStyle = {
    border: "3px solid #B50D34", // Light grey
    borderTop: "3px solid #BAA716", // Blue
    borderRadius: "50%",
    width: width ? width : "50px",
    height: height ? height : "50px",
    animation: "spin 1s linear infinite",
    display: "inline-block",
  };

  const spinnerContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: height, // Use the height prop
  };

  return (
    <div style={spinnerContainerStyle}>
      <div style={spinnerStyle}></div>
    </div>
  );
};

export default Spinner;
