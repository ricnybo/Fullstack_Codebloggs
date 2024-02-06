import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import Navbar from "./navbar.js";
import Sidebar from "./sideBar.js";
import { AuthContext } from "./AuthContext.js";
import useValidateSession from "./validateSession.js";

function ContentManager() {
    const { validateSession } = useValidateSession();
    const navigate = useNavigate();
    const [users, setUsers] = useState(null); // Assuming you need user data in Admin page
    const [isLoading, setIsLoading] = useState(true); // Flag to handle loading state

    const {
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        validSession,
        setValidSession,
    } = useContext(AuthContext);

    useEffect(() => {
        const checkSession = async () => {
            const isValid = await validateSession();
            if (!isValid) {
                navigate("/login");
            } 
            if (user.auth_level !== "Admin" ) {
                navigate("/home");
            }
        };

        checkSession();
    }, []);

}


export default ContentManager;