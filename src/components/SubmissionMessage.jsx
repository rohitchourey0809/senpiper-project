function SubmissionMessage({ onClose }) {
  return (
    <div>
      <p>Thank you for completing the information.</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default SubmissionMessage;
