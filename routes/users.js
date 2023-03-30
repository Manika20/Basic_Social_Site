const express = require('express');
const passport= require('passport');
const router = express.Router();
const userController = require('../controllers/usercontroller');
router.get('/profile',passport.checkAuthentication ,userController.profile);
router.get('/sign-up',userController.signUp);
router.get('/sign-in',userController.signIn);
router.post('/create',userController.create);
//use passport as a middle ware to authenticate.
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'}
),userController.createSession);
module.exports = router;
router.get('/sign-out',userController.destroySession)
