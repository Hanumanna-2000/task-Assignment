const express = require('express');
const { addTasks, getTasks, getSingleTask, updateTask, deleteTask } = require('../controllers/task.controller');
const { userAuthentication } = require('../services/authService');

let router=express.Router();

router.post("/addtask",userAuthentication,addTasks)
router.get('/gettask',getTasks)
router.get('/getsingletask/:id',getSingleTask)
router.put('/updatetask/:id',userAuthentication,updateTask)
router.delete('/deletetask/:id',userAuthentication,deleteTask)
module.exports=router