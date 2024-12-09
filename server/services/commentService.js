const Comment = require("../models/commentModel");
const Blog = require("../models/blogModel");

const createCommentService = async (payload) => {
  try {
    const {blogId} = payload;


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

module.exports = {
    createCommentService,
};
