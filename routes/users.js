const express = require('express');
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/userController")
const User = require("../models/user")
const middleware = require("../controllers/middleware")

router.get('/',userController.index);
router.get('/register',userController.registerget);
router.post('/register',userController.registerpost);
router.post('/uyekaydet',userController.uyekaydet)
router.get('/login',userController.loginget);
router.get('/admingiris',userController.loginadmin);
router.post('/login', passport.authenticate('local'),userController.loginpost);
router.get('/logout',userController.logout);


module.exports = router;
