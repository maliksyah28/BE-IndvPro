const multer = require("multer");
const appRootPath = require("app-root-path");
const path = require("path");

//alamat folder penyimpanan
const avaPath = path.join(appRootPath.path, "public", "AVA");
const contentPath = path.join(appRootPath.path, "public", "content");
// console.log(contentPath);

const storageAva = multer.diskStorage({
  //tempat penyimpanan
  destination: function (req, file, cb) {
    cb(null, avaPath);
  },
  // nama in file
  filename: function (req, file, cb) {
    const { username } = req.user;

    // console.log(req.user);
    cb(null, `${username}-ava.png`);
  },
});

const uploadAva = multer({
  storage: storageAva,
  limits: {
    fileSize: 104857600,
  },
  fileFilter(req, file, cb) {
    const approvedFile = [".png", ".jpg", ".jpeg"];
    const fileNameByext = path.extname(file.originalname);
    //looping type file
    approvedFile.includes(fileNameByext);

    // cek file extension sesuai ga sama approvedFile
    if (!approvedFile.includes(fileNameByext)) {
      return cb(error);
    }
    cb(null, true);
  },
});

// buat postingan content
const storageContent = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, contentPath);
  },
  filename: function (req, file, cb) {
    const curentDateContent = new Date();
    const differentContent = curentDateContent.getTime();
    const { user_Id, username } = req.user;
    cb(null, `${username}-${user_Id}-${differentContent}-content.png`);
  },
});
// console.log(storageContent);
const uploadContent = multer({
  storage: storageContent,
  limits: {
    fileSize: 104857600,
  },
  fileFilter(req, file, cb) {
    const approvedFile = [".png", ".jpg", ".jpeg"];
    const fileNameByext = path.extname(file.originalname);
    //looping type file
    approvedFile.includes(fileNameByext);

    // cek file extension sesuai ga sama approvedFile
    if (!approvedFile.includes(fileNameByext)) {
      return cb(error);
    }
    cb(null, true);
  },
});
module.exports = { uploadAva, uploadContent };
