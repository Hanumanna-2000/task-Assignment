const express = require('express');
 require('dotenv').config();
 const cors = require('cors');
 require('./adapters/connectionDB');
let userRoute=require('./routes/user.route')
let taskRoute=require('./routes/task.route')
let DDUserRoute=require('./routes/dduser.route')
let loginAdminRoute=require('./routes/t_login.route')
 let app=express();
    app.use(cors())
     app.use(express.urlencoded({extended:false}))
   app.use(express.json());
   app.use(express.static('./public/'))
   app.use("/api/user",userRoute)
   app.use('/api/task',taskRoute)
   app.use('/api/dduser',DDUserRoute)
   app.use('/api/loginadmin',loginAdminRoute)
   

   app.use("*",(req,res,next)=>{
      res.status(404).json({error:false,message:"page not found"})
   })

   app.use((err,req,res,next)=>{
      res.status(400).json({error:true,message:err.message,data:"ok"})
})

   
   app.listen(process.env.PORT,()=>{
      console.log(`server is  running on port ${process.env.PORT}`)
   })
