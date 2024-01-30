

import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext"; // import the AuthContext
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import "../Styles/Login.css"; // import the CSS file
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCookie } from "react-use-cookie";

import "./components.css/login.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import bcrypt from "bcryptjs";

// This component will display the login form.
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const {
    setIsLoggedIn,
    isLoggedIn,
    setUser,
    user,
    validSession,
    setValidSession,
  } = useContext(AuthContext);

  // This function will handle the submission.
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // JWT authentication
      const response = await axios.post("http://localhost:5000/user/login", {
        email: email,
        password: password,
      });
      if (response.data.valid === false) {
        throw new Error(response.data.message);
      };
      // localStorage.setItem("token", response.data.token); // JWT authentication
      // axios.defaults.headers.common[
      //   "Authorization"
      // ] = `Bearer ${response.data.token}`; // JWT authentication header

      // session authentication
      const user_id = response.data.data.user._id; // Access the user's ID from the response
      
      const session_response = await axios.post(
        `http://localhost:5000/session/${user_id}`
      ); // Create a new session for the user
      const session_token = getCookie("session_id"); // Access the session token from the cookie
      const user = await axios.get(
        `http://localhost:5000/user/${user_id}`
      ); // Access the user's data using the user's ID
      console.log(user);
      // If authentication is successful, update `user` with the user's data
      setUser({
        user_id: user.data.data.user.user_id,
        first_name: user.data.data.user.first_name,
        last_name: user.data.data.user.last_name,
        birthday: user.data.data.user.birthday,
        email: user.data.data.user.email,
        status: user.data.data.user.status,
        location: user.data.data.user.location,
        occupation: user.data.data.user.occupation,
        auth_level: user.data.data.user.auth_level,
      });
      setIsLoggedIn(true);

      // Send a GET request to the validate_token endpoint
      await axios
        .get("http://localhost:5000/validate_token" )
        .then((response) => {
          // If the session is valid, set validSession to true
          console.log(response.data.data.valid);
          if (response.data.data.valid) {
            setValidSession(true);
          }
        })
        .catch((err) => {
          console.error(err);
        });

      toast.success("Login successfull.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate("/home"); // navigate to the Home page
    } catch (error) {
      console.error(error);
      toast.error("Login failed: " + error.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      if (error.response && error.response.status === 401) {
        navigate("/unauthorized", {
          state: { message: error.response.data },
        });
      }
    }
  };

  // If the user is logged in and has a valid session, navigate away from the login page
  useEffect(() => {
    if (isLoggedIn && validSession) {
      navigate("/home");
    }
  }, []);

  return (

    <div className="login-form">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Log In
        </Button>
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </Form>
    </div>
  );
}

export default Login;