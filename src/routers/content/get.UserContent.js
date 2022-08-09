// hold dulu soalnya pake pagenation infinit scroll
const express = require("express");
const router = express.Router();
const project = require("../../librar/database");
const auth = require("../../helpers/auth");

const getUserContent = async (req, res, next) => {
  try {
    let { getLimitedShow, getOfSet } = req.query;
    const connect = project.promise();
    const { user_Id } = req.user;
    // const { idpost } = req.params;
    const limit = parseInt(getLimitedShow);
    const offset = parseInt(getOfSet);

    // console.log({ limit, offset });
    // Get post with limit
    const sqlGetUserContent = `select idpost,postan,caption, username, p.createdAt as Timer ,count(l.idpost) as likes  from post p left join user u using(user_Id) left join likes l using(idpost) group by idpost LIMIT ? OFFSET ?`;
    const dataGetContent = [limit, offset];
    const [responsGetContent] = await connect.query(
      sqlGetUserContent,
      dataGetContent
    );
    // console.log(responsGetContent.data.data.result);

    // Get all post without limit
    const sqlGetContent = `select idpost,postan,caption, username, p.createdAt as Timer ,count(l.idpost) as likes  from post p left join user u using(user_Id) left join likes l using(idpost) group by idpost`;
    // const dataGetContentUser = [idpost];
    const [responsGetContentUser] = await connect.query(
      sqlGetContent
      // dataGetContentUser
    );

    if (!responsGetContent.length) throw { message: "Content Not Found" };
    res.send({
      status: "succses",
      message: "data Content",
      data: {
        result: responsGetContent,
        dataLength: responsGetContentUser.length,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getDetailPost = async (req, res, next) => {
  try {
    const connect = project.promise();
    const { user_Id } = req.user;
    const { idpost } = req.params;
    const sqlGetDetailPost = `select idpost,postan,caption, username, count(l.idpost) as likes, comment from post p left join user u using(user_Id) left join likes l using(idpost) left join comment using(idpost) where idpost = ?`;
    const dataBaseDetailPost = [idpost];
    const [responsGetDetailpost] = await connect.query(
      sqlGetDetailPost,
      dataBaseDetailPost
    );
    const getLike = `select p.idpost, username, count(l.user_Id) as total_likes from post p left join user u using(user_Id) left join likes l using(idpost) group by idpost = ? `;
    const dbGetLike = [idpost];
    const [resGetLike] = await connect.query(getLike, dbGetLike);

    // console.log({ hmm: responsGetDetailpost[0] });
    if (!responsGetDetailpost.length) throw { message: "Content Not Found" };
    res.send({
      status: "succses",
      message: "content post",
      data: { result: responsGetDetailpost, likes: resGetLike[0].total_likes },
    });
  } catch (error) {
    next(error);
  }
};

router.get("/GetContent/", auth, getUserContent);
router.get("/DetailContent/:idpost", auth, getDetailPost);
module.exports = router;
