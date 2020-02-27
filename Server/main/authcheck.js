var express = require("express");
var router = express.Router();
var pool = require("./db");

router.post("/api/post/login", function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
   const query =
   "SELECT user.user_id, user.password FROM `GDSD_schema`.`user` WHERE email = '" + email + "'";
  //const query = `SELECT user.user_id, user.password, users.role FROM user join users on user.user_id = users.id WHERE user.email='${email}'`;
  pool.query(query, (q_err, q_res) => {
    if (q_err != null) {
      console.log("error ocurred", q_err);
      res.send({
        code: 400,
        failed: "error ocurred"
      });
    } else {
      console.log(JSON.stringify(q_res, null, 2));
      if (q_res.length > 0) {
        console.log("Password - ", q_res[0].password, req.body.password);
        if (q_res[0].password == password) {
          res.send({
            code: 200,
            success: "login sucessfull"
            
          });
        } else {
          res.send({
            code: 204,
            success: "Email and password does not match"
          });
        }
      } else {
        res.send({
          code: 204,
          success: "Email does not exist"
        });
      }
    }
  });
});

router.post("/api/post/signup", function(req, res, next) {
  var firstName = req.body.firstname;
  var lastName = req.body.lastname;
  var email = req.body.email;
  var password = req.body.password;
  var phoneNo = req.body.phoneNo;
  console.log(req.body);

  const query1 =
    "SELECT email FROM `GDSD_schema`.`user` WHERE email = '" + email + "'";
  pool.query(query1, (q_err, q_res) => {
    if (q_err != null) {
      console.log("error ocurred", q_err);
      res.send({
        code: 400,
        failed: "error ocurred"
      });
    } else {
      console.log(JSON.stringify(q_res, null, 2));
      if (q_res.length > 0) {
        console.log("email - ", q_res[0].email, req.body.email);
        if (q_res[0].email == req.body.email) {
          res.send({
            code: 204,
            success: "There is an acoount with same Email"
          });
        }
      } else {
        const query2 =
          "INSERT INTO `GDSD_schema`.`user` (firstname, lastname, email,password, phone) VALUES ('" +
          firstName +
          "', '" +
          lastName +
          "', '" +
          email +
          "', '" +
          password +
          "' , '" +
          phoneNo +
          "')";
        pool.query(query2, (q_err, q_res) => {
          if (q_err != null) {
            console.log("error ocurred", q_err);
            res.send({
              code: 400,
              failed: "error ocurred"
            });
          } else {
            console.log(JSON.stringify(q_res, null, 2));
            res.send({
              code: 200,
              success: "signup sucessfull"
            });
          }
        });
      }
    }
  });
});

module.exports = router;