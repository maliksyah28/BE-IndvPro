//configure database to API
// ini untuk import mysql2
const mysql_project = require("mysql2");

// ini untuk init alamat si server nya
const project = mysql_project.createPool({
  host: "LOCALHOST",
  user: "root",
  database: "mysql_indvro",
  password: "Mysql123",
});
module.exports = project;
