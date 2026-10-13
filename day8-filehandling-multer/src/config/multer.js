const multer = require("multer");

 const storageForLocal = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/");
    },
    filename:(req,file,cb)=>{

        //size and ratio and format of the file can be checked here

        cb(null,Date.now() + file.originalname);
    }
})

//for server

const storageForServer = multer.memoryStorage();

const upload =multer({storage: storageForServer});

module.exports = upload;

//now when u use postman post http://localhost:3000/file 
// select form-data and key as image and select file and send it
// u will get the file in req.file and other data in req.body
//and u can use this file to upload to cloudinary or any other cloud storage
//also for local storage u can use storageForLocal instead of storageForServer in the multer function
// also when u check console for storageForServer u will get the file in buffer format and for storageForLocal u will get the file in path format