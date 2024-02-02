//commentModule.js
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import "./components.css/postModal.css";
import Modal from "react-bootstrap/Modal";
import { AuthContext } from "./AuthContext.js";

function CommentModal({ show, onHide, postId, refreshPosts }) {
  const {
    isLoggedIn,
    setLoggedIn,
    user,
    setUser,
    validSession,
    setValidSession,
  } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    user_id: "",
    post_id: "",
    content: "",
  });

  useEffect(() => {
    setFormData((formData) => ({
      ...formData,
      user_id: user.user_id,
      post_id: postId,
    }));
  }, [user.user_id, postId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  //troubleshooting
  // useEffect(() => {
  //   console.log('formData:', formData);
  // }, [formData]);

  const closeCommentModal = async () => {
    onHide();
    setFormData({ user_id: user.user_id, post_id: postId, content: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/comment", formData);
      console.log("Comment created successfully:", response.data);
      onHide(); // Close the modal after successful comment creation
      refreshPosts();
      setFormData({ user_id: user.user_id, post_id: postId, content: "" });
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  return (
    <div className="modal-container">
      <button className="ml-center btn-custom" onClick={onHide}>
        Comment
      </button>
      {show && (
        <Modal show={show}>
          <div className="modal-background" onClick={onHide}></div>
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label className="label">Make a Comment</label>
                <div className="control">
                  <textarea
                    className="textarea"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
              </div>
              <div
                className="field is-grouped"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div className="control">
                  <button
                    type="submit"
                    className="button"
                    onClick={handleSubmit}
                  >
                    Comment
                  </button>
                </div>
                <div className="control">
                  <button
                    type="button"
                    className="button"
                    onClick={closeCommentModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={onHide}
          ></button>
        </Modal>
      )}
    </div>
  );
}

export default CommentModal;
