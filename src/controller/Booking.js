const mongoose=require('mongoose');
const Booking=require('../models/booking')

exports.Booking=async(req,res)=>{
    const {StartDate,EndDate,room,Totalprice}=req.body;
    const user=req.user._id;
    const RoomId=req.params.id;
    const booking=new Booking({
        StartDate,
        EndDate,
        room,
        user,
        RoomId,
        Totalprice
    });
    booking.save((err,data)=>{
        if(err){
            return res.status(200).json(err);
        }
        return res.status(201).json(data);
    })
}

async function BookingCount(StartDate,EndDate,user,product) {
    const start=new Date(StartDate);
    const end=new Date(EndDate);
    let book=await Booking.aggregate([
        {$match:{user:user,RoomId:product}},
        {$match:{
            $or: [
                {StartDate: { $gte:start, $lte:end}},
                {
                    EndDate: { $gte:start, $lte:end} 
                },
                {
                    $and: [{StartDate:{ $lte:start},EndDate:{$gte:end}}]
                },
            ],
        }},
        {$group:{
            _id:user,
            count:{$sum:"$room"}
        }}
    ]) 
    let count=0;
    if(book[0]?.count)
      count=book[0].count;
    return count;
}
exports.bookingCount=async(req,res)=>{
    const user= mongoose.Types.ObjectId(req.user._id);
    const product=mongoose.Types.ObjectId(req.params.id);
    const count=await BookingCount(req.body.StartDate,req.body.EndDate,user,product)
    res.status(200).json(count);
}

exports.bookinguser=async(req,res)=>{
    const user=mongoose.Types.ObjectId(req.user._id)
    const bookinguser=await Booking.find({user});
    if(bookinguser.length>0)
    return res.status(200).json(bookinguser);
    else 
       return res.status(200).json({message:'No booking'});
}

exports.bookingAdmin=async(req,res)=>{
    const bookingAdmin=await Booking.find({});
    if(bookingAdmin.length>0)
    return res.status(200).json(bookingAdmin);
    else
    return res.status(200).json({message:'No booking'});
}