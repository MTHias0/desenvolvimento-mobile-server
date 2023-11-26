const express = require('express');
const router = express();
const prodRouter = require('./src/routers/prodRouter');
const userRouter = require('./src/routers/userRouter');
const authRouter = require('./src/routers/authRouter');

router.use(authRouter);
router.use(prodRouter);
router.use(userRouter);

module.exports = router;
