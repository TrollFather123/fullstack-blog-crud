const commentController = require("../controller/commentController")
const { authToken } = require("../middlewares/authToken");
const express = require("express");

const router = express.Router();

router.post("/create-comment",authToken,commentController.createComment);
router.post("/delete-comment",authToken,commentController.deleteComment);

module.exports = router