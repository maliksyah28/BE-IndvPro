const express = require("express");
const router = express.Router();
const project = require("../../librar/database");
const { isFieldEmpties } = require("../../helpers");
const auth = require("../../helpers/auth");
const { uploadAva } = require("../../librar/multer");

const updatedProfileUser = async (req, res, next) => {
  try {
    const { user_Id } = req.user;
    const { Fullname, Bio, username } = req.body;

    const emptyForm = isFieldEmpties({ Fullname, Bio, username });
    // buat cek ada isi nya ga si form tuh
    if (emptyForm.length) {
      throw {
        code: 400,
        message: `Empty Form: ${emptyForm}`,
        data: { result: emptyForm },
      };
    }
    const connect = project.promise();

    // update
    const sqlPatchUpdate = `update user set ? where user_Id = ?`;
    const dataDBUpdate = [{ Fullname, Bio, username }, user_Id];
    const [responsUpdateUser] = await connect.query(
      sqlPatchUpdate,
      dataDBUpdate
    );
    if (!responsUpdateUser.affectedRows)
      throw { message: "failed update user profile" };
    res.send({ status: "sucsess", message: "Sucsess Update data" });
  } catch (error) {
    next(error);
  }
};

const updateProfileAva = async (req, res, next) => {
  try {
    const { user_Id } = req.user;
    const { filename } = req.file;
    const connect = project.promise();
    const savedNameFile = `/public/AVA/${filename}`;
    //akses database
    const sqlUpdateAva = `update user set ? where user_Id = ? `;
    const dataUpdateAva = [{ profilepicture: savedNameFile }, user_Id];
    const [responsUpdateAva] = await connect.query(sqlUpdateAva, dataUpdateAva);
    if (!responsUpdateAva.affectedRows)
      throw { message: "failed to update user" };
    res.send({ status: "sucsess", message: "succses update avatar" });
  } catch (error) {
    next(error);
  }
};

const fnAva = uploadAva.single("ava");
router.patch("/profileupdateuser", auth, updatedProfileUser);
router.patch("/profileupdateAva", auth, fnAva, updateProfileAva);
module.exports = router;
