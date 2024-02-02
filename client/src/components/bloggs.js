// bloggs.js page component
import { useState } from "react";
import { useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

import useValidateSession from "./validateSession.js";
import CommentModal from "./commentModal.js";
import { AuthContext, AuthProvider, UserContext } from "./AuthContext.js";

import "./components.css/sideBar.css";
import "./components.css/bloggs.css";

// This method will display the cards on the home page.
function Bloggs() {
  const { validateSession } = useValidateSession();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [postIdForComment, setPostIdForComment] = useState("");
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
    // Fetch user's posts from the backend
    const postsResponse = await axios.get(`/post`);
    setPosts(postsResponse.data.data.posts);
  };

  const handlePostLike = async (id, postUserId) => {
    // Prevent the user from liking their own comments
    if (user.user_id === postUserId) {
      return;
    }

    try {
      await axios.put(`/post/like/${id}`);
      // After the request, fetch the posts again to update the UI
      fetchPosts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommentLike = async (id, commentUserId) => {
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

  const handleCommentAdd = async (postId, userId) => {
    // Prevent the user from commenting on their own post
    if (user.user_id === userId) {
      return;
    } else {
      // Open the comment modal
      setShowCommentModal(true);
      setPostIdForComment(postId);
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

  // This section will display the cards.
  return (
    <>
      <CommentModal
        show={showCommentModal}
        onHide={() => setShowCommentModal(false)}
        postId={postIdForComment}
        refreshPosts={fetchPosts}
      />
      <Container className="content">
        <Row>
          <Col>
            <div className="bloggs-col1">
              {/* Display posts */}

              {posts.map((post, index) => (
                <div key={post._id}>
                  <div className="bloggs-post-group">
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
                              onClick={() =>
                                handlePostLike(post._id, post.user_id._id)
                              }
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
                            onClick={() =>
                              handleCommentAdd(post._id, post.user_id._id)
                            }
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
                                {new Date(comment.time_stamp).toLocaleString()}
                              </span>
                              <span className="">
                                <img
                                  src="./img/like vector icon.png"
                                  alt="Likes"
                                  style={{ width: "30px", height: "30px" }}
                                  onClick={() =>
                                    handleCommentLike(
                                      comment._id,
                                      comment.user_id._id
                                    )
                                  }
                                />{" "}
                                {comment.likes}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Add a horizontal image between posts, but not after the last post */}
                  {index < posts.length - 1 && (
                    <div className="bloggs-horizBoarder-center">
                      <img
                        src="./img/horizBoarder.png"
                        alt="Horizontal"
                        style={{ width: "70%", height: "auto" }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Bloggs;
