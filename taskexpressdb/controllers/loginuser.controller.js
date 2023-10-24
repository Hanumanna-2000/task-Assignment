const  AdminLogin= require('../models/t_login.model');
const bcryptjs = require('bcryptjs');
let signup=async(req,res,next)=>{
    try {
        let {f_userName,f_pwd}=req.body;
        let isExistOrNot=await AdminLogin.findOne({f_userName})
        if(isExistOrNot){
            return res.status(400).json({error:true,message:'user already exist'})
        }

        isExistOrNot=await AdminLogin.create({f_userName,f_pwd})
        return res.status(200).json({error:false,message:'user created successfully',isExistOrNot})
    } catch (err) {
        next(err)
    }
}

let LoginAdmin=async(req,res,next)=>{
    try {
        let {f_userName,f_pwd}=req.body;
        let isExistOrNot=await AdminLogin.findOne({f_userName})
        if(!isExistOrNot){
            return res.status(400).json({error:true,message:'you dont have account, please signup'})
        }

        let isBool= await bcryptjs.compare(f_pwd,isExistOrNot.f_pwd)
        if(isBool){
            return res.status(200).json({error:false,message:'Login successfully',isExistOrNot})
        }

        return res.status(500).json({error:true,message:'invalid credentials'})
        
    } catch (err) {
        next(err)
    }
}

module.exports={signup,LoginAdmin}