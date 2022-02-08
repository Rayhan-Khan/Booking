const Admin=(req,res,next)=>{
    if(req.user.role==='admin')
      next()
    else
       return res.status(403).json({ message: "Access Denied" });
}

module.exports=Admin;