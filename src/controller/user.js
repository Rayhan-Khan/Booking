const User=(req,res,next)=>{
    if(req.user.role==='user')
      next()
    else
       return res.status(403).json({ message: "Access Denied" });
}

module.exports=User;