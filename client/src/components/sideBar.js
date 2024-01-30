import React from 'react';
import { NavLink } from 'react-router-dom';
import "./components.css/sideBar.css";

function Sidebar() {
  return (
    <div class="wrapper">
    <div className="sidebar">
    <ul>
        <li>
            <NavLink to="/home" activeClassName="active">Home</NavLink>
        </li>
        <li>
            <NavLink to="/bloggs" activeClassName="active">Bloggs</NavLink>
        </li>
        <li>
            <NavLink to="/network" activeClassName="active">Network</NavLink>
        </li>
        <li>
            <NavLink to="/admin" activeClassName="active">Admin</NavLink>
        </li>
    </ul>
</div>
</div>
  );
}

export default Sidebar;