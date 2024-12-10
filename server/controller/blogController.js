const BlogService = require("../services/blogService");

const createBlog = async (req, res, next) => {
  try {

    const payload = {
      ...req.body,
      comments: [],
    };
    const { blog } = await BlogService.createBlogService(payload);

    return res.status(201).json({
      status: 201,
      message: "Blog created successfully",
      blog,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: err.message || "An error occurred while creating the user.",
    });
  }
};

const getBlogDetails = async (req, res, next) => {
  try {

    const { blog_id } = req.params;
    const { blog } = await BlogService.getBlogService(blog_id);

    return res.status(200).json({
      status: 200,
      message: "Blog fetched successfully",
      blog,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: err.message || "An error occurred while creating the user.",
    });
  }
};

module.exports = {
  createBlog,
  getBlogDetails,
};
