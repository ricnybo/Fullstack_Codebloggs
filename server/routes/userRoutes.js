// userRoutes.js
// location: /server/routes/userRoutes.js
// Import express router
import express from "express";
const userRouter = express.Router();
import auth from "../middleware/middleware.js";

// Import controllers
import {
  register,
  login,
  logout,
  editProfile,
} from "../controllers/userController.js";

// User routes
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/logout/:user_id", auth, logout);
userRouter.put("/edit-profile", auth, editProfile);

// Export the userRouter
export default userRouter;
