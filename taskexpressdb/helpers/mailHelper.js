const nodemailer = require('nodemailer');

let transporter= nodemailer.createTransport({
    service:"Gmail",
    auth:{
        user:"hanumanna2000@gmail.com",
        pass:"fssdwdjjrlhgwnge"
    }
    
})

let validationMail=(email,name,otp)=>{
    let mailOptions={
        from:"hanumanna@gmail.com",
        to:email,
        subject:"one time password",
        html:`Hi,${name} your OTP is ${otp}`
    }
    transporter.sendMail(mailOptions,()=>{
        console.log(`mail sent successfully to ${name}`)
    })
}

module.exports={validationMail}