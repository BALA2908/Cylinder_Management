// src/components/Popup.js
import React from "react";
import "./Popup.js";

const Popup = ({ message, onClose }) => {
  return (
    <div className="popup">
      <div className="popup-inner">
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;
