import React, { useState } from 'react'
import axios from 'axios'
import Verifyotp from './Verifyotp'
import { NavLink } from 'react-router-dom'
const LoginUser = () => {
    let [islogin,setLogin]=useState({email:""})
    let [response,setRes]=useState("")
    let [istrue,setIstrue]=useState(false)
    let inputHandle=({target:{value,name}})=>{
        setLogin({...islogin,[name]:value})
    }

    let handleSubmit=async()=>{
        
        let res= await axios.post("http://localhost:7000/api/user/login",{email:islogin.email})
        .then((m)=>{setRes(m.data.message)
            console.log(m.data.message)
            console.log(m.status)
            if(m.status===200){
                setIstrue(true)
            }
        }).catch((err)=>{
              
            if(err.response.status===500){
                    setIstrue(false)
                    setRes(err.response.data.message) }
                })
    }
  return (
    <section>
        {!istrue && <><h1>Login</h1><br /><br />
        <input type="email" name="email" placeholder='enter your password' onChange={inputHandle} />
        <br /><br />
        <button onClick={handleSubmit} >Login </button>
        </>}
        <br /><br />
        <NavLink to="/adduser" > create account</NavLink> <br />
        {response}
        {istrue && <Verifyotp  email={islogin.email}/>}
       
    </section>
  )
}

export default LoginUser