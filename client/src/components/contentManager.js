import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "./AuthContext.js";
import useValidateSession from "./validateSession.js";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ConfirmModal from "./confirmModal.js";
import "./components.css/contentManager.css";
import "./components.css/bloggs.css";

function ContentManager() {
    const { validateSession } = useValidateSession();
    const navigate = useNavigate();
    const [users, setUsers] = useState(null); // Assuming you need user data in Admin page
    const [isLoading, setIsLoading] = useState(true); // Flag to handle loading state
    const [allPosts, setAllPosts] = useState([]);
    const [fromDate, setFromDate] = useState(null);
    const [untilDate, setUntilDate] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [resultsPerPage, setResultsPerPage] = useState(10);
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
        // Fetch all posts from the backend
        const postsResponse = await axios.get(`/post`);
        // Store all posts in state
        setAllPosts(postsResponse.data.data.posts);
        // Recalculate totalPages
        const filteredPosts = postsResponse.data.data.posts.filter((post) => {
            const postDate = new Date(post.time_stamp);
            return (
                (!fromDate ||
                    postDate.setHours(0, 0, 0, 0) >= fromDate.setHours(0, 0, 0, 0)) &&
                (!untilDate ||
                    postDate.setHours(0, 0, 0, 0) <= untilDate.setHours(0, 0, 0, 0))
            );
        });
        setTotalPages(Math.ceil(filteredPosts.length / resultsPerPage));
    };

    const getPostsForPage = (page) => {
        // Calculate the start and end indices for the slice
        const start = (page - 1) * resultsPerPage;
        const end = start + resultsPerPage;
        // Filter posts by date range
        const filteredPosts = allPosts.filter((post) => {
            const postDate = new Date(post.time_stamp);
            return (
                (!fromDate ||
                    postDate.setHours(0, 0, 0, 0) >= fromDate.setHours(0, 0, 0, 0)) &&
                (!untilDate ||
                    postDate.setHours(0, 0, 0, 0) <= untilDate.setHours(0, 0, 0, 0))
            );
        });
        // Return a slice of the filteredPosts array
        return filteredPosts.slice(start, end);
    };

    // const handleDeletePost = async (postId) => {
    //     // Show a confirmation dialog to the user
    //     if (window.confirm('Are you sure you want to delete this post?')) {
    //         // If the user confirmed, delete the post
    //         await axios.delete(`/post/${postId}`);
    //         // Fetch the posts again to refresh the posts
    //         fetchPosts();
    //     }
    // };
    const handleDeletePost = async (postId) => {
        // Delete the post
        await axios.delete(`/post/${postId}`);
        // Fetch the posts again to refresh the posts
        fetchPosts();
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(() => {
        fetchPosts();
    }, [refreshPosts]);

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

    useEffect(() => {
        // Filter posts by date range
        const filteredPosts = allPosts.filter((post) => {
            const postDate = new Date(post.time_stamp);
            return (
                (!fromDate ||
                    postDate.setHours(0, 0, 0, 0) >= fromDate.setHours(0, 0, 0, 0)) &&
                (!untilDate ||
                    postDate.setHours(0, 0, 0, 0) <= untilDate.setHours(0, 0, 0, 0))
            );
        });
        // Store filtered posts in state
        setPosts(filteredPosts);
        // Reset currentPage to 1 and recalculate totalPages
        setCurrentPage(1);
        setTotalPages(Math.ceil(filteredPosts.length / resultsPerPage));
    }, [fromDate, untilDate, resultsPerPage]);

    return (
        <>
            <div className="contentManger-search-container">
                <Row>
                    <Col>
                        <form className="content-search-form">
                            <label className="content-search-item">
                                From:
                                <ReactDatePicker
                                    className="content-search-spacer"
                                    selected={fromDate}
                                    onChange={setFromDate}
                                    showYearDropdown
                                    showMonthDropdown
                                />
                            </label>
                            <label className="content-search-item">
                                Until:
                                <ReactDatePicker
                                    className="content-search-spacer"
                                    selected={untilDate}
                                    onChange={setUntilDate}
                                    showYearDropdown
                                    showMonthDropdown
                                />
                            </label>
                            <div className="content-search-button">
                                <Button type="button" onClick={fetchPosts}>
                                    Search
                                </Button>
                            </div>
                            <div className="content-search-button">
                                <Button
                                    type="button"
                                    onClick={() => {
                                        setFromDate(null);
                                        setUntilDate(null);
                                        fetchPosts();
                                    }}
                                >
                                    Show All
                                </Button>
                            </div>
                            <label className="content-search-item">
                                Results per page:
                                <select
                                    className="content-search-spacer"
                                    value={resultsPerPage}
                                    onChange={(e) => setResultsPerPage(Number(e.target.value))}
                                >
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
                                </select>
                            </label>
                        </form>
                    </Col>
                </Row>
            </div>

            <div className="content-content">
                <row className="content-Row">
                    <Col>
                        <div className="bloggs-col">
                            {/* Display posts */}

                            {/* {posts.map((post, index) => ( */}
                            {getPostsForPage(currentPage).map((post, index) => (
                                <div key={post._id}>
                                    <div className="content-post-wButton">
                                        <div className="content-post-group">
                                            <div style={{ display: "flex" }}>
                                                {" "}
                                                {/* Add a flex container */}
                                                <div className="bloggs-initials">
                                                    {post.user_id.first_name[0]}
                                                    {post.user_id.last_name[0]}
                                                </div>
                                                <div style={{ marginLeft: "10px", flexGrow: "1" }}>
                                                    {" "}
                                                    {/* Add some space between the initials and the rest of the content */}
                                                    <div className="bloggs-post-content">
                                                        <div>
                                                            Poster: {post.user_id.first_name}{" "}
                                                            {post.user_id.last_name}
                                                        </div>
                                                        <br />
                                                        <div>{post.content}</div>
                                                    </div>
                                                    <div className="bloggs-post-info">
                                                        <span>
                                                            {new Date(post.time_stamp).toLocaleString()}
                                                        </span>
                                                        <span className="">
                                                            <img
                                                                src="./img/like vector icon.png"
                                                                alt="Likes"
                                                                style={{ width: "30px", height: "30px" }}
                                                            // onClick={() =>
                                                            //     handlePostLike(post._id, post.user_id._id)
                                                            // }
                                                            />{" "}
                                                            {post.likes}
                                                        </span>
                                                    </div>
                                                    {/* Display post's comments */}
                                                    <span>
                                                        Make a comment{" "}
                                                        <img
                                                            src="./img/pointing-right-hand-symbol.png"
                                                            alt="Make a Comment"
                                                            style={{ width: "30px", height: "20px" }}
                                                        // onClick={() =>
                                                        //     handleCommentAdd(post._id, post.user_id._id)
                                                        // }
                                                        />
                                                    </span>
                                                    <span className="bloggs-comments-lbl">Comments:</span>
                                                    {post.comments.map((comment) => (
                                                        <div key={comment._id}>
                                                            <div className="bloggs-post-comment">
                                                                <div>
                                                                    Commenter: {comment.user_id.first_name}{" "}
                                                                    {comment.user_id.last_name}
                                                                </div>
                                                                <br />
                                                                <div>{comment.content}</div>
                                                            </div>
                                                            <div className="bloggs-post-comment-info">
                                                                <span>
                                                                    {new Date(
                                                                        comment.time_stamp
                                                                    ).toLocaleString()}
                                                                </span>
                                                                <span className="">
                                                                    <img
                                                                        src="./img/like vector icon.png"
                                                                        alt="Likes"
                                                                        style={{ width: "30px", height: "30px" }}
                                                                    // onClick={() =>
                                                                    //     handleCommentLike(
                                                                    //         comment._id,
                                                                    //         comment.user_id._id
                                                                    //     )
                                                                    // }
                                                                    />{" "}
                                                                    {comment.likes}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <ConfirmModal
                                            className="content-confirmModal"
                                            buttonLabel="Delete"
                                            title="Confirm Delete"
                                            message="Are you sure you want to delete this post?"
                                            confirmAction={() => handleDeletePost(post._id)}
                                            showButton={true}
                                        />
                                        {/* <Button variant="danger" onClick={() => handleDeletePost(post._id)}>Delete</Button> */}
                                    </div>
                                    <br />
                                    {/* Add a horizontal image between posts, but not after the last post */}
                                    {/* {index < getPostsForPage(currentPage).length - 1 && (
                                        <div className="bloggs-horizBoarder-center">
                                            <img
                                                src="./img/horizBoarder.png"
                                                alt="Horizontal"
                                                className="bloggs-horizBoarder-img"
                                            />
                                        </div>
                                    )} */}
                                </div>
                            ))}
                        </div>
                        {/* Display page controls */}
                        <div>
                            <Button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(currentPage - 1)}
                            >
                                Previous
                            </Button>
                            <span className="content-search-spacer">
                                Page {currentPage} of {totalPages}
                            </span>
                            <Button
                                className="content-search-spacer"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(currentPage + 1)}
                            >
                                Next
                            </Button>

                        </div>
                        <br />
                    </Col>
                </row>
            </div>
        </>
    );
}

export default ContentManager;
