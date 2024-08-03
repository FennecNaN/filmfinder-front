import React from 'react';
import './AlertMessage.css';

const AlertMessage = ({ message, onClose }) => {
  return (
    <div className="alert-overlay">
      <div className="alert-message">
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AlertMessage;
