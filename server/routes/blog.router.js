const blogController = require("../controller/blogController")
const express = require("express");

const router = express.Router();

router.post("/create-blog",blogController.createBlog);
router.get("/:blog_id",blogController.getBlogDetails);

module.exports = router