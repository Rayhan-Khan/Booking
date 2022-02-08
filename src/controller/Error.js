module.exports=function(err,req,res,next){
   if(process.env.NODE_ENV)
    console.log(err.stack);
   return res.status(500).json({'message':'something went wrong'});
}