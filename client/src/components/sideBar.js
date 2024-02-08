// sidebar.js
import React from "react";
import { useState } from "react";
import { useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext, AuthProvider, UserContext } from "./AuthContext";

import styled from 'styled-components';
const Nav = styled.nav`
    padding: 1em;
    background: #f0f0f0;
    border-right: 1px solid #ccc;
    padding: 20px;
    @media (max-width: 700px) {
        padding-top: 80px;
    }
    @media (min-width: 700px) {
        position: fixed;
        width: 150px;
        height: calc(100% - 80px);
        overflow-y: scroll;
        &::-webkit-scrollbar {
            display: none;  // Hide scrollbar for Webkit browsers
        }
    }
`;

const NavList = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    line-height: 2;
    li {
        padding: 5px 20px;
    }
    a {
        text-decoration: none;
        
        font-size: 1em;
        color: #333;
    }
    a:visited {
        color: #333;
    }
    a:hover,
    a:focus {
      font-weight: bold;
        color: #8047d1;
    }

    @media (max-width: 700px) {
      padding: 5px 5px;
        li {
            display: inline-block; /* Make the li elements display horizontally */
            padding: 5px; /* Adjust the padding as needed */
        }
    }
`;

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
    <Nav>
    <div className="">
      <NavList >
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
      </NavList>
      </div>
    </Nav>
  );
}

export default Sidebar;
