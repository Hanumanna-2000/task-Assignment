
const jwt = require('jsonwebtoken');
require('dotenv').config();
let userAuthentication=async(req,res,next)=>{
    try {
        let authToken=req.headers.authorization
       
        if(!authToken || !authToken.startsWith("Bearer")){
            return res.status(500).json({error:true,message:"token required"})
        }  
        let token=authToken.split(' ')[1]
        let decoded=jwt.verify(token,process.env.JWT_KEY)
        let {email,id}=decoded
        req.user={email,id}
        next()
    } catch (err) {
        next(err)
    }
}

module.exports={userAuthentication}