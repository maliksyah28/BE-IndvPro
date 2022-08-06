const { compare } = require("../../librar/bcrypt");
const express = require("express");
const router = express.Router();
const project = require("../../librar/database");
const { createToken } = require("../../librar/token");
const { sendMail } = require("../../librar/nodemailer");

const loginUser = async (req, res, next) => {
  try {
    // get user yg di input di Frontend
    const { email, password } = req.body;
    // console.log(password);
    const connect = project.promise();
    const sqlGetLoginUser = `select user_Id, username, password, verified from user where email = ? or username =?`;
    const dataGetLoginUser = [email, email];
    const [responsGetLoginUser] = await connect.query(
      sqlGetLoginUser,
      dataGetLoginUser
    );
    // console.log(responsGetLoginUser);

    // cek yg di masukin ada atau engga
    if (!responsGetLoginUser.length) {
      throw {
        code: 404,
        message: "can not find account with your fill",
      };
    }
    // compare password
    const loginUserDB = responsGetLoginUser[0];
    // console.log(loginUserDB.verified);

    // console.log(loginUserDB.password);
    const isPasswordMatch = compare(password, loginUserDB.password);
    // console.log(isPasswordMatch);
    // cek password sama atau engga dengan yg di database
    if (!isPasswordMatch) {
      throw {
        code: 401,
        message: "Password is Incorrect",
      };
    }
    // verified belum ??
    if (!loginUserDB.verified) {
      throw {
        code: 404,
        message: "can not process your acount,please verified FIRST",
      };
    }
    // console.log(loginUserDB.user_Id);
    // generate token saat login
    const token = createToken({
      user_Id: loginUserDB.user_Id,
      username: loginUserDB.username,
    });

    res.send({
      status: "Sucsess",
      message: "Login Sucsess",
      data: {
        result: {
          user_Id: loginUserDB.user_Id,
          username: loginUserDB.username,
          token,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
router.post("/login", loginUser);
module.exports = router;
