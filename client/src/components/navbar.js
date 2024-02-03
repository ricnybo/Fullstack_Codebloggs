//navbar.js
import { NavLink } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import "./components.css/navbar.css";
import PostModal from "./postModal.js";
import React, { useState, useContext } from "react";
import { setCookie } from "react-use-cookie";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext"; // import the AuthContext

function Navbar({ onLogout, openPostModal }) {
  const { isLoggedIn, setIsLoggedIn, user, setUser, setValidSession } =
    useContext(AuthContext); // Use useContext to get isLoggedIn and setIsLoggedIn

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async (event) => {
    event.preventDefault(); // Prevent the default action of the link

    try {
      // Make a GET request to the logout API to logou of the sever.
      const response = await axios.post("/user/logout");
    } catch (error) {
      console.error("Logout failed", error);
    }
    // Logs out no matter what
    // Clear the token from local storage and the session token from the cookie
    localStorage.removeItem("token");
    setCookie("session_token", "", -1); // Clear session token from cookie
    setIsLoggedIn(false);
    setUser({});
    setValidSession(false);
    toast.success("Logout successfull.", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    navigate("/login"); // Redirect to login page
  };

  const handleSettings = () => {
    // Implement settings functionality here
    toast.success("Settings clicked.", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <div className="navbarr">
      <nav className="nav navbar navbar-expand-lg">
        <NavLink className="" to="/">
          <img
            alt="CodeBloggs logo"
            style={{ width: "40%" }}
            src="./img/CodeBloggslogo.png"
          ></img>
        </NavLink>

        {isLoggedIn && <PostModal />}

        {isLoggedIn && (
          <div className="ml-auto user-btn">
            <Dropdown>
              <Dropdown.Toggle variant="" id="dropdown-basic">
                {user.email
                  ? `Hello, ${user.first_name} ${user.last_name}`
                  : "User"}
              </Dropdown.Toggle>

              <Dropdown.Menu className="options">
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                <Dropdown.Item onClick={handleSettings}>Settings</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
