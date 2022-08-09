const express = require("express");
const router = express.Router();
const project = require("../../librar/database");
const auth = require("../../helpers/auth");

const likeContentUser = async (req, res, next) => {
  try {
    const { user_Id } = req.user;
    const { idpost } = req.params;

    const connect = project.promise();

    // const sqlGetLike = `select user_Id from likes where idpost = ?`
    // const dataDBlikeUser_id= [idpost]

    // const [responsLikeUser_Id] = await connect.query(sqlGetLike,dataDBlikeUser_id)
    // // pelajarin maping biar looping data yg ada disamain sama user_id terus kalau sama munculin message
    // if(responsLikeUser_Id.length) {
    //     const userId = responsLikeUser_Id
    //     console.log(userId);
    //     if (userId == user_Id) {
    //         throw {
    //             code: 400,
    //             message : "You Have been like"
    //         }
    //     }
    // }

    const sqlLikeContent = `insert likes set ?`;
    const dataDBLikeContent = [{ like: true, user_Id, idpost }];
    // console.log(dataDBLikeContent);
    const [responsLikeContent] = await connect.query(
      sqlLikeContent,
      dataDBLikeContent
    );
    // console.log(responsLikeContent)
    if (!responsLikeContent.affectedRows)
      throw { message: "Failed Like Content" };

    res.send({
      status: "succses",
      message: "post liked",
      data: { result: responsLikeContent },
    });
  } catch (error) {
    next(error);
  }
};

router.post("/likedContent/:idpost", auth, likeContentUser);
module.exports = router;
