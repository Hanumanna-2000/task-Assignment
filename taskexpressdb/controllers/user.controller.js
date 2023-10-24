const { validationMail } = require('../helpers/mailHelper');
const { createOTP } = require('../helpers/otpHelper');
const User=require('../models/user.model');

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


let addUser=async(req,res,next)=>{
    try {
        
        let {name,email,role}=req.body;
        // if(name.trim()==="" || email.trim()==="" || role.trim()===""){
        //     return res.status(500).json({error:true,message:"Invalid Credentials"})
        // }
        console.log(req.file)

        //! altering the path of file and storing in db
        let port="http://localhost:7000"
        // let path=req.file.path.replace("public","");
        let pathimg=req.file.path.split("public")[1]
       
        let imagePath=port+pathimg
        
        let isAvailable=await User.findOne({email})

        if(isAvailable){
        return res.status(400).json({error:true,message:"user already exists"})
        }

        let user=await User.create({name,email,role,imgURL:imagePath})

        return res.status(200).json({error:false,message:"user added succesfully",data:user})

    } catch (err) {
        next(err);
    }
}

let getUser=async(req,res,next)=>{
    try {
        let user=await User.find()
        if(!user){
            return res.status(500).json({error:true,message:"unexpected error occur"})
        }
        return res.status(200).json({error:false,message:"users fetched successfully",data:user})
    } catch (err) {
        next(err)
    }
}


let userLogin=async(req,res,next)=>{
    try {
        let {email}=req.body;
        let user=await User.findOne({email})
        if(user){
            let {hashedotp,OTP}= await createOTP()
            console.log(hashedotp,OTP)
            let updateOTP= await User.findOneAndUpdate({email},{otp:hashedotp},{new:true})
            validationMail(email,user.name,OTP)
            return res.status(200).json({error:false,message:"Login successfully",data:updateOTP})
        }
        
        return res.status(500).json({error:true,message:"user not exist"})
    } catch (err) {
        next(err)
    }
}

let verificationOTP=async(req,res,next)=>{
    try {
        let {email,otp}=req.body;
        let user=await User.findOne({email})
        if(!user){
            return res.status(500).json({error:true,message:"user not exist"})
        }

        let isOTPcorrectOrNot=await bcryptjs.compare(otp,user.otp);
        if(isOTPcorrectOrNot){
            let token=jwt.sign({email:user.email,id:user._id},process.env.JWT_KEY,{expiresIn:process.env.JWT_EXPIRESIN})
            return res.status(200).json({error:false,message:"token generated successfully",info:token})
        }
        else{
            return res.status(500).json({error:true,message:"invalid otp"}) 
        }

    } catch (err) {
        next(err)
    }
}

module.exports={addUser,getUser,userLogin,verificationOTP}