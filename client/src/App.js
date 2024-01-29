import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

// We import all the components we need in our app
import Login from "./components/login.js";
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";

const App = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Redirect to login page if not logged in and trying to access protected routes
    if (!loggedIn && location.pathname !== "/login" && location.pathname !== "/signup") {
      navigate("/login");
    }
  }, [loggedIn, location.pathname, navigate]); // Include all dependencies in useEffect


  return (
    <div>
      <Navbar />
      <div style={{ margin: 20 }}>
      <Routes>
      <Route path="/login" element={<Login loggedIn = {loggedIn} setLoggedIn = {setLoggedIn}/>} />
        <Route exact path="/records" element={<RecordList />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
      </Routes>
      </div>
    </div>
  );
};

export default App;
