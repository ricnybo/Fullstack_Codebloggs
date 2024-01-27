// postController.js
// location: /server/controllers/postController.js
// This file will contain the logic for handling requests from the post routes.
import Post from "../db/mongodb/schema/post.Schema.js";

// This section will help you create a new session.
const createPost = async (req, res) => {
  const { user_id, content } = req.body;

  if (!user_id || !content) {
    return res.status(400).json({
      status: "ok",
      data: { valid: false },
      message: "User id and content are required",
    });
  }
  try {
    const newPost = new Post({
      content,
      user_id,
      likes: 0,
      time_stamp: new Date().toISOString(),
      comments: [],
    });
    console.log(newPost);
    const savedPost = await newPost.save();

    console.log("Post saved successfully");
    res.status(200).json({
      status: "ok",
      data: { valid: true, savedPost },
      message: "Post saved successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating post.");
  }
};

// This section will help you get a list of all posts.
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .select("-createdAt -updatedAt -__v")
      .populate("user_id", "-password -createdAt -updatedAt -__v")
      .populate({
        path: "comments",
        select: "-createdAt -updatedAt -__v",
        populate: {
          path: "user_id",
          select: "first_name last_name",
        },
      })
      .sort({ time_stamp: -1 });

    console.log("Posts fetched successfully");
    res.status(200).json({
      status: "ok",
      data: { valid: true, posts },
      message: "Posts fetched successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching posts.");
  }
};

// This section will help you get a single post.
const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id)
      .select("-createdAt -updatedAt -__v")
      .populate("user_id", "-password -createdAt -updatedAt -__v")
      .populate({
        path: "comments",
        select: "-createdAt -updatedAt -__v",
        populate: {
          path: "user_id",
          select: "first_name last_name",
        },
      });

    console.log("Post fetched successfully");
    res.status(200).json({
      status: "ok",
      data: { valid: true, post },
      message: "Post fetched successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "ok",
      data: { valid: false },
      message: "Error fetching post.",
    });
  }
};

// This section will help you update a post.
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, user_id, likes, time_stamp, comments } = req.body;
    const updatedPost = {
      user_id,
      content,
      likes,
      time_stamp,
      comments,
    };
    const post = await Post.findByIdAndUpdate(id, updatedPost, { new: true });
    if (!post) {
      return res.status(404).json({
        status: "ok",
        data: { valid: false },
        message: "Post not found",
      });
    }

    console.log("Post updated successfully");
    res.status(200).json({
      status: "ok",
      data: { valid: true, post },
      message: "Post updated successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "ok",
      data: { valid: false },
      message: "Error updating post.",
    });
  }
};

export {
  createPost,
  getAllPosts,
  getPost,
  updatePost
};
