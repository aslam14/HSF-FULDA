var express = require("express");
var approveProductRoutes = express.Router();
var pool = require("./db");
var cloud = require("./config/cloudinaryConfig");
var upload = require("./config/multer");

approveProductRoutes.get("/api/get/notapprovedproducts", function(req, res, next) {
  console.log("request param is:" + req.query.term);
  const query =
    "SELECT * FROM hsfuldadb.product WHERE is_validated = 0";
  pool.query(query, (q_err, q_res) => {
    console.log("response", q_res);
    if (q_err != null) {
      console.log(q_err);
      res.status(401).json(q_err);
    } else {
      console.log(JSON.stringify(q_res, null, 2));
      res.status(200).json(q_res);
    }
  });
});

approveProductRoutes.post("/api/get/validateproduct", function(req, res, next) {
  console.log("request param is:" + req.body.search);
  var product_id = req.body.product_id;

  const query =
    "update hsfuldadb.product set is_validated = 1 WHERE id = '" + productId +"'";
    product_id +
    "'";
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

approveProductRoutes.post("/api/get/rejectProduct", function(req, res, next) {
    console.log("request param is:" + req.body.search);
    var product_id = req.body.product_id;
  
    const query =
      "update hsfuldadb.product set is_validated = 0, is_validated = 1 WHERE id = '" + productId +"'";
      product_id +
      "'";
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


module.exports = approveProductRoutes;