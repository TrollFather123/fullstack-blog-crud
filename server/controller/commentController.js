const CommentService = require("../services/commentService");

const createComment = async (req, res, next) => {
  try {
    const {authorId ,blogId, comment} = req.body
    const { newComment } = await CommentService.createCommentService({
        authorId,comment,blogId
    });

    return res.status(201).json({
      status: 201,
      message: "Comment created successfully",
      newComment
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: err.message || "An error occurred while creating the user.",
    });
  }
};



module.exports = {
    createComment
};
