const express = require("express");
const router = express.Router();
const project = require("../../librar/database");
const auth = require("../../helpers/auth");
const { uploadContent } = require("../../librar/multer");

const postUserContent = async (req, res, next) => {
  try {
    const { user_Id } = req.user;
    // console.log({ user_Id });

    const { content, caption } = req.body;
    // cek kosong atau engga

    const connect = project.promise();
    // console.log({ connect });
    const { filename } = req.file;
    const savedNameFile = `/public/content/${filename}`;
    const sqlPostContent = `insert into post set ? `;
    // console.log(sqlPostContent);
    const dataDBPostContent = [{ postan: savedNameFile, caption, user_Id }];
    const [responsPostContentUser] = await connect.query(
      sqlPostContent,
      dataDBPostContent
    );
    // console.log(responsPostContentUser);
    if (!responsPostContentUser.affectedRows)
      throw { message: "failed Post Content" };
    res.send({ status: "sucsess", message: "sucsess Post Content" });
  } catch (error) {
    next(error);
  }
};
const fnContent = uploadContent.single("content");
router.post("/PostContent", auth, fnContent, postUserContent);
module.exports = router;
