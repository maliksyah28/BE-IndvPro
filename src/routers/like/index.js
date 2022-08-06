const express = require("express");
const router = express.Router();

const postLikeContent = require("./post.LikeContentUser")

router.use(postLikeContent)
module.exports = router