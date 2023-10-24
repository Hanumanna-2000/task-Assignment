import React from 'react'
import { NavLink } from 'react-router-dom'


const Dashboard = () => {
  return (
    <div style={{border:'2px solid red',display:"flex",height:'40px',width:"100%",flexDirection:"row",alignItems:'center',justifyContent:'space-evenly',margin:"auto",backgroundColor:'lightpink'}} >
       <NavLink to="/userlist" >User List</NavLink>
        {/* <NavLink to="/verifyotp" >Verification</NavLink> */}
        <NavLink to="/addtask" >Task</NavLink>
        <NavLink to="/getalltask" >All Task</NavLink> 
    </div>
  )
}

export default Dashboard