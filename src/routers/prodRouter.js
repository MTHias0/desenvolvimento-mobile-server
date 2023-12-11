const express = require('express');
const router = express();

const { authenticateToken } = require('../../middleware.auth')
const { insertProduct, getAllProducts, getProduct } = require('../controllers/productController');

router.post("/insert-product", insertProduct);
router.get("/list-products", getAllProducts );
router.get("/product", getProduct);


module.exports = router;