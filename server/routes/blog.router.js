const blogController = require("../controller/blogController")
const express = require("express");
const upload = require("../utils/multer.config");
const { authToken } = require("../middlewares/authToken");

const router = express.Router();

router.post("/create-blog",authToken,upload.single("image"),blogController.createBlog);
router.get("/:blog_id",authToken,blogController.getBlogDetails);

module.exports = router