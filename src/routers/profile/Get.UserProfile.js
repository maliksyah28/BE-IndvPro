const express = require("express");
const router = express.Router();
const project = require("../../librar/database");
const auth = require("../../helpers/auth");
const { isFieldEmpties } = require("../../helpers");
const getUserProfile = async (req, res, next) => {
  try {
    const connect = project.promise();
    const { user_Id } = req.user;
    const sqlGetUserProfile = `select user_Id,username, email, profilepicture, Fullname,Bio from user where user_Id = ?`;
    const dataGetUserProfile = [user_Id];
    const [responsGetUserProfile] = await connect.query(
      sqlGetUserProfile,
      dataGetUserProfile
    );
    if (!responsGetUserProfile.length) throw { message: "User Not Found" };

    
    res.send({
      status: "succses",
      message: "user Profile",
      data: { result: responsGetUserProfile },
    });
  } catch (error) {
    next(error);
  }
};
router.get("/profile", auth, getUserProfile);
module.exports = router;
