const jwt = require("jsonwebtoken");
const secret_jwt = "padamunegeri"; // buat verify

//buat Token
const createToken = (payload) => jwt.sign(payload, secret_jwt);
// cek token di buat di web ini atau bukan
const verifyToken = (token) => jwt.verify(token, secret_jwt);

module.exports = { createToken, verifyToken };
