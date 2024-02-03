// sidebar.js
import React from "react";
import { useState } from "react";
import { useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import "./components.css/sideBar.css";

import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext, AuthProvider, UserContext } from "./AuthContext";

function Sidebar() {
  
  const { user } = useContext(AuthContext);
  const [user_admin, setUserAdmin] = useState(false); // Create a state variable to store the user's admin status

  useEffect(() => {
    if (user && user.auth_level === "Admin") {
      setUserAdmin(true);
    } else {
      setUserAdmin(false);
    }
  }, [user]);

  return (
    <div className="sidebar">
      <ul>
        <li>
          <NavLink to="/home" className="home">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/bloggs" className="bloggs">
            Bloggs
          </NavLink>
        </li>
        <li>
          <NavLink to="/network" className="network">
            Network
          </NavLink>
        </li>
        {user_admin && (
          <li>
            <NavLink to="/admin" className="admin">
              Admin
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
