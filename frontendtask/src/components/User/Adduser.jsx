import React, { useEffect } from 'react'
import { useState } from 'react'

import axios from 'axios';
import { NavLink } from 'react-router-dom';

const Adduser = () => {
    let [signup,setSignup]=useState({name:"",email:"",role:"",imgURL:""})
    let [response,setRes]=useState("")
    let  [image,setImage]=useState()

    let inputHandle=({target:{value,name}})=>{
        setSignup({...signup,[name]:value})
        
    }
    console.log(signup)
    let handleSubmit=async()=>{
        console.log(signup.name,signup.email,signup.role)
        let res= await axios.post("http://localhost:7000/api/user/adduser",{
            name:signup.name,
            email:signup.email,
            role:signup.role,
            imgURL:signup.imgURL
        }).then((m)=>{setRes(m.data.message)
            console.log(m.data.message)
        }).catch((err)=>setRes(err.response.data.message))  
        setTimeout(()=>{
             setRes("")
        },2000)
    }
    
    console.log(image)
console.log(signup.imgURL)
  return (
    <section  >
        <h2>Registration</h2>
        <br /><br />
        <input  style={{border:"none"}} 
        type="file" name='imgURL' 
        onChange={(e)=>setImage(e.target.files[0])}  />
        <br /><br />
        <input type="text" name="name" placeholder='enter your name' onChange={inputHandle} />
        <br /><br />
        <input type="email" name="email" placeholder='enter your password' onChange={inputHandle} />
        <br /><br />
        
        <select name="role" onChange={inputHandle} id="">
            <option value="student">student</option>
            <option value="teacher">teacher</option>
            <option value="admin">admin</option>
        </select>  <br /><br />
        <button onClick={handleSubmit} >submit </button>
        {response}
        <NavLink to="/login" >Login</NavLink>
        {
            
            
        }
    </section>
  )
}

export default Adduser