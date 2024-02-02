// login.js is a component that will display the login form. It will also handle the submission of the form and authenticate the user.
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext"; // import the AuthContext
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./components.css/login.css"; // import the CSS file
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCookie } from "react-use-cookie";

import "./components.css/login.css";
import "react-datepicker/dist/react-datepicker.css";

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
      const response = await axios.post("/user/login", {
        email: email,
        password: password,
      });
      if (response.data.valid === false) {
        throw new Error(response.data.message);
      }

      // session authentication
      const user_id = response.data.data.user._id; // Access the user's ID from the response

      const session_response = await axios.post(`/session/${user_id}`); // Create a new session for the user
      const session_token = getCookie("session_id"); // Access the session token from the cookie
      const getUser = await axios.get(`/user/${user_id}`); // Access the user's data using the user's ID
      // If authentication is successful, update `user` with the user's data
      setUser({
        user_id: getUser.data.data.user.user_id,
        first_name: getUser.data.data.user.first_name,
        last_name: getUser.data.data.user.last_name,
        birthday: getUser.data.data.user.birthday,
        email: getUser.data.data.user.email,
        status: getUser.data.data.user.status,
        location: getUser.data.data.user.location,
        occupation: getUser.data.data.user.occupation,
        auth_level: getUser.data.data.user.auth_level,
      });
      setIsLoggedIn(true);

      // Send a GET request to the validate_token endpoint
      await axios
        .get("/validate_token")
        .then((response) => {
          // If the session is valid, set validSession to true
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

  // useEffect(() => {
  //   console.log(user);
  // }, [user]); // This will run every time `user` changes. For troubleshooting purposes.

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form">
          <img
            alt="CodeBloggs logo"
            style={{ width: "100%" }}
            src="./img/CodeBloggslogo.png"
          ></img>
          <h2>Login</h2>
          <br />
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
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
            <p></p>
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
