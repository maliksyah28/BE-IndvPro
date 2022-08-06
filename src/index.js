// import si express.js
const express = require("express");
const app = express();
const port = 2305; // port API
const bearerToken = require("express-bearer-token");
const cors = require("cors");
// import si database
const project = require("./librar/database");

const registUserRouter = require("./routers/regist");
const getRegistVerified = require("./routers/regist/get.RegistVer");
const loginUserRouter = require("./routers/login");
const ContentRouter = require("./routers/content");
const ProfileRouter = require("./routers/profile");
const likeRouter = require("./routers/like");
const commentRouter = require("./routers/comment");

app.use(cors());
app.use(bearerToken());
app.use(express.json());
app.use("/public", express.static("public"));

app.get("/", (req, res) => {
  res.send(`asslamualaikum`);
});

// app.get("/mysql_indvro", async (req, res) => {
//   try {
//     const connect = project.promise();

//     // merintahin API ngambil data di database
//     const sqlGetUser = `select * from userlogin`;

//     // untuk ngeliat list data di database
//     const [responeUser] = await connect.query(sqlGetUser);
//     // console.log(responeUser);
//     res.send({
//       status: "good job",
//       message: "list user Login",
//       data: { responeUser },
//     });
//   } catch (error) {
//     console.log(error);
//     res.send({ status: "error", message: error.message });
//   }
// });

// router

app.use("/user", registUserRouter);
app.use("/user", loginUserRouter);
app.use("/user", ProfileRouter);
app.use("/user", getRegistVerified);
app.use("/post", ContentRouter);
app.use("/likes", likeRouter);
app.use("/comment", commentRouter);

//error handler
app.use((error, req, res, next) => {
  console.log({ error });
  const errorObj = { status: "Error", message: error.message, detail: error };
  const httpCode = typeof error.code == "number" ? error.code : 500;
  res.status(httpCode).send(errorObj);
});

// buat nyambungin port API
app.listen(port, (error) => {
  if (error) return console.log({ err: error.message });
  console.log(`API Running in port ${port}`);
});
