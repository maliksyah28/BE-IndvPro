const express = require("express");
const router = express.Router();

const patchUpdateUserRouter = require("./patch.updateuser");
const getProfileUserRouter = require("./Get.UserProfile");


router.use(patchUpdateUserRouter);
router.use(getProfileUserRouter);
// router.use(postContentUserRouter);
module.exports = router;
