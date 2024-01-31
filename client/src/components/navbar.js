// import React from "react";
// import { NavLink } from "react-router-dom";
// import Dropdown from "react-bootstrap/Dropdown";
// import "./components.css/navbar.css"
// import axios from "axios";

// function Navbar({ user, onLogout, handlePostClick }) {

//   //write logout function and settings function that only gives a toaster saying under construction
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     try {
//       const response = await axios.post("/api/posts", formData); // Route to your backend server
//       console.log("Post created successfully:", response.data);
//       // Close the modal or handle any other action
//     } catch (error) {
//       console.error("Error creating post:", error);
//     }
//   };

//   return (
//     <div>
//     <div className="navbar navbar-expand-lg navbar-light bg-light">
//       <NavLink className="" to="/">
//         <img
//           alt="MongoDB logo"
//           style={{ width: "40%" }}
//           src="./img/CodeBloggslogo2.png"
//         ></img>
//       </NavLink>

//       <div className="ml-auto d-flex">
//       <button className="btn btn-custom" onClick={handlePostClick}>
//         Post
//       </button>
//     </div>

//           <div className="ml-auto">
//             <Dropdown >
//               <Dropdown.Toggle variant="light" id="dropdown-basic">
//                 HELLO MATT
//               </Dropdown.Toggle>

//               <Dropdown.Menu>
//                 <Dropdown.Item
//                 // onClick={logout-function}
//                 >LOGOUT</Dropdown.Item>
//                 <Dropdown.Item
//                 // onClick={settings-function}
//                 >SETTINGS</Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>
//             </div>

//     </div>
//     </div>
//   );
// }

// export default Navbar;

//navbar.js
// import React from "react";
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
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext"; // import the AuthContext

function Navbar({ onLogout, handlePostClick }) {
  const { isLoggedIn, setIsLoggedIn, user, setUser, setValidSession } =
    useContext(AuthContext); // Use useContext to get isLoggedIn and setIsLoggedIn
  const [isModalOpen, setIsModalOpen] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const closePostModal = () => {
    // setIsModalOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      const response = await axios.post("/api/posts", formData);
      console.log("Post created successfully:", response.data);
      // Close the modal or handle any other action
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

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
    console.log("Settings clicked");
  };

  return (
    <div>
      <div className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="" to="/">
          <img
            alt="MongoDB logo"
            style={{ width: "40%" }}
            src="./img/CodeBloggslogo.png"
          ></img>
        </NavLink>
        <div className="ml-auto d-flex">
          <button className="btn btn-custom" onClick={handleModalOpen}>
            Post
          </button>
        </div>
        {isLoggedIn && (
          <div className="ml-auto">
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                {user.email
                  ? `Hello, ${user.first_name} ${user.last_name}`
                  : "User"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                <Dropdown.Item onClick={handleSettings}>Settings</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}
      </div>
      <PostModal isOpen={isModalOpen} onClose={closePostModal} />
    </div>
  );
}

export default Navbar;
