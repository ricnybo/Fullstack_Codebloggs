// postRoutes.js
// location: /server/routes/postRoutes.js
// Import express router
import express from "express";
const postRouter = express.Router();
import auth from "../middleware/middleware.js";

// Import controllers
import {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  likePost,
  deletePost,
  getOrphanedPosts, 
} from "../controllers/postController.js";

// User routes
postRouter.post("/", auth, createPost);
postRouter.get("/", auth, getAllPosts);
postRouter.get("/orphaned", auth, getOrphanedPosts);
postRouter.get("/:id", auth, getPost);
postRouter.put("/:id", auth, updatePost);
postRouter.put("/like/:id", auth, likePost);
postRouter.delete("/:id", auth, deletePost);

// Export the postRouter
export default postRouter;
