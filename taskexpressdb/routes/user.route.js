const express = require('express');
const { addUser, getUser, userLogin, verificationOTP } = require('../controllers/user.controller');
const multer = require('multer');
let router=express.Router();

let myStorage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./public/uploads")
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})

let upload=multer({storage:myStorage})

router.post('/adduser',upload.single("imgURL"),addUser)
router.get('/getuser',getUser)
router.post('/login',userLogin)
router.post('/otpverify',verificationOTP)


module.exports=router