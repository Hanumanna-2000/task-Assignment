const express = require('express');
const { createUser, getAllUser, updateUser, deleteUser, getSingleuser } = require('../controllers/dduser.controller');
const multer = require('multer');
const path = require('path');


let router=express.Router();


let myStorage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/uploads")
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+'_'+Date.now()+ path.extname(file.originalname))
    }
})



let upload=multer({storage:myStorage})

router.post('/createuser',upload.single("f_image"),createUser)
router.get('/getalluser',getAllUser)
router.put('/updateuser/:id',upload.single("f_image"),updateUser)
router.delete('/deleteuser/:id',deleteUser)
router.get('/getsingleuser/:id',getSingleuser)

module.exports=router