const express=require('express');
const { userExist } = require('../controller/isLoggedin');
const router=express.Router();

router.post('/userExist',userExist);

module.exports=router;