// Form.js
import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
// import "./Form.css";

function Form({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    beverage: "",
    cleanliness: "",
    overallExperience: "",
  });
  const [errors, setErrors] = useState({});

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
      onSubmit(formData);
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

  return (
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
          1. Please rate the quality of the service you received from your host:
        </label>
        <div className="checkbox-group">
          {["Excellent", "Good", "Fair", "Bad"].map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="service"
                value={option}
                onChange={(e) => handleChange("service", e.target.value)}
              />{" "}
              {option}
            </label>
          ))}
        </div>
      </div>
      <div className="form-group">
        <label>2. Please rate the quality of your beverage:</label>
        <div className="checkbox-group">
          {["Excellent", "Good", "Fair", "Bad"].map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="beverage"
                value={option}
                onChange={(e) => handleChange("beverage", e.target.value)}
              />{" "}
              {option}
            </label>
          ))}
        </div>
      </div>
      <div className="form-group">
        <label>3. Was our restaurant clean?</label>
        <div className="checkbox-group">
          {["Excellent", "Good", "Fair", "Bad"].map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="cleanliness"
                value={option}
                onChange={(e) => handleChange("cleanliness", e.target.value)}
              />{" "}
              {option}
            </label>
          ))}
        </div>
      </div>
      <div className="form-group">
        <label>4. Please rate your overall dining experience:</label>
        <div className="checkbox-group">
          {["Excellent", "Good", "Fair", "Bad"].map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="overallExperience"
                value={option}
                onChange={(e) =>
                  handleChange("overallExperience", e.target.value)
                }
              />{" "}
              {option}
            </label>
          ))}
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
