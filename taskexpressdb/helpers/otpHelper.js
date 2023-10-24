const bcryptjs = require('bcryptjs');


let createOTP=async()=>{
    let OTP=Math.floor((Math.random()*89999)+10000).toString()

    let salt=await  bcryptjs.genSalt(10)

    let hashedotp=await bcryptjs.hash(OTP,salt)

    return {hashedotp,OTP}
}

module.exports={createOTP}