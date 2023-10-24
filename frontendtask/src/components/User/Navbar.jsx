import React from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import '../../css/navbar.css'
import { useAuth } from '../authentication/AuthProvider'
const Navbar = () => {
  let {user,logout}=useAuth()
  let navigate=useNavigate()
  let logoutUser=()=>{
    localStorage.removeItem("token")
    logout()
    navigate('/login')
    window.location.reload()
  }
  return (
    <nav>
        <NavLink to="/" >Home</NavLink>
        {/* <NavLink to="/userlist" >User List</NavLink>
        <NavLink to="/verifyotp" >Verification</NavLink>
        <NavLink to="/addtask" >Task</NavLink>
        <NavLink to="/getalltask" >All Task</NavLink> */}
        
        {!user && <NavLink to="/login" >Login</NavLink>}
        {user && <button  onClick={logoutUser} > Logout </button>}
        
        


    </nav>
  )
}

export default Navbar