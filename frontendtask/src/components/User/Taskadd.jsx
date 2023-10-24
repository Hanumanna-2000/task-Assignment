import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Taskadd = ({token}) => {
    let [addtask,setAddtask]=useState({taskname:"",token:""})
    let [response,setRes]=useState("")
    let navigate=useNavigate()
    
    
    
    let inputHandle=({target:{value,name}})=>{
        setAddtask({...addtask,[name]:value,token:token})
    }
    console.log(addtask)
    let handleSubmit=async()=>{
        
        // const url = "http://localhost:7000/api/task/addtask";
        // const config = {
        // headers: {
        // Authorization: `Bearer ${tokenuser}`,
        // },
        // taskname:addtask.taskname
        // };
        axios.post("http://localhost:7000/api/task/addtask",{ taskname:addtask.taskname}, {
            headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            }).then((m)=>{setRes(m.data.message)
                console.log(m.data.message)
            }).catch((err)=>{
                console.log(err.response.data.message)
                setRes(err.response.data.message)
            })  
            setTimeout(()=>{
                setRes("")
            },2000)

    }
    useEffect(()=>{
        handleSubmit()
    },[])
    let navigateBack=()=>{
        navigate('/dashboard')
    }
  return (
    <section>
        <button onClick={navigateBack} > back</button>
        <h2>Taskadd  </h2>
         <input type="text" name="taskname" placeholder='enter your task' onChange={inputHandle} />
        <br /><br />
        
        <button onClick={handleSubmit} >submit </button>
        <h3>{response}</h3>
    </section>
  )
}

export default Taskadd