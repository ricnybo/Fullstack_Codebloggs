// userController.js
// location:  /server/controllers/userController.js
// This file contains the methods for the user routes.
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
import bcrypt from "bcryptjs";
import User from "../db/MongoDB/Schema/user.Schema.js";
import Session from "../db/MongoDB/Schema/session.Schema.js";
import Post from "../db/MongoDB/Schema/post.Schema.js";
import Comment from "../db/MongoDB/Schema/comment.Schema.js";

// This section will help you get a list of all the users.
const register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      birthday,
      email,
      password,
      status,
      location,
      occupation,
      auth_level,
    } = req.body;
    // Check if a user with the provided email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Status 400: Email already in use: " + email);
      return res.status(400).send("Registration failed. Email already in use.");
    }
    const user = new User({
      first_name,
      last_name,
      birthday,
      email,
      password,
      status,
      location,
      occupation,
      auth_level,
    });
    await user.save();
    console.log("1 user added");
    res.status(200).json({
      status: "ok",
      data: {
        valid: true,
      },
      message: "User created",
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
      });
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
    }

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
    // Fetch the session from the database using the session_id from the cookie
    // and populate the user field
    const session = await Session.findOne({
      session_id: req.cookies.session_id,
    }).populate("user");
    if (!session) {
      return res.status(404).send("Session not found");
    }

    const user = session.user; // Fetch the user from the session for later use

    await Session.deleteOne({ session_id: req.cookies.session_id }); // Remove the session from the database

    res.clearCookie("session_id"); // Clear the session_id cookie

    console.log(`${user.email} logged out`);
    res.status(200).json({ status: "ok", message: "You are logged out" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error please try again.");
  }
};

// This section will help you get a list of all the users.
const usersList = async (req, res) => {
  try {
    const users = await User.find()
      .select(
        "_id first_name last_name birthday email status location occupation auth_level"
      )
      .sort({ last_name: 1 });
    const userList = users.map((user) => ({
      user_id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      birthday: user.birthday,
      email: user.email,
      status: user.status,
      location: user.location,
      occupation: user.occupation,
      auth_level: user.auth_level,
    }));
    console.log("Users sent");
    res.status(200).json({
      status: "ok",
      data: {
        valid: true,
        user_list: userList,
      },
      message: "Users sent",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting users list. Please try again.");
  }
};

const getUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    console.log("User sent");
    res.status(200).json({
      status: "ok",
      data: {
        valid: true,
        user: {
          user_id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          birthday: user.birthday,
          email: user.email,
          status: user.status,
          location: user.location,
          occupation: user.occupation,
          auth_level: user.auth_level,
        },
      },
      message: "User sent",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting user please try again.");
  }
};

// This section will help you authenticate the user and then give them access to the protected route.
const protectedRoute = (req, res) => {
  console.log(`${req.body.email} is authorized`);
  res.status(200).send("You are authorized");
};

// This section will help you update a user by id.
const updateUser = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      birthday,
      status,
      location,
      occupation,
      auth_level,
    } = req.body;
    const userId = req.params.user_id; // Get the user ID from the URL parameters
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    user.first_name = first_name || user.first_name;
    user.last_name = last_name || user.last_name;
    user.email = email || user.email;
    user.birthday = birthday || user.birthday;
    user.status = status || user.status;
    user.location = location || user.location;
    user.occupation = occupation || user.occupation;
    user.auth_level = auth_level || user.auth_level;

    if (password) {
      user.password = password;
    }

    await user.save();
    console.log(`${req.body.email} updated`);
    res.status(200).json({
      status: "ok",
      data: {
        valid: true,
        user: {
          user_id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          birthday: user.birthday,
          email: user.email,
          status: user.status,
          location: user.location,
          occupation: user.occupation,
          auth_level: user.auth_level,
        },
      },
      message: "Profile updated successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating profile please try again.");
  }
};

// This section will help you delete a user.
const deleteUser = async (req, res) => {
  try {
    const { user_id } = req.params;

    // Find the user
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({
        status: "ok",
        data: { valid: false },
        message: "User not found",
      });
    }

    // Find all posts by the user
    const posts = await Post.find({ user_id: user_id });

    // Delete all comments associated with the user's posts
    for (let post of posts) {
      // Find all comments of the post
      const comments = await Comment.find({ post_id: post._id });

      // Delete each comment and remove it from the post's comments array
      for (let comment of comments) {
        await Comment.deleteOne({ _id: comment._id });
        post.comments.pull(comment._id);
      }

      // Save the post after removing the comments
      await post.save();
    }

    // Delete all posts by the user
    await Post.deleteMany({ user_id: user_id });

    // Delete all comments made by the user on other users' posts
    const comments = await Comment.find({ user_id: user_id });
    for (let comment of comments) {
      // Find the post associated with the comment
      const post = await Post.findById(comment.post_id);

      // Remove the comment from the post's comments array and save the post
      post.comments.pull(comment._id);
      await post.save();

      // Delete the comment
      await Comment.deleteOne({ _id: comment._id });
    }

    // Delete the user's session
    await Session.deleteOne({ user: user_id });

    // Delete the user
    await User.findByIdAndDelete(user_id);

    console.log("User deleted successfully");
    res.status(200).json({
      status: "ok",
      data: { valid: true },
      message: "User deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "ok",
      data: { valid: false },
      message: "Error deleting user.",
    });
  }
};

export {
  register,
  login,
  logout,
  usersList,
  getUser,
  protectedRoute,
  updateUser,
  deleteUser,
};
