import React, { useState } from 'react';

const ErrorMessage = ({ message, handleDismiss }) => {
 

  const handleDismissClick = () => {
    handleDismiss();
  };

  return (
    <>
      
        <div className="error-message-popup">
          <div className="error-message">
            {message}
          </div>
          <button className="dismiss-button" onClick={handleDismissClick}>Dismiss</button>
        </div>
     
    </>
  );
};

export default ErrorMessage;