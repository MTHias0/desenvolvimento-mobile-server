const express = require('express');
const router = express();

const { authenticateToken } = require('../../middleware.auth')
const { createUser, updateUser, addFavorite, removeFavorite, getFavorites, createOrder, getOrders, getHistory } = require('../controllers/userController');

router.post("/create-user", createUser);
router.put("/update", updateUser);
router.post("/add-favorite", addFavorite);
router.delete("/remove-favorite", removeFavorite);
router.get("/list-favorites", getFavorites);
router.post("/order", createOrder);
router.get("/list-orders", getOrders);
router.get("/list-history", getHistory);

module.exports = router;