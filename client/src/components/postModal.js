//postModule.js
import React, { useState, useContext, useEffect } from "react";
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
    refreshPosts,
    setRefreshPosts,
  } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState("");
  
  const [formData, setFormData] = useState({
    user_id: "",
    content: "",
  });
  console.log(formData);

  useEffect(() => {
    if (isModalOpen) {
      setFormData(formData => ({ ...formData, user_id: user.user_id }));
    }
  }, [user.user_id, isModalOpen]);


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const closePostModal = () => {
    setIsModalOpen(false);
    setFormData({}); // Clear the form data after closing the modal
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/post", formData);
      console.log("Post created successfully:", response.data);
      closePostModal(); // Close the modal after successful post creation
      setRefreshPosts(prevState => !prevState);
      setFormData({});
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div>
      <button className="ml-center btn-custom" onClick={handleModalOpen}>
        Post
      </button>
      {isModalOpen && (

        <Modal  className="modal-background" show={isModalOpen}>
          <div className="modal-container" onClick={closePostModal}></div>
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
              <div className="field is-grouped" style={{ display: 'flex', justifyContent: 'space-between' }}>
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