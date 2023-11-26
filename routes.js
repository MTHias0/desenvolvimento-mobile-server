const express = require('express');
const router = express();

const { insertProduct, getAllProducts, getProduct } = require('./src/controllers/productController');
const { createUser, addFavorite, removeFavorite, getFavorites, login, createOrder, getOrders, getHistory } = require('./src/controllers/userController');

//produtos
router.post("/insert-product", insertProduct);
router.get("/list-products", getAllProducts );
router.get("/product", getProduct);

// usuários
router.post("/create-user", createUser);
router.post("/login", login);
router.post("/add-favorite", addFavorite);
router.delete("/remove-favorite", removeFavorite);
router.get("/list-favorites", getFavorites);
router.post("/order", createOrder);
router.get("/list-orders", getOrders);
router.get("/list-history", getHistory);

module.exports = router;
