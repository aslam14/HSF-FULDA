var express = require("express");
var transactionRotes = express.Router();
var pool = require("./db");

transactionRotes.get("/api/get/getTransactions", function(req, res, next) {
  var userId = req.query.id;
  const query =
    "SELECT  p.name as product_name, price, u.name as seller_name, sold_date FROM hsfuldadb.product p join hsfuldadb.user u on u.id = p.seller_id where buyer_id = " + userId;
  pool.query(query, (q_err, q_res) => {
    if (q_err != null) {
      console.log(q_err);
      res.status(401).json(q_err);
    } else {
      console.log(JSON.stringify(q_res, null, 2));
      res.status(200).json(q_res);
    }
  });
});
 
// router.use('/', authcheck);
module.exports = transactionRotes;