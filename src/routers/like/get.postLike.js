const express = require("express");
const router = express.Router();
const project = require("../../librar/database");
const auth = require("../../helpers/auth");

const getLike = async (req, res, next) => {
  try {
    const { user_Id } = req.user;
    const { idpost } = req.params;

    const connect = project.promise();

    const sqlGetLike = `select user_Id, username, l.like from likes l left join user using(user_Id) where idpost = ?`;
    const dataDBlikeUser_id = [idpost];

    const [responsLikeUser_Id] = await connect.query(
      sqlGetLike,
      dataDBlikeUser_id
    );

    const getLike = `select p.idpost, username, count(l.user_Id) as total_likes from post p left join user u using(user_Id) left join likes l using(idpost) group by idpost = ? `;
    const dbGetLike = [idpost];
    const [resGetLike] = await connect.query(getLike, dbGetLike);
    const userliked = responsLikeUser_Id.map((liked) => {
      if (liked.user_Id == user_Id)
        return res.send({
          code: 400,
          message: "You Have been like",
        });
    });
    res.send({
      status: "succses",
      message: "create comment",
      data: {
        result: responsLikeUser_Id,
        likes: resGetLike[0].total_likes,
      },
    });

    if (!responsLikeUser_Id.length) throw { message: "Like Not Found" };

    // res.send({
    //   status: "succses",
    //   message: "create comment",
    //   data: {
    //     result: responsLikeUser_Id,
    //   },
    // });
  } catch (error) {
    next(error);
  }
};

router.get("/getlike/:idpost", auth, getLike);

module.exports = router;
