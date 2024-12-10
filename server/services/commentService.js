const Comment = require("../models/commentModel");
const Blog = require("../models/blogModel");

const createCommentService = async (payload) => {
  try {
    const { blogId } = payload;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        status: 404,
        message: "Blog not found",
      });
    }
    const newComment = await Comment.create(payload);

    blog.comments.push(newComment._id);
    await blog.save();

    return { newComment };
  } catch (err) {
    throw new Error(err?.message);
  }
};

const deleteCommentService = async (blogId, commentId) => {
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      throw new Error("Blog not found");
    }

    const isCommentExist = await Comment.findById(commentId);

    if (!isCommentExist) {
      throw new Error("Comment not found in the blog");
    }

    blog.comments = blog.comments.filter(
      (comment) => comment.toString() !== commentId
    );
    await blog.save();

    await Comment.findByIdAndDelete(commentId);

    return {
      message: "Comment deleted successfully",
    };
  } catch (err) {
    throw new Error(
      err?.message || "An error occurred while deleting the comment"
    );
  }
};

module.exports = {
  createCommentService,
  deleteCommentService
};
