const {Schema,model}= require('mongoose');

userSchema=new Schema({
    name:{
        type:String,
        required:[true,"fullname is mandatory"]
    },
    email:{
        type:String,
        required:[true,"email is mandatory"]
    },
    role:{
        type:String,
        required:[true,"role is mandatory"],
        enum:["teacher","student","admin"]
    },
    imgURL:{
        type:String,
        default:null
    }
    ,
    otp:{
        type:String,
        default:null
    }
    
},
{
    timestamps:true
})


module.exports=new model("user",userSchema)