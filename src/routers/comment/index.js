const express = require("express");
const router = express.Router();

const postCommentContent = require("./post.CommentUser")
const GetCommentContent = require("./Get.CommentContent")

router.use(postCommentContent)
router.use(GetCommentContent)
module.exports = router