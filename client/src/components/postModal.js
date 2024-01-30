//postModule.js
import React, { useState } from "react";
import axios from "axios";

function PostModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/posts", formData);
      console.log("Post created successfully:", response.data);
      onClose(); // Close the modal after successful post creation
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };
  
  return (
    <div className={`modal ${isOpen ? "is-active" : "null"}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Content</label>
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
              <button type="submit" className="button is-primary">
                Post
              </button>
            </div>
            <div className="control">
              <button
                type="button"
                className="button"
                onClick={onClose}
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
        onClick={onClose}
      ></button>
    </div>
  );
}

export default PostModal;