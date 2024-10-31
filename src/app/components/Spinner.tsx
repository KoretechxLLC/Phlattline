import React from 'react';

interface SpinnerProps {
  height?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ height = '100vh' }) => {
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
    height, 
  };

  return (
    <div style={spinnerContainerStyle}>
      <div style={spinnerStyle}></div>
    </div>
  );
};

export default Spinner;
