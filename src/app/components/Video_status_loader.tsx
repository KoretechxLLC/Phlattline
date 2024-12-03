import React from "react";

interface LoaderProps {
  size?: string; // Allow flexible sizing
  color?: string; // Allow dynamic color customization
}

const Loader: React.FC<LoaderProps> = ({ size = "25px", color = "#B50D34" }) => {
  const loaderStyle = {
    display: "inline-block",
    width: size,
    height: size,
    border: `4px solid ${color}`,
    borderRadius: "50%",
    borderTop: "4px solid #BAA716",
    animation: "spin 1s linear infinite",
    marginRight:"21px"
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%", // Full height to center loader vertically
  };

  return (
    <div style={containerStyle}>
      <div style={loaderStyle}></div>
      <style>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;