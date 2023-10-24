import React, { useState } from 'react'
import axios from 'axios'
import Taskadd from './Taskadd'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../authentication/AuthProvider'
const Verifyotp = ({email}) => {
    let navigate=useNavigate()
    let [isverify,setIsverify]=useState({email:"",otp:""})
    let [response,setRes]=useState("")
    let [token,setToken]=useState("")
    let [task,setTask]=useState(false)
    let {login}=useAuth()

    let inputHandle=({target:{value,name}})=>{
        setIsverify({...isverify,[name]:value,email:email})
    }
    let handleSubmit=async()=>{
        console.log(isverify.email,isverify.otp)
        await axios.post("http://localhost:7000/api/user/otpverify",{
            email:isverify.email,
            otp:isverify.otp
        }).then((m)=>{
            setRes("OTP verified successfully")
            if(m.status===200){
                navigate('/dashboard')
                setToken(m.data.info)
            }
            console.log(m.data.message)
            login(m.data.info)
            localStorage.setItem('token',m.data.info)
        }).catch((err)=>{ 
            if(err.response.status===500)
            {
                setRes(err.response.data.message)
            }
        })  
        
        setTask(true)
        setTimeout(()=>{
            setRes("")
        },1500)
        
    }


  return (
    <section>
         {/* <NavLink to="/getalltask" >All Task</NavLink> */}
        <h2>Verifyotp  </h2>
         {/* <input type="email" name="email" placeholder='enter your email' onChange={inputHandle} /> */}
        
        <input type="text" name="otp" placeholder='enter your otp' onChange={inputHandle} />
        <br /><br />
        <button onClick={handleSubmit} >submit </button>
        {response}
           {false &&  <Taskadd  token={token} />}
           
    </section>
  )
}

export default Verifyotp