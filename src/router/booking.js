const { userExist } = require("../controller/isLoggedin");
const User = require("../controller/user");
const {Booking, bookingCount, bookinguser, bookingAdmin}=require('../controller/Booking')

const express=require('express');
const Admin = require("../controller/Admin");
const router=express.Router();


router
    .post('/booking/:id',userExist,User,Booking)
    .post('/bookingcount/:id',userExist,User,bookingCount)
    .get('/booking',userExist,User,bookinguser)
    .get('/admin/booking',userExist,Admin,bookingAdmin)
module.exports=router;