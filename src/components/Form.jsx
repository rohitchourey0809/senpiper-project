import React, { useState } from "react";

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
    } else if (!isValidPhone(phone)) {
      errors.phone = "Please enter a valid 10-digit phone number.";
    }
    return errors;
  };

  const isValidEmail = (email) => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone) => {
    // Check if phone number has 10 digits
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
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
          minlength="2"
          maxlength="20"
         
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
          required
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          pattern="[0-9]{10}"
          maxLength={10}
          required
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
