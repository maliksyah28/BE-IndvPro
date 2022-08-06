const project = require("../../librar/database");
const { verifyToken } = require("../../librar/token");

const auth = async (req, res, next) => {
  try {
    const token = req.token;
    // console.log(token);
    const isVerifiedToken = verifyToken(token);

    const connect = project.promise();
    // ambil data di DB ngacu nya ke user id
    const sqlGetUser = `select user_Id, username from user where user_Id =?`;
    const dataGetUser = [isVerifiedToken.user_Id];
    const [responsDataGetUser] = await connect.query(sqlGetUser, dataGetUser);
    // console.log(responsDataGetUser);
    // di cek kalau ga ada throw error
    if (!responsDataGetUser.length) throw { message: "User not found" };
    // nuat nampilin user id di req.body
    const { user_Id, username } = responsDataGetUser[0];
    // console.log(responsDataGetUser[0]);
    // kenapa username tidak masuk padahal sudah bisa login???
    // console.log("hello", username);
    req.user = { user_Id, username };

    // kalau hasil cek aman di lanjut ke parameter setelah auth
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = auth;
