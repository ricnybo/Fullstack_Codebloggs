// commentRoutes.js
// location: /server/routes/commentRoutes.js
// Import express router
import express from "express";
const commentRouter = express.Router();
import auth from "../middleware/middleware.js";

// Import controllers
import {
  createComment,
  getAllComments,
  getComment,
  updateComment,
} from "../controllers/commentController.js";

// User routes
commentRouter.post("/", auth, createComment);
commentRouter.get("/", auth, getAllComments);
commentRouter.get("/:id", auth, getComment);
commentRouter.put("/:id", auth, updateComment);

// Export the commentRouter
export default commentRouter;
