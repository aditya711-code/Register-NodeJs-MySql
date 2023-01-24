const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: "",
  database: process.env.DATABASE,
});
exports.register = (req, res) => {
  console.log(req.body);
  const { name, email, password, confirmpassword } = req.body;
  db.query(
    "SELECT email FROM users where email = ?",
    [email],
    async (err, results) => {
      if (err) {
        console.log("ERROR in storing email", err);
      }
      if (results.length > 0) {
        return res.render("register", {
          message: "Email is already in use",
        });
      } else if (password != confirmpassword) {
        return res.render("register", {
          message: "Password and Confirm Password don't match",
        });
      }
      let hashedpassword = await bcrypt.hash(password, 8);
      console.log(hashedpassword);
      db.query(
        "INSERT INTO users SET ?",
        {
          name: name,
          email: email,
          password: hashedpassword,
        },
        (err, results) => {
          if (err) {
            console.log("ERROR in storing email", err);
          } else {
            console.log(results);
            return res.render("register", {
              message: "User Registered",
            });
          }
        }
      );
    }
  );
  //res.send("Form Submitted");
};
