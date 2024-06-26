// commentController.js
// location: /server/controllers/commentController.js
// This file will contain the logic for handling requests from the comment routes.
import Comment from "../db/MongoDB/Schema/comment.Schema.js";
import Post from "../db/MongoDB/Schema/post.Schema.js";
import User from "../db/MongoDB/Schema/user.Schema.js";

// This section will help you create a new session.
const createComment = async (req, res) => {
  const { content, post_id, user_id } = req.body;

  // check if content, post_id, and user_id are provided
  if (!content || !post_id || !user_id) {
    return res.status(400).json({
      status: "ok",
      data: { valid: false },
      message: "content, post_id, and user_id are required",
    });
  }

  try {
    const newComment = new Comment({
      content,
      post_id,
      user_id,
      likes: 0,
      time_stamp: new Date().toISOString(),
    });

    const savedComment = await newComment.save();

    // Add the comment's _id to the post's comments array
    await Post.findByIdAndUpdate(
      post_id,
      { $push: { comments: savedComment._id } },
      { new: true, useFindAndModify: false }
    );

    console.log("Comment saved successfully");
    res.status(200).json({
      status: "ok",
      data: { valid: true, savedComment },
      message: "Comment saved successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating comment.");
  }
};

// This section will help you get a list of all comments.
const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .select("-createdAt -updatedAt -__v")
      .populate("user_id", "first_name last_name")
      .sort({ time_stamp: -1 });

    console.log("Comments fetched successfully");
    res.status(200).json({
      status: "ok",
      data: { valid: true, comments },
      message: "Comments fetched successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching comments.");
  }
};

// This section will help you get a single comment.
const getComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id)
      .select("-createdAt -updatedAt -__v")
      .populate("user_id", "first_name last_name");

    console.log("Comment fetched successfully");
    res.status(200).json({
      status: "ok",
      data: { valid: true, comment },
      message: "Comment fetched successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "ok",
      data: { valid: false },
      message: "Error fetching comment.",
    });
  }
};

// This section will help you update a comment.
const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, post_id, user_id, likes, time_stamp } = req.body;
    const updatedComment = {
      content,
      post_id,
      user_id,
      likes,
      time_stamp,
    };
    const comment = await Comment.findByIdAndUpdate(id, updatedComment, {
      new: true,
      omitUndefined: true,
    });
    if (!comment) {
      return res.status(404).json({
        status: "ok",
        data: { valid: false },
        message: "Comment not found",
      });
    }

    console.log("Comment updated successfully");
    res.status(200).json({
      status: "ok",
      data: { valid: true, comment },
      message: "Comment updated successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "ok",
      data: { valid: false },
      message: "Error updating comment.",
    });
  }
};

const likeComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    console.log("Comment liked successfully");
    res.status(200).json({
      status: "ok",
      data: { valid: true, comment },
      message: "Comment liked successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

// This section will help you delete a comment.
const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the comment
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({
        status: "ok",
        data: { valid: false },
        message: "Comment not found",
      });
    }

    // Remove the comment's id from the post's comments array
    await Post.findByIdAndUpdate(
      comment.post_id,
      { $pull: { comments: comment._id } },
      { new: true, useFindAndModify: false }
    );

    // Delete the comment
    // await Comment.findByIdAndRemove(id);
    await Comment.findOneAndDelete({ _id: id });

    console.log("Comment deleted successfully");
    res.status(200).json({
      status: "ok",
      data: { valid: true },
      message: "Comment deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "ok",
      data: { valid: false },
      message: "Error deleting comment.",
    });
  }
};

const getOrphanedComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    const orphanedComments = [];

    for (let comment of comments) {
      const postExists = await Post.exists({ _id: comment.post_id });
      const userExists = await User.exists({ _id: comment.user_id });

      if (!postExists || !userExists) {
        orphanedComments.push(comment);
      }
    }

    if (orphanedComments.length === 0) {
      console.log("No orphaned comments found");
      res.status(200).json({
        status: "ok",
        data: { valid: true },
        message: "No orphaned comments found",
      });
    } else {
      console.log("Orphaned comments fetched successfully");
      res.status(200).json({
        status: "ok",
        data: { valid: true, orphanedComments },
        message: "Orphaned comments fetched successfully",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching orphaned comments.");
  }
};

export {
  createComment,
  getAllComments,
  getComment,
  updateComment,
  likeComment,
  deleteComment,
  getOrphanedComments,
};
