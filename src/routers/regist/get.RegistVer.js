const express = require("express");
const router = express.Router();
const project = require("../../librar/database");
const { verifyToken } = require("../../librar/token");

const verifyUser = async (req, res, next) => {
  try {
    const { token } = req.params;
    const verified = verifyToken(token);
    console.log(verified);
    const connect = project.promise();
    const sqlVerifiedStatus = `update user set ? where user_Id = ?`;
    const dataUpdateVerifiedStatus = [{ verified: true }, verified.user_Id];
    const [responsUpdateVerified] = await connect.query(
      sqlVerifiedStatus,
      dataUpdateVerifiedStatus
    );
    if (!responsUpdateVerified.affectedRows) throw { message: "failed" };
    res.send("<h1>verification success</h1>");
  } catch (error) {
    next(error);
  }
};

router.get("/verified/:token", verifyUser);
module.exports = router;
