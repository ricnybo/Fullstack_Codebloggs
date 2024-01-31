import React, { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AuthContext,
  AuthProvider,
  UserContext,
} from "./components/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css"
// We import all the components we need in our app
import Login from "./components/login.js";
import Register from "./components/register.js";
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create.js";
import Unauthorized from "./components/unauthorized.js";
import Home from "./components/home.js";

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
    <Router>
      <div>
        <ToastContainer />
        <Navbar />
        <div style={{ margin: 20 }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            {/* element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} */}
            <Route path="/register" element={<Register />} />
            {/* <Route path="/unauthorized" element={<Unauthorized />} /> */}
            <Route path="/unathorized" element={<Unauthorized />} />
            {isLoggedIn ? (
              <>
                <Route exact path="/home" element={<Home />} />
                <Route exact path="/records" element={<RecordList />} />
                <Route path="/edit/:id" element={<Edit />} />
                <Route path="/create" element={<Create />} />
              </>
            ) : (
                <Route path="*" element={<Navigate to="/login" />} />
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
