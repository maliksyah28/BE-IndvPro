const express = require("express");
const router = express.Router();
const project = require("../../librar/database");
const auth = require("../../helpers/auth");
const { isFieldEmpties } = require("../../helpers");
const dataPost = require("../../helpers/gets");

const patcheditContentUser = async (req, res, next) => {
  try {
    const { user_Id } = req.user;
    const { caption } = req.body;
    const emptyForm = isFieldEmpties({ caption });
    // buat cek ada isi nya ga si form tuh
    if (emptyForm.length) {
      throw {
        code: 400,
        message: `Empty Form: ${emptyForm}`,
        data: { result: emptyForm },
      };
    }

    const connect = project.promise();
    const { idpost } = req.params;

    const sqlPatchEditContent = `update post set ? where idpost = ?`;
    const dataDBEdit = [{ caption }, idpost];
    const [responsEditContent] = await connect.query(
      sqlPatchEditContent,
      dataDBEdit
    );
    console.log(responsEditContent);
    if (!responsEditContent.affectedRows)
      throw { message: "failed edit caption" };
    res.send({ status: "sucsess", message: "Sucsess edit caption" });
  } catch (error) {
    next(error);
  }
};
router.patch("/editCaptionContent/:idpost", auth, patcheditContentUser);
module.exports = router;
