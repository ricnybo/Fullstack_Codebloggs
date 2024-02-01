//postModule.js
import React, { useState, useContext } from "react";
import axios from "axios";
import "./components.css/postModal.css";
import Modal from "react-bootstrap/Modal";
import { AuthContext } from "./AuthContext.js";

function PostModal({ }) {
  const {
    isLoggedIn,
    setLoggedIn,
    user,
    setUser,
    validSession,
    setValidSession,
  } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    user_id: user.user_id,
    content: "",
  });
  const [isModalOpen, setIsModalOpen] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const closePostModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/post", formData);
      console.log("Post created successfully:", response.data);
      closePostModal(); // Close the modal after successful post creation
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="modal-container">
      <button className="ml-center btn-custom" onClick={handleModalOpen}>
        Post
      </button>
      {isModalOpen && (

        <Modal  show={isModalOpen}>
          <div className="modal-background" onClick={closePostModal}></div>
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
            
              <div className="field">
                <label className="label">Make a Post</label>
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
              <div className="field is-grouped">
                <div className="control">
                  <button type="submit" 
                  className="button" 
                  onClick={handleSubmit}>
                    Post
                  </button>
                </div>
                <div className="control">
                  <button
                    type="button"
                    className="button"
                    onClick={closePostModal}>
                    Cancel</button>
                </div>
              </div>
            </form>
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={closePostModal}
          ></button>
        </Modal>
      )}
    </div>

  );
}


export default PostModal;