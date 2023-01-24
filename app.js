const express = require("express");
const mysql = require("mysql");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: "./.env" });
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: "",
  database: process.env.DATABASE,
});
const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "hbs");
db.connect((err) => {
  if (err) {
    console.log("Error while connecting", err);
  } else {
    console.log("Connected mysql");
  }
});
app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));
app.listen(8000, () => {
  console.log("Sever started on port 8000");
});
