const express=require('express');
const { Signup, Signin, logout } = require('../controller/auth');
const upload = require('../controller/fileUpload');
const router=express.Router();

router
     .post('/login',Signin)
     .post('/signup',upload.single('profile'),Signup)
     .post('/logout',logout)

module.exports=router;