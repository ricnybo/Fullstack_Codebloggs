// Home.js page component
import { useState } from "react";
import { useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

import useValidateSession from "./validateSession";
import Navbar from "./navbar";
import Sidebar from "./sideBar.js";
import { AuthContext, AuthProvider, UserContext } from "./AuthContext";

import "./components.css/sideBar.css";
import "./components.css/home.css";

// This method allows the cards to be displayed horizontally.
function HorizontalScroll(props) {
    return <div className="horizontal-scroll-container">{props.children}</div>;
}

// This method will display the cards on the home page.
function Home() {
    const { validateSession } = useValidateSession();
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
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
        const fetchPosts = async () => {
            // Fetch user's posts
            const postsResponse = await axios.get(`/post`);
            setPosts(postsResponse.data.data.posts);
        };

        fetchPosts();
    }, []);

    // This section will display the cards.
    return (
        <>
            {/* <Navbar />
            <Sidebar /> */}
            <Container className="content">
                <Row>
                    <Col>
                        {/* Display user data */}
                        {user && (
                            <div>
                                <div className="profile-picture">
                                    <img
                                        alt="Profile Picture"
                                        style={{ width: "100%" }}
                                        src="./img/pngtree-bright-yellow-circle-png-image_2949816.png"
                                    ></img>
                                    <div className="initials">
                                        {user.first_name[0]}
                                        {user.last_name[0]}
                                    </div>
                                </div>
                                <br />
                                <div className="home-block">
                                    <br />
                                    <h5>Your Status</h5>
                                    <div>{user.status}</div>
                                </div>
                                <br />
                                <div className="home-block">
                                    <h5>Your information</h5>
                                    <p>First Name: {user.first_name}</p>
                                    <p>Last Name: {user.last_name}</p>
                                    <p>Birthday: {new Date(user.birthday).toLocaleDateString()}</p>
                                    <p>Email: {user.email}</p>
                                    <p>Location: {user.location}</p>
                                    <p>Occupation: {user.occupation}</p>
                                    <p>Auth Level: {user.auth_level}</p>
                                </div>
                                {/* Display other user data */}
                            </div>
                        )}
                    </Col>

                    <Col>
                        {/* Display user's posts */}
                        {posts.map((post) => (
                            <div key={post._id}>
                                <div>{post.content}</div>
                                <div>{post.time_stamp}</div>
                                <div>{post.likes}</div>
                                {/* Display post's comments */}
                                {post.comments.map((comment) => (
                                    <div key={comment._id}>
                                        <div>{comment.content}</div>
                                        <div>{comment.time_stamp}</div>
                                        <div>{comment.likes}</div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Home;
