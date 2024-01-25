import React, { useState } from "react";
import "./components.css/login.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Login() {
  const [isLogin, setIsLogin] = useState(true); // State to track whether login or signup form is displayed
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    birthday: new Date()
    // Add additional fields for signup if needed
  });

  const handleFormToggle = () => {
    setIsLogin(!isLogin); // Toggle between login and signup forms
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => { // Define handleDateChange function
    setFormData((prevData) => ({
      ...prevData,
      birthday: date
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for handling form submission based on whether it's login or signup
    if (isLogin) {
      // Handle login form submission
    } else {
      // Handle signup form submission
    }
  };

  return (
    <div className="login-page">
    <div className="login-container">
    <h2 className= "log-sign">{isLogin ? "Login" : "Sign Up"}</h2>
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
      </div>
      {!isLogin && (
            <>
      <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="birthday">Birthday</label>
            <DatePicker className= "dateBox"
              selected={formData.birthday}
              onChange={handleDateChange}
              dateFormat="MM/dd/yyyy" // Customize date format
              showYearDropdown
              scrollableYearDropdown
              maxDate={new Date(2025, 12, 31)}
              yearDropdownItemNumber={60}
            />
          </div>
          </>
      )}
      <div className="form-group">
        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
      </div>
    </form>
    <p className="register">
      {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
      <button 
      type= "button"
      className="login-button" 
      onClick={handleFormToggle}>
        {isLogin ? "Sign Up" : "Login"}
      </button>
    </p>
  </div>
  </div>
  );
}

export default Login;