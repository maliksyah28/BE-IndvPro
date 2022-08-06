const express = require("express");
const router = express.Router();

const PostLoginRouter = require("./post.login");

router.use(PostLoginRouter);
module.exports = router;
