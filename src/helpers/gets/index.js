const project = require("../../librar/database");
const { verifyToken } = require("../../librar/token");

const dataPost = async (req,res,next) => {
    try {
        const token = req.token
        const isVerifiedToken = verifyToken(token)


        const connect = project.promise()
        const sqlGetPost = `select idpost from post where user_Id=?`
        const dataGetPost = [isVerifiedToken.user_Id]
        const [responsDataGetPost] = await connect.query(sqlGetPost,dataGetPost)
        
        if(!responsDataGetPost.length) throw {message : "IdPost not found"}
        console.log(responsDataGetPost[0]);
        const idpost = responsDataGetPost

        req.post = idpost
        next()
    } catch (error) {
        next(error)
    }
}
module.exports = dataPost