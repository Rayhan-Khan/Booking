const jwt = require("jsonwebtoken");

exports.userExist=(req,res,next)=>{
   const token=req.cookies.token;
   if(!token){
       return res.status(403).json('not logged in user');
   }
   try{
       const user =jwt.verify(token,process.env.SECRET_KEY);
       if(req.body.AUTH_REQUEST==='AUTH_REQUEST')
       return res.status(200).json({data:user.data});
       req.user=user.data;
       next();
   }catch(err){
       return res.status(403).json({"message":'user not logged in'});
   }
}


