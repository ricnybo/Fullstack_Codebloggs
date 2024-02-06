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
  usersList,
  getUser,
  deleteUser,
} from "../controllers/userController.js";

// User routes
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout/", auth, logout);
userRouter.get("/", auth, usersList);
userRouter.get("/:user_id", auth, getUser);
userRouter.delete("/:user_id", auth, deleteUser);
//userRouter.put("/edit-profile", auth, editProfile);

// Export the userRouter
export default userRouter;
