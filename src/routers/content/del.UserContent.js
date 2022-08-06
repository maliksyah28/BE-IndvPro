const express = require("express");
const router = express.Router();
const project = require("../../librar/database");


const delContentUser = async (req, res, next) => {
    try {
        // ambil data idpost dari params= link nya
        const {idpost} = req.params
    const connect = project.promise()
    
    const sqlDelPost = `delete from post where idpost = ?`
    const dataDelPost = [idpost]
    const [responsDelPost] = await connect.query(
        sqlDelPost,dataDelPost
    )
    if(!responsDelPost.affectedRows) throw {message : "failed delete post"}
    res.send({
        status: "succses",
        message: "delete post",
        data: { result: responsDelPost },
      });
    } catch (error) {
        next(error)
        
    }
}
router.delete("/postdelete/:idpost", delContentUser)
module.exports=router