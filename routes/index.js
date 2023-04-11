const express =require("express");
const router = express.Router();
const homeController = require("../controllers/homecontroller");
router.get('/',homeController.home) 
router.use('/users',require('./users'));
router.use('/post',require('./post'));
router.use('/auth',require('./auth'));
router.use('/comments',require('./comments'));
router.use('/api',require('./api'));
router.use('/like',require('./like'));
console.log("router loaded")

module.exports = router;
