import React from 'react';

const Spinner = () => {
  const spinnerStyle = {
    border: '3px solid #B50D34', // Light grey
    borderTop: '3px solid #BAA716', // Blue
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    animation: 'spin 1s linear infinite',
    display: 'inline-block',
  };

  const spinnerContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Center the spinner in the viewport
  };

  return (
    <div style={spinnerContainerStyle}>
      <div style={spinnerStyle}></div>
    </div>
  );
};

export default Spinner;

