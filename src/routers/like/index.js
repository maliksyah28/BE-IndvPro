const express = require("express");
const router = express.Router();

const postLikeContent = require("./post.LikeContentUser");
const getliked = require("./get.postLike");

router.use(postLikeContent);
router.use(getliked);
module.exports = router;
