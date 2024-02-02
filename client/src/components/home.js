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
        refreshPosts,
        setRefreshPosts,
    } = useContext(AuthContext);

    const fetchPosts = async () => {
        // Fetch user's posts
        const postsResponse = await axios.get(`/post`);
        console.log(postsResponse.data.data.posts);
        setPosts(postsResponse.data.data.posts);
    };

    const handleLike = async (id, commentUserId) => {
        // Prevent the user from liking their own comments
        if (user.user_id === commentUserId) {
            return;
        }

        try {
            await axios.put(`/comment/like/${id}`);
            // After the request, fetch the posts again to update the UI
            fetchPosts();
        } catch (error) {
            console.error(error);
        }
    };

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
        fetchPosts();
    }, [refreshPosts]);



    useEffect(() => {
        console.log(posts);
    }, [posts]); // This will log the posts to the console whenever they change.

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
                            <div className="home-col1">
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
                        <h5>Your Posts</h5>
                        {posts.filter(post => post.user_id._id === user.user_id).map((post, index) => (
                            <div key={post._id}>
                                <div className="home-post-group" >
                                    <div className="home-post-content">{post.content}</div>
                                    <div className="home-post-info">
                                        <span>{new Date(post.time_stamp).toLocaleString()}</span>
                                        <span className=""><img src="./img/like vector icon.png" alt="Likes" style={{ width: "30px", height: "30px" }} /> {post.likes}</span>
                                    </div>

                                    {/* Display post's comments */}
                                    <span className="home-comments-lbl">Comments:</span>
                                    {post.comments.map((comment) => (
                                        <div key={comment._id}>
                                            <div className="home-post-comment">
                                                <div>Commenter: {comment.user_id.first_name} {comment.user_id.last_name}</div>
                                                <br />
                                                <div >Comment: {comment.content}</div>
                                            </div>
                                            <div className="home-post-comment-info">
                                                <span>{new Date(comment.time_stamp).toLocaleString()}</span>
                                                <span className=""><img src="./img/like vector icon.png" alt="Likes" style={{ width: "30px", height: "30px" }} onClick={() => handleLike(comment._id, comment.user_id._id)} /> {comment.likes}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {/* Add a horizontal image between posts, but not after the last post */}
                                {index < posts.length - 1 &&
                                    <div className="home-horizBoarder-center">
                                        <img src="./img/horizBoarder.png" alt="Horizontal" style={{ width: "70%", height: "auto" }} />
                                    </div>
                                }
                            </div>
                        ))}
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Home;
