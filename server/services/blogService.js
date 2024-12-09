const mongoose = require("mongoose");
const Blog = require("../models/blogModel");

const createBlogService = async (payload) => {
  try {
    const blog = await Blog.create(payload);

    return { blog };
  } catch (err) {
    throw new Error(err?.message);
  }
};

const getBlogService = async (id) => {
  try {
    const blog = await Blog.findById(id).populate({
      path:"comments",
      populate:{
        path:"authorId",
        select:["fullName","email"]
      }
    })

    if (!blog) {
      return res.status(404).json({
        status: 404,
        message: "Blog not found",
      });
    }

    return { blog };
  } catch (err) {
    throw new Error(err?.message);
  }
};

module.exports = {
  createBlogService,
  getBlogService,
};
