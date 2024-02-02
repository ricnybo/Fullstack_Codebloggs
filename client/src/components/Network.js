//network.js
import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import { Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import useValidateSession from "./validateSession";
import Navbar from "./navbar";
import Sidebar from "./sideBar.js";
import { AuthContext, AuthProvider, UserContext } from "./AuthContext";
import "./components.css/sideBar.css";
import "./components.css/home.css";
import "./components.css/Network.css"

// This method will display the cards on the home page.
function Network() {
    const { validateSession } = useValidateSession();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    // const [posts, setPosts] = useState([]);
    const [selectedUser, setSelectedUser] = useState();
    const {
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        validSession,
        setValidSession,
    } = useContext(AuthContext);

    // This method will validate the session.
    useEffect(() => {
        const checkSession = async () => {
            const isValid = await validateSession();
            if (!isValid) {
                navigate("/login");
            }
        };

        checkSession();
    }, []);

    useEffect(() => {
        // Fetch users from the backend
        const fetchUsers = async () => {
            console.log(users)
            try {
                const response = await axios.get("/user");
                setUsers(response.data.data.user_list);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
        
    }, []);

    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

    return (
        <>
            <Navbar />
            <Sidebar />
            <Container fluid>
                <Row className="net-cont">
                    <Col md={4}>
                        <h3>Users</h3>
                        <div>
                            {users && users.map((user) => (
                                <Card key={user} onClick={() => handleUserClick(user)}>
                                    <Card.Body>
                                        <Card.Title>{user.first_name} {user.last_name}</Card.Title>
                                        <Card.Text>{user.email}</Card.Text>
                                    </Card.Body>
                                </Card>
                            ))}
                        </div>
                    </Col>
                    <Col md={4}>
                        {selectedUser && (
                            <div className="home-col1">
                                <div className="profile-picture">
                                    <img
                                        alt="Profile Picture"
                                        style={{ width: "100%" }}
                                        src="./img/pngtree-bright-yellow-circle-png-image_2949816.png"
                                    ></img>
                                    <div className="initials">
                                        {selectedUser.first_name[0]}
                                        {selectedUser.last_name[0]}
                                    </div>
                                </div>
                                <br />
                                <div className="home-block">
                                    <h5>Your Status</h5>
                                    <div>{selectedUser.status}</div>
                                </div>
                                <br />
                                <div className="home-block">
                                    <h5>Your information</h5>
                                    <p>First Name: {selectedUser.first_name}</p>
                                    <p>Last Name: {selectedUser.last_name}</p>
                                    <p>Birthday: {new Date(selectedUser.birthday).toLocaleDateString()}</p>
                                    <p>Email: {selectedUser.email}</p>
                                    <p>Location: {selectedUser.location}</p>
                                    <p>Occupation: {selectedUser.occupation}</p>
                                    <p>Auth Level: {selectedUser.auth_level}</p>
                                </div>
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    );

}

export default Network;