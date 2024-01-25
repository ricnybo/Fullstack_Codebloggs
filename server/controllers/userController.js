// userController.js
// location:  /server/controllers/userController.js
// This file contains the methods for the user routes.
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
const secretPwd = process.env.SECRET_KEY;
const hashSalt = process.env.HASH_SALT;
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../db/mongodb/schema/user.Schema.js";
import Session from "../db/mongodb/schema/session.Schema.js";
import { createSession, validateToken } from "./sessionController.js";
//import Agent from "../db/mongodb/schema/agent.Schema.js";
import auth from "../middleware/middleware.js";
import dbo from "../db/conn.js";

// This section will help you get a list of all the users.
const register = async (req, res) => {
  try {
    const { first_name, last_name, birthday, email, password, status, location, occupation, auth_level } = req.body;
    // Check if a user with the provided email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Status 400: Email already in use: " + email);
      return res
        .status(400)
        .send("Registration failed. Email already in use.");
    }
    const user = new User({ first_name, last_name, birthday, email, password, status, location, occupation, auth_level});
    await user.save();
    console.log("1 user added");
    res.status(200).json({
      status: "ok",
      data: {
        valid: true,
      },
      message: "User created"
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error registering new user please try again.");
  }
};

// This section will help you get a single user by id
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      console.log("Status 401: Invalid username");
      return res.status(401).json({
        status: "ok",
        data: {
          valid: false,
        },
        message: "Invalid username or password",
      });;
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      console.log("Status 401: Invalid password");
      return res.status(401).json({
        status: "ok",
        data: {
          valid: false,
        },
        message: "Invalid username or password",
      });
    };
    // Create session token
    // Validate session token
    console.log(`${req.body.email} logged in`);
    res.status(200).json({
      status: "ok",
      data: {
        valid: true,
        user: {
          _id: user._id,
          auth_level: user.auth_level,
        },
      },
      message: "Login successful",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error please try again.");
  }
};

// This section will help you logout from the user session
const logout = async (req, res) => {
  try {
    // Fetch the user from the database using the user_id
    const { user_id } = req.params;
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    // Fetch the session from the database using the session_id from the cookie
    const session = await Session.findOne({ session_id: req.cookies.session_id });
    if (!session) {
      return res.status(404).send("Session not found");
    }
    // Verify that the user_id in the session matches the user_id in the request
    if (session.user.toString() !== user_id) {
      return res.status(403).send("Unauthorized");
    }
    // Clear the session_id cookie
    res.clearCookie('session_id');
    console.log(`${user.email} logged out`);
    res.status(200).json({ status: "ok", message: "You are logged out" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error please try again.");
  }
};

// This section will help you authenticate the user and then give them access to the protected route.
const protectedRoute = (req, res) => {
  console.log(`${req.body.email} is authorized`);
  res.status(200).send("You are authorized");
};

// This section will help you update a user by id.
const editProfile = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    const userId = req.userId; // Assuming the auth middleware adds the user object to the request
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    user.first_name = first_name || user.first_name;
    user.last_name = last_name || user.last_name;
    user.email = email || user.email;

    if (password) {
      user.password = password;
    }

    await user.save();
    console.log(`${req.body.email} updated`);
    res.status(200).send("Profile updated successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating profile please try again.");
  }
};

export {
  register,
  login,
  logout,
  protectedRoute,
  editProfile,
};
