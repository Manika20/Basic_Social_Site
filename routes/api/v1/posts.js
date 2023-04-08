const express =require("express");
const router = express.Router();
const passport = require('passport');
const postApi = require('../../../controllers/api/v1/post_api')

router.delete('/:id',passport.authenticate('jwt',{session:false}),postApi.destroy);
router.get('/',postApi.index);
module.exports = router;