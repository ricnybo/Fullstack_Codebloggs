// sessionRoutes.js
// location: /server/routes/sessionRoutes.js
// Import express router
import express from "express";
const sessionRouter = express.Router();
import {
  createSession,
  validateToken,
} from "../controllers/sessionController.js";
import auth from "../middleware/middleware.js";

// routes for session model
sessionRouter.post("/session/:user_id", createSession);
sessionRouter.get("/validate_token/:user_id", auth, validateToken);

export default sessionRouter;
