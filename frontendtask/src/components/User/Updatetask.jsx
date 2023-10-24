import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Updatetask = () => {
    let [task,setTask]=useState({taskname:""})
    let navigate=useNavigate()
    let {id}=useParams()
console.log(id)
  let changeTask=({target:{value,name}})=>{
    console.log(value)
    setTask({...task,[name]:value})
  }

    useEffect(()=>{
       async function getTask(){
let {data:{data:{taskname}}}=await axios.get(`http://localhost:7000/api/task/getsingletask/${id}`)
console.log(taskname)
                setTask({...task,taskname})
        }

        getTask()
    },[])
    

    let updateTask=async(e)=>{
      e.preventDefault()
      let res=await axios.put(`http://localhost:7000/api/task/updatetask/${id}`,task,{
        headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        })
      console.log(res)
        navigate('/getalltask')
    }

  return (
    <div>
     
            <input type="text" name="taskname" value={task.taskname} 
             onChange={changeTask}/>
            <hr />
            <button type="submit" name="taskname"  onClick={updateTask} >Update Task</button>
    </div>
  )
}

export default Updatetask