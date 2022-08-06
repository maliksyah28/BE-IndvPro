const { hash } = require("../../librar/bcrypt");
const express = require("express");
const router = express.Router();
const { isFieldEmpties, checkPasswordValidity } = require("../../helpers");
const project = require("../../librar/database");
const { sendMail } = require("../../librar/nodemailer");
const { createToken } = require("../../librar/token");
const Emailvalidator = require("email-validator");
var passwordValidator = require("password-validator");
const registUser = async (req, res, next) => {
  try {
    const { username, email, password, rePassword } = req.body;

    //console.log({ password });
    // cek form kosong atau engga
    const emptyForm = isFieldEmpties({ username, email, password, rePassword });
    if (emptyForm.length) {
      throw {
        code: 400,
        status: "Error",
        message: `Empty Form : ${emptyForm}`,
        data: { result: emptyForm },
      };
    }
    const connect = project.promise();

    // cek username dan email sudah digunakan atau belum
    const sqlGetRegistUser = `select username, email from user where username=? or email=?`;
    const dataGetRegistUser = [username, email];

    const [responsGetRegistUser] = await connect.query(
      sqlGetRegistUser,
      dataGetRegistUser
    );

    if (responsGetRegistUser.length) {
      const user = responsGetRegistUser[0];
      if (user.username == username) {
        throw {
          code: 400,
          status: "Error",
          message: "Username already exists",
        };
      } else {
        throw {
          code: 400,
          status: "Error",
          message: "email already exists",
        };
      }
    }
    //
    const emailregsValidator = Emailvalidator.validate(email);
    if (!emailregsValidator) {
      throw {
        code: 400,
        message: "Email not Found",
      };
    }
    const schema = new passwordValidator();
    schema
      .is()
      .min(8) // Minimum length 8
      .is()
      .max(100) // Maximum length 100
      .has()
      .uppercase(1) // Must have uppercase letters
      .has()
      .lowercase() // Must have lowercase letters
      .has()
      .digits(1) // Must have at least 2 digits
      .has()
      .not()
      .spaces() // Should not have spaces
      .is()
      .not()
      .oneOf(["Passw0rd", "Password123"]); // Blacklist these values
    const messageError = schema.validate(password, { list: true });
    console.log("ini", messageError);
    if (messageError.length)
      throw {
        code: 400,
        message: messageError,
      };
    // validator pass
    // const isPasswordValid = checkPasswordValidity(password);
    // if (isPasswordValid)
    //   throw {
    //     code: 400,
    //     status: "error",
    //     message: isPasswordValid,
    //   };
    //
    // encrypted pass
    const encryptedPass = hash(password);
    // input data regist ke db
    const sqlRegistUser = `insert into user set ?`;
    // dataRegistUser itu mengisi si "?"
    const dataRegistUser = [
      { username, email, password: encryptedPass, rePassword: encryptedPass },
    ];

    const [responsRegistUser] = await connect.query(
      sqlRegistUser,
      dataRegistUser
    );
    const TokenVerify = createToken({ user_Id: responsRegistUser.insertId });
    await sendMail({ email, TokenVerify });
    res.send({
      status: "succsess",
      message: "resgist customer succses",
      data: { result: responsRegistUser },
    });
  } catch (error) {
    next(error); //error di pindah ke error handler di index src
  }
};

router.post("/regist", registUser);
module.exports = router;
