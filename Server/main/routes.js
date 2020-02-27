var express = require("express");
var router = express.Router();
var pool = require("./db");
var authcheck = require("./authcheck");
var user = require("./user");
var product = require("./product");
var cart = require("./cart");

router.use('/', authcheck);
router.use("/", user);
router.use("/", product);
router.use("/", cart);

module.exports = router;