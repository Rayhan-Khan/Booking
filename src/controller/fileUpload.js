const multer= require('multer');
const path=require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file);
     cb(null,path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function (req, file, cb) {
      
      const rename=Date.now()+'-'+file.originalname.split(' ').join('-');
      console.log(rename);
      cb(null, rename)
    }
  })
 
  
 // const upload = multer({storage })
  //module.exports=upload;
  module.exports=multer({storage })
