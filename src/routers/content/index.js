const express = require("express");
const router = express.Router();

const delContentRouter = require("./del.UserContent");
const patchContentRouter = require("./patch.contentUser");
const postContentRouter = require("./post.UserContent")
const GetContentRouter= require("./get.UserContent")
router.use(postContentRouter)
router.use(delContentRouter);
router.use(patchContentRouter)
router.use(GetContentRouter)
module.exports = router;