// Admin.js

import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import Navbar from "./navbar";
import Sidebar from "./sideBar.js";
import { AuthContext } from "./AuthContext";
import useValidateSession from "./validateSession";
import "./components.css/sideBar.css";
import "./components.css/home.css";
import "./components.css/admin.css";

function Admin() {
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
            if (user.auth_level !== "Admin") {
                navigate("/home");
            }
        };

        checkSession();
    }, []);

    const handleUserManagerClick = () => {
        navigate("/user-manager");
    };

    const handleContentManagerClick = () => {
        navigate("/content-manager");
    };

    return (
        <>
            {/* <Navbar />
            <Sidebar /> */}
            <Container fluid>
                <Row className="net-cont">
                    <Col md={4}>
                        <h3 className="admin-header">Admin Page</h3>
                        <Card onClick={handleUserManagerClick}>
                            <Card.Body>
                                <Card.Title>User Manager</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card onClick={handleContentManagerClick}>
                            <Card.Body>
                                <Card.Title>Content Manager</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Admin;


