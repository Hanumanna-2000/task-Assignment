let Task=require('../models/task.model')

let addTasks=async(req,res,next)=>{
    try {
        let {taskname}=req.body
        if(taskname.trim()===""){
            return res.status(500).json({error:true,message:" invalid input"})
        }
            
        let tasks=await Task.create({taskname,userId:req.user.id})
        if(!tasks){
            return res.status(500).json({error:true,message:"unexpected error"})
        }
        res.status(200).json({error:false,message:"task added successfully",tasks})
    } catch (err) {
       next(err) 
    }
}


let getTasks=async(req,res,next)=>{
    try {
        let tasks=await Task.find();
        if(!tasks){
            return res.status(500).json({error:true,message:"unexpected error"})
        }
        res.status(200).json({error:false,message:"fetched successfully",data:tasks})
    } catch (err) {
        next(err)
    }
}

let getSingleTask=async(req,res,next)=>{
    try {
        let {id}=req.params
        let task=await Task.findById(id)

        if(!task){
            return res.status(404).json({error:true,message:"task not found with given id"})
        }

        res.status(200).json({error:true,message:"task fetched successfully",data:task})
    } catch (err) {
        next(err)
    }
}

let updateTask=async(req,res,next)=>{
    try {
        let {taskname}=req.body
        let {id}=req.params;
        let task=await Task.findOneAndUpdate({_id:id},{taskname},{new:true});
        if(!task){
            return res.status(500).json({error:true,message:"unexpected error occur"})
        }
        return res.status(201).json({error:false,message:"updated successfully"})
    } catch (err) {
        next(err)
    }
}

let deleteTask=async(req,res,next)=>{
    try {
        let {id}=req.params;
        console.log(id)
        let task=await Task.findOneAndDelete(id)
        if(!task){
            return res.status(500).json({error:true,message:"unexpected error occur"})
        }
        res.status(201).json({error:false,message:"deleted successfully",task})
    } catch (err) {
    next(err)
    }
}
module.exports={addTasks,getTasks,getSingleTask,updateTask,deleteTask}