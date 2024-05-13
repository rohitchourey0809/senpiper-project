// App.js
import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "./App.css";
import { useTable } from "react-table";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    beverage: "",
    cleanliness: "",
    overallExperience: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    // Load submissions from browser storage on initial render
    const savedSubmissions =
      JSON.parse(localStorage.getItem("submissions")) || [];
    setSubmissions(savedSubmissions);
  }, []);

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear errors when user starts typing
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form validation
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
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
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const { name, email, phone } = formData;
    const errors = {};
    if (!name) {
      errors.name = "Name is required.";
    }
    if (!email) {
      errors.email = "Email is required.";
    } else if (!isValidEmail(email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!phone) {
      errors.phone = "Phone number is required.";
    }
    return errors;
  };

  const isValidEmail = (email) => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const columns = [
    { Header: "Name", accessor: "name" },
    { Header: "Email", accessor: "email" },
    { Header: "Phone", accessor: "phone" },
    { Header: "Service", accessor: "service" },
    { Header: "Beverage", accessor: "beverage" },
    { Header: "Cleanliness", accessor: "cleanliness" },
    { Header: "Overall Experience", accessor: "overallExperience" },
  ];

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: submissions });

  return (
    <div className="App">
      <h1>Aromatic Bar Feedback Form</h1>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Customer Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <PhoneInput
              id="phone"
              name="phone"
              country="US" // Set default country
              value={formData.phone}
              onChange={(value) => handleChange("phone", value)}
              placeholder="Enter phone number"
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>
          <p>Please rate the following aspects of your dining experience:</p>
          <div className="form-group">
            <label>
              1. Please rate the quality of the service you received from your
              host:
            </label>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="service"
                  value="Excellent"
                  onChange={(e) => handleChange("service", e.target.checked)}
                />{" "}
                Excellent
              </label>
              <label>
                <input
                  type="checkbox"
                  name="service"
                  value="Good"
                  onChange={(e) => handleChange("service", e.target.checked)}
                />{" "}
                Good
              </label>
              <label>
                <input
                  type="checkbox"
                  name="service"
                  value="Fair"
                  onChange={(e) => handleChange("service", e.target.checked)}
                />{" "}
                Fair
              </label>
              <label>
                <input
                  type="checkbox"
                  name="service"
                  value="Bad"
                  onChange={(e) => handleChange("service", e.target.checked)}
                />{" "}
                Bad
              </label>
            </div>
          </div>
          <div className="form-group">
            <label>2. Please rate the quality of your beverage:</label>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="beverage"
                  value="Excellent"
                  onChange={(e) => handleChange("beverage", e.target.checked)}
                />{" "}
                Excellent
              </label>
              <label>
                <input
                  type="checkbox"
                  name="beverage"
                  value="Good"
                  onChange={(e) => handleChange("beverage", e.target.checked)}
                />{" "}
                Good
              </label>
              <label>
                <input
                  type="checkbox"
                  name="beverage"
                  value="Fair"
                  onChange={(e) => handleChange("beverage", e.target.checked)}
                />{" "}
                Fair
              </label>
              <label>
                <input
                  type="checkbox"
                  name="beverage"
                  value="Bad"
                  onChange={(e) => handleChange("beverage", e.target.checked)}
                />{" "}
                Bad
              </label>
            </div>
          </div>
          <div className="form-group">
            <label>3. Was our restaurant clean?</label>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="cleanliness"
                  value="Excellent"
                  onChange={(e) =>
                    handleChange("cleanliness", e.target.checked)
                  }
                />{" "}
                Excellent
              </label>
              <label>
                <input
                  type="checkbox"
                  name="cleanliness"
                  value="Good"
                  onChange={(e) =>
                    handleChange("cleanliness", e.target.checked)
                  }
                />{" "}
                Good
              </label>
              <label>
                <input
                  type="checkbox"
                  name="cleanliness"
                  value="Fair"
                  onChange={(e) =>
                    handleChange("cleanliness", e.target.checked)
                  }
                />{" "}
                Fair
              </label>
              <label>
                <input
                  type="checkbox"
                  name="cleanliness"
                  value="Bad"
                  onChange={(e) =>
                    handleChange("cleanliness", e.target.checked)
                  }
                />{" "}
                Bad
              </label>
            </div>
          </div>
          <div className="form-group">
            <label>4. Please rate your overall dining experience:</label>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="overallExperience"
                  value="Excellent"
                  onChange={(e) =>
                    handleChange("overallExperience", e.target.checked)
                  }
                />{" "}
                Excellent
              </label>
              <label>
                <input
                  type="checkbox"
                  name="overallExperience"
                  value="Good"
                  onChange={(e) =>
                    handleChange("overallExperience", e.target.checked)
                  }
                />{" "}
                Good
              </label>
              <label>
                <input
                  type="checkbox"
                  name="overallExperience"
                  value="Fair"
                  onChange={(e) =>
                    handleChange("overallExperience", e.target.checked)
                  }
                />{" "}
                Fair
              </label>
              <label>
                <input
                  type="checkbox"
                  name="overallExperience"
                  value="Bad"
                  onChange={(e) =>
                    handleChange("overallExperience", e.target.checked)
                  }
                />{" "}
                Bad
              </label>
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <p>Thank you for completing the information.</p>
        </div>
      )}
      <h2>Submissions</h2>
      <table {...getTableProps()} className="submission-table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
