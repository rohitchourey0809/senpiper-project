import React from "react";
import "./Submision.css";

function SubmissionMessage({ onClose }) {
  return (
    <div className="submission-container">
      <div className="submission-message">
        <div className="tick-sign">&#10004;</div>
      </div>
      <div>
        <p>Thank you for completing the information.</p>
      </div>
      <div className="submit-button-container">
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default SubmissionMessage;
