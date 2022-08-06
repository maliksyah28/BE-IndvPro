const express = require("express");
const router = express.Router();
const project = require("../../librar/database");
const auth = require("../../helpers/auth");

// nampilin komen dengan nama
const GetCommentContent = async (req, res, next) => {
  try {
    let { comentLimitedShow, comenttOfSet } = req.query;
    // console.log(comentLimitedShow, comenttOfSet);
    const { user_Id } = req.user;
    const { idpost } = req.params;
    const limit = parseInt(comentLimitedShow);
    const offset = parseInt(comenttOfSet);
    // console.log(limit, offset);

    const connect = project.promise();

    const sqlGetComment = `select user_Id, username, comment, comment.createdAt from comment left join user using(user_Id) where idpost = ? LIMIT ? OFFSET ?`;
    const dataDBComment = [idpost, limit, offset];
    const [responsComment] = await connect.query(sqlGetComment, dataDBComment);

    const sqlComment = `select user_Id, username, comment, comment.createdAt from comment left join user using(user_Id) where idpost = ?`;
    const dbComment = [idpost];
    const [responsCommentar] = await connect.query(sqlComment, dbComment);
    if (!responsComment.length) throw { message: "Comment Not Found" };
    res.send({
      status: "succses",
      message: "create comment",
      data: {
        result: responsComment,
        datalength: responsCommentar.length,
      },
    });
  } catch (error) {
    next(error);
  }
};
router.get("/GetCommentContent/:idpost", auth, GetCommentContent);
module.exports = router;
