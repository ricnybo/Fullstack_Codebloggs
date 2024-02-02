// sidebar.js
import React from "react";
import { NavLink } from "react-router-dom";
import "./components.css/sideBar.css";

function Sidebar() {
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
        <li>
          <NavLink to="/admin" className="admin">
            Admin
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
