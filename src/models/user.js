const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const validator = require('validator');

const UserSchema=new mongoose.Schema({
     Name:{
        type:String,
        required:[true,'Plesase provide your name']
    }, 
    Email:{
        type:String,
        required:[true,'Please provide your email'],
        unique:true,
        validate:[validator.isEmail,'Please provide a valid email']
    },
    passWord:{
        type:String,
        required:true,
        minlength: [6, 'minimum character']
    },
    confirmPassword:{
        type:String,
        required:true,
        validate:{
            validator:function(el){
               //el===this.confirmPassword
               //console.log(this.confirmPassword)
            return (el===this.passWord)},
        message:'Passwords are not the same'
        }
    },
    role:{
        type:String,
        required:true,
        enum:['user','admin'],
        default:'user'
    },
    Profile:String
})
UserSchema.pre('save',async function(next){
    this.passWord = await bcrypt.hash(this.passWord, 12); 
     this.confirmPassword=undefined;
    next()
})
UserSchema.methods.ConfirmLogin=async function(reqPass,pass){
   return await bcrypt.compare(reqPass,pass);
}
const User=mongoose.model('User',UserSchema);
module.exports =User;