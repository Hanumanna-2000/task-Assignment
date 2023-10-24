const {Schema,model}= require('mongoose');

taskSchema=new Schema({
    taskname:{
        type:String,
        required:[true,"task is mandatory"]
    },
    userId:{
        type:String,
        required:[true,"userId is mandatory"]
    },
},
{
    timestamps:true
})


module.exports=new model("task",taskSchema)