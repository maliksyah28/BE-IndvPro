const express = require("express");
const router = express.Router();

const PostRegistRouter = require("./post.regist");
const getRegistRouter = require("./get.RegistVer");
router.use(PostRegistRouter);
router.use(getRegistRouter);
module.exports = router;
