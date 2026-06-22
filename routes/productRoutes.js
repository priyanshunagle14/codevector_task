const express = require("express");
const router = express.Router();
const { fetchProducts } = require("../controllers/productController");

router.get("/", fetchProducts);

module.exports = router;