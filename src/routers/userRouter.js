const express = require('express');
const router = express();

const { authenticateToken } = require('../../middleware.auth')
const { createUser, addFavorite, removeFavorite, getFavorites, createOrder, getOrders, getHistory } = require('../controllers/userController');

router.post("/create-user", createUser);
router.post("/add-favorite", authenticateToken , addFavorite);
router.delete("/remove-favorite", authenticateToken, removeFavorite);
router.get("/list-favorites" ,authenticateToken, getFavorites);
router.post("/order", authenticateToken, createOrder);
router.get("/list-orders", authenticateToken, getOrders);
router.get("/list-history", authenticateToken, getHistory);

module.exports = router;