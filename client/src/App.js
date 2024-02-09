//app.js
import React, { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import {
  AuthContext,
  AuthProvider,
  UserContext,
} from "./components/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";
// We import all the components we need in our app
import Login from "./components/login.js";
import Register from "./components/register.js";
import Navbar from "./components/navbar";
import Sidebar from "./components/sideBar.js";
import Unauthorized from "./components/unauthorized.js";
import Home from "./components/home.js";
import Network from "./components/Network.js";
import Bloggs from "./components/bloggs.js";
import Admin from "./components/admin.js";
import UserManager from "./components/userManager.js";
import ContentManager from "./components/contentManager.js";
import EditUser from "./components/editUser.js";
import Layout from "./components/Layout.js";

const App = () => {
  const {
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
    validSession,
    setValidSession,
  } = useContext(AuthContext);

  return (
    <div>
      <Router>
        <ToastContainer />
        {/* <Navbar />
        {isLoggedIn ? <Sidebar /> : null} */}
        {/* <div style={{ margin: "20px" }}> */}
        <Layout>
        {/* <div> */}
          <Routes>
            <Route path="/login" element={<Layout mainClassOverride="main-override"><Login /></Layout>} />
            <Route path="/register" element={<Layout mainClassOverride="main-override"><Register /></Layout>} />
            <Route path="/unauthorized" element={<Layout mainClassOverride="main-override"><Unauthorized /></Layout>} />
            {isLoggedIn ? (
              <>
                <Route path="/home" element={<Home />} />
                <Route path="/bloggs" element={<Bloggs />} />
                <Route path="/network" element={<Network />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/user-manager" element={<UserManager />} />
                <Route path="/content-manager" element={<ContentManager />} />
                <Route path="/edit-user/" element={<EditUser />} />
                <Route path="*" element={<Navigate to="/home" />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/login" />} />
            )}
        </Routes>
        </Layout>
        {/* </div> */}
      </Router>
    </div>
  );
};

export default App;
