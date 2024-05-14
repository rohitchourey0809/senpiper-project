import { useEffect, useState } from "react";
import SubmissionTable from "./components/SubmissionTable";
import Form from "./components/Form";
import SubmissionMessage from "./components/SubmissionMessage";
import "./App.css";

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    // Load submissions from browser storage on initial render
    const savedSubmissions =
      JSON.parse(localStorage.getItem("submissions")) || [];
    setSubmissions(savedSubmissions);
  }, []); // Empty dependency array to run only once

  const handleSubmit = (formData) => {
    // Store data locally
    localStorage.setItem("feedbackData", JSON.stringify(formData));
    // Update submissions list
    const newSubmission = { ...formData };
    setSubmissions([...submissions, newSubmission]);
    localStorage.setItem(
      "submissions",
      JSON.stringify([...submissions, newSubmission])
    );
    // Display submission message
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setShowTable(true);
  };

  return (
    <div className="App">
      {!submitted && !showTable && (
        <div>
          <h1>Aromatic Bar</h1>
          <Form onSubmit={handleSubmit} />
        </div>
      )}
      {submitted && <SubmissionMessage onClose={handleClose} />}
      {showTable && (
        <div>
          {submissions.length > 0 ? (
            <div>
              <SubmissionTable submissions={submissions} />
            </div>
          ) : (
            <h2>No submissions yet</h2>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
