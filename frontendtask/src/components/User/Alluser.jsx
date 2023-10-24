import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
let style={borderBottom:"2px solid red",overFlow:"scroll"}
const Alluser = () => {
    let [userdata,setUserdata]=useState([])
    let navigate=useNavigate()

    let getUsers=async()=>{
        let res=await axios.get("http://localhost:7000/api/user/getuser")
        console.log(res.status)
        if(res.status===200)
        setUserdata(res.data.data)
        else
        setUserdata("users data not found")

    }
    
    useEffect(()=>{
        getUsers()
    },[])

        let navigateBack=()=>{
            navigate('/dashboard')
        }
  return (
            <section>
                <button onClick={navigateBack} > back</button>
                    <table cellPadding={10} cellSpacing={20}  >
                        <thead style={style}>
                           <tr style={style}>
                            <th style={style} >Name</th>
                            <th style={style}>Email</th>
                            <th style={style} >Role</th>
                            <th style={style} >update</th>
                            <th style={style} >delete</th>
                           </tr>
                        </thead>
                        <tbody>
                        {
                    userdata.map((m)=>{
                     return      <>
                            <tr>
                                <td  >{m.name}</td>
                                <td>{m.email}</td>
                                <td>{m.role}</td>
                                <td><button>update</button></td>
                                <td><button>delete</button></td>
                            </tr>
                            </>
                            })
        }
                        </tbody>
                
        </table>
        
    </section>
  )
}

export default Alluser