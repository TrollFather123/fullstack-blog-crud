const mongoose = require("mongoose");
const Blog = require("../models/blogModel");
const Comment = require("../models/commentModel");

const createBlogService = async (payload) => {
  try {
    const blog = await Blog.create(payload);

    return { blog };
  } catch (err) {
    throw new Error(err?.message);
  }
};

const getAllBlogServices = async () => {
  try {
    const blogs = await Blog.find().populate({
      path: "userId",
      select: "fullName",
    });

    return { blogs };
  } catch (err) {
    throw new Error(err?.message);
  }
};

const getBlogService = async (id) => {
  try {
    const blogDetails = await Blog.findById(id)
      .populate({
        path: "userId",
        select: "fullName",
      })
      .populate({
        path: "comments",
        populate: {
          path: "authorId",
          select: "fullName email createdAt",
        },
      })
      .lean();
    // const blogDetails = await Blog.aggregate([
    //   {
    //     $match: {
    //       _id: new mongoose.Types.ObjectId(id),
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: "users",
    //       foreignField: "_id",
    //       localField: "userId",
    //       as: "userDetails",
    //     },
    //   },
    //   {
    //     $unwind: "$userDetails",
    //   },
    //   {
    //     $group: {
    //       _id: "$_id",
    //       userName: { $first: "$userDetails.fullName" },
    //       createdAt: { $first: "$createdAt" },
    //       image: { $first: "$image" },
    //       title: { $first: "$title" },
    //       description: { $first: "$description" },
    //       comments: { $first: "$comments" },
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: "comments",
    //       foreignField: "_id",
    //       localField: "comments",
    //       as: "comments",
    //     },
    //   },
    //   {
    //     $unwind: {
    //       path: "$comments",
    //       preserveNullAndEmptyArrays: true,
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: "users",
    //       foreignField: "_id",
    //       localField: "comments.authorId",
    //       as: "comments.author",
    //     },
    //   },
    //   {
    //     $unwind: {
    //       path: "$comments.author",
    //       preserveNullAndEmptyArrays: true,
    //     },
    //   },
    //   {
    //     $project: {
    //       title: 1,
    //       image: 1,
    //       description: 1,
    //       userName:1,
    //       "comments._id": 1,
    //       "comments.comment": 1,
    //       "comments.author.fullName": 1,
    //       "comments.author.email": 1,
    //       "comments.author.createdAt": 1,
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: "$_id",
    //       image: { $first: "$image" },
    //       title: { $first: "$title" },
    //       userName: { $first: "$userName" },
    //       description: { $first: "$description" },
    //       comments: { $addToSet: "$comments" },
    //     },
    //   },

    // ]);

    if (!blogDetails) {
      return res.status(404).json({
        status: 404,
        message: "Blog not found",
      });
    }

    return { blog: blogDetails };
  } catch (err) {
    throw new Error(err?.message);
  }
};

const updateBlogService = async (id, payload) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, payload, {
      new: true,
    });

    return { updatedBlog };
  } catch (err) {
    throw new Error(err?.message);
  }
};

const deleteBlogService = async (id) => {
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({
        status: 404,
        message: "Blog not found",
      });
    }
    await Blog.findByIdAndDelete(id);

    await Comment.deleteMany({ blogId: id });

    return { message: "Blog and related comments deleted successfully" };
  } catch (err) {
    throw new Error(err?.message);
  }
};

module.exports = {
  createBlogService,
  getBlogService,
  getAllBlogServices,
  updateBlogService,
  deleteBlogService,
};
