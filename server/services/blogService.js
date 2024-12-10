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
    const blogDetails = await Blog.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "comments",
          foreignField: "_id",
          localField: "comments",
          as: "comments",
        },
      },
      {
        $unwind: "$comments",
      },
      {
        $lookup: {
          from: "users",
          foreignField: "_id",
          localField: "comments.authorId",
          as: "comments.author",
        },
      },
      {
        $unwind: "$comments.author",
      },

      {
        $project: {
          title: 1,
          image: 1,
          description: 1,
          "comments._id": 1,
          "comments.comment": 1,
          "comments.author.fullName": 1,
          "comments.author.email": 1,
          "comments.author.createdAt": 1,
        },
      },
      {
        $group: {
          _id: "$_id",
          image: {
            $first: "$image",
          },
          title: {
            $first: "$title",
          },
          description: {
            $first: "$description",
          },
          comments: {
            $addToSet: "$comments",
          },
        },
      },
    ]);

    if (!blogDetails) {
      return res.status(404).json({
        status: 404,
        message: "Blog not found",
      });
    }

    return { blog: blogDetails[0] };
  } catch (err) {
    throw new Error(err?.message);
  }
};

module.exports = {
  createBlogService,
  getBlogService,
};
