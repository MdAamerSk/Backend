const multer = require("multer");

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/");
    },
    filename:(req,file,cb)=>{

        //size and ratio and format of the file can be checked here

        cb(null,Date.now() + file.originalname);
    }
})

const upload =multer({storage});

module.exports = upload;