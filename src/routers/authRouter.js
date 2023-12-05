const express = require('express');
const router = express();

const { login, getCurrentUser } = require('./../../middleware.auth');

router.post("/login", login);
router.get("/current", getCurrentUser)

module.exports = router;