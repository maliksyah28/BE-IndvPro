const express = require("express");
const router = express.Router();
const project = require("../../librar/database");
const auth = require("../../helpers/auth");

const commentContentUser = async (req, res, next) => {
  try {
    const { user_Id } = req.user;
    const { idpost } = req.params;
    const { comment } = req.body;
    const connect = project.promise();

    const sqlCommentContent = `insert comment set ?`;
    const dataDBCommentContent = [{ user_Id, idpost, comment }];
    const [responsCommentContent] = await connect.query(
      sqlCommentContent,
      dataDBCommentContent
    );
    if (!responsCommentContent.affectedRows)
      throw { message: "failed to Comment Content" };

    res.send({
      status: "succses",
      message: "create comment",
      data: { result: responsCommentContent },
    });
  } catch (error) {
    next(error);
  }
};

router.post("/CommentContent/:idpost", auth, commentContentUser);
module.exports = router;
