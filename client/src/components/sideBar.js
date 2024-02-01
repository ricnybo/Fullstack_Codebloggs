import React from "react";
import { NavLink } from "react-router-dom";
import "./components.css/sideBar.css";

function Sidebar() {
  return (
    <div className="">
      <div className="sidebar">
        <ul>
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>
          <li>
            <NavLink to="/bloggs">Bloggs</NavLink>
          </li>
          <li>
            <NavLink to="/network">Network</NavLink>
          </li>
          <li>
            <NavLink to="/admin">Admin</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
