const {Schema,model} = require('mongoose');

let ddUserSchema=new Schema({
    f_Name:{
        type:String,
        required:true
    },
    f_Email:{
        type:String,
        required:true,
        unique:true
    },
    f_Mobile:{
        type:Number,
        required:true
    },
    f_Designation:{
        type:String,
        required:true
    },
    f_Gender:{
        type:String,
        required:true
    },
    f_Course:{
        type:String,
        required:true
    },
    f_image:{
        type:String,
        required:true
    }
},
{
    timestamps:true
})

module.exports=new model('dduser',ddUserSchema)